const formatPercent = (value) => `${Math.round(value)}%`;

const getPoolTotals = (prediction) => {
  const yesPool = Number(prediction.totalYesStake || 0);
  const noPool = Number(prediction.totalNoStake || 0);
  const totalPool = yesPool + noPool;

  return { yesPool, noPool, totalPool };
};

export const getPredictionProbability = (prediction) => {
  const { yesPool, noPool, totalPool } = getPoolTotals(prediction);

  if (!totalPool) {
    return 50;
  }

  return (yesPool / totalPool) * 100;
};

export const buildPredictionInsight = (prediction) => {
  const probability = getPredictionProbability(prediction);
  const { yesPool, noPool, totalPool } = getPoolTotals(prediction);
  const crowdLean = probability >= 55 ? "YES" : probability <= 45 ? "NO" : "balanced";
  const volatility = totalPool < 200 ? "thin-liquidity" : Math.abs(probability - 50) > 20 ? "high-conviction" : "developing";
  const confidence = Math.min(92, Math.round(40 + totalPool / 25 + Math.abs(probability - 50)));

  let headline = "Crowd conviction is still forming.";
  let detail = "This market needs more stake before the signal becomes reliable.";

  if (crowdLean === "YES") {
    headline = `Crowd leans YES at ${formatPercent(probability)}.`;
    detail = volatility === "high-conviction"
      ? "Most of the pool is clustering on one side, so a late reversal would be notable."
      : "The upside case is leading, but this is still flexible enough for fresh evidence to move the market.";
  } else if (crowdLean === "NO") {
    headline = `Crowd leans NO at ${formatPercent(100 - probability)}.`;
    detail = volatility === "high-conviction"
      ? "Participants are strongly fading this outcome, which raises the value of any contrary signal."
      : "Skepticism is leading right now, though the market has room to re-price.";
  }

  return {
    probability,
    confidence,
    headline,
    detail,
    crowdLean,
    totalPool,
    yesPool,
    noPool,
  };
};

export const buildMarketPulse = (predictions = []) => {
  if (!predictions.length) {
    return {
      hottestCategory: "No active markets",
      averageConfidence: 0,
      summary: "Create the first forecast to start building a signal map.",
      contrarianCount: 0,
    };
  }

  const categoryMap = predictions.reduce((acc, prediction) => {
    const category = prediction.category || "General";
    acc[category] = (acc[category] || 0) + (prediction.totalYesStake || 0) + (prediction.totalNoStake || 0) + 1;
    return acc;
  }, {});

  const hottestCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "General";
  const insights = predictions.map(buildPredictionInsight);
  const averageConfidence = Math.round(
    insights.reduce((total, item) => total + item.confidence, 0) / insights.length
  );
  const contrarianCount = insights.filter((item) => item.probability > 35 && item.probability < 65).length;

  return {
    hottestCategory,
    averageConfidence,
    contrarianCount,
    summary:
      contrarianCount > 0
        ? `${contrarianCount} market${contrarianCount > 1 ? "s are" : " is"} sitting in a high-information middle zone.`
        : "Most markets are showing strong directional conviction right now.",
  };
};

export const reviewForecastDraft = ({ question, category, startTime, endTime }) => {
  const normalizedQuestion = (question || "").trim();
  const notes = [];
  let score = 35;

  if (normalizedQuestion.length > 24) {
    score += 20;
  } else {
    notes.push("Question is short. Add a measurable event or deadline.");
  }

  if (/\b(will|by|before|after|launch|ship|reach|win|beat)\b/i.test(normalizedQuestion)) {
    score += 15;
  } else {
    notes.push("Use an outcome verb like 'reach', 'launch', or 'win' to make resolution easier.");
  }

  if (category) {
    score += 10;
  } else {
    notes.push("Choose a category so the forecast appears in the right stream.");
  }

  if (startTime && endTime) {
    const hours = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60);

    if (hours >= 6) {
      score += 15;
    } else {
      notes.push("Forecast window is very short. More time usually improves participation quality.");
    }
  } else {
    notes.push("Add opening and closing times so the market can be resolved cleanly.");
  }

  if (/\?/g.test(normalizedQuestion)) {
    score += 5;
  }

  const cappedScore = Math.min(95, Math.max(20, score));

  return {
    score: cappedScore,
    verdict:
      cappedScore >= 80 ? "High clarity" : cappedScore >= 60 ? "Promising draft" : "Needs tightening",
    notes:
      notes.length > 0
        ? notes
        : ["This question is specific enough to launch with minimal moderator cleanup."],
  };
};
