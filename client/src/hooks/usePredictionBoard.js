import { useEffect, useState } from "react";
import api from "../api/axios";

const initialBoard = {
  all: [],
  live: [],
  upcoming: [],
  closed: [],
  settled: [],
};

const usePredictionBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBoard = async () => {
    setLoading(true);

    try {
      const [allRes, liveRes, upcomingRes, closedRes, settledRes, historyRes] = await Promise.allSettled([
        api.get("/prediction/all"),
        api.get("/prediction/all?status=live"),
        api.get("/prediction/all?status=upcoming"),
        api.get("/prediction/all?status=closed"),
        api.get("/prediction/all?status=settled"),
        api.get("/userForecast/forecast-history"),
      ]);

      setBoard({
        all: allRes.status === "fulfilled" ? allRes.value?.data?.data || [] : [],
        live: liveRes.status === "fulfilled" ? liveRes.value?.data?.data || [] : [],
        upcoming: upcomingRes.status === "fulfilled" ? upcomingRes.value?.data?.data || [] : [],
        closed: closedRes.status === "fulfilled" ? closedRes.value?.data?.data || [] : [],
        settled: settledRes.status === "fulfilled" ? settledRes.value?.data?.data || [] : [],
      });
      setHistory(historyRes.status === "fulfilled" ? historyRes.value?.data?.data || [] : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  return {
    board,
    history,
    loading,
    refreshBoard: fetchBoard,
  };
};

export default usePredictionBoard;
