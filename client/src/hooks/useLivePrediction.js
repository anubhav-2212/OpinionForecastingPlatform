import { useEffect, useState } from "react";
import api from "../api/axios";

const useLivePredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivePredictions = async () => {
      try {
        const res = await api.get("/prediction/all?status=live");
        setPredictions(res?.data?.data || []);
      } catch (error) {
        console.log("Error fetching live predictions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivePredictions();
  }, []);

  return { predictions, loading };
};

export default useLivePredictions;
