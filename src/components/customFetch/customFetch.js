import axios from "axios";
// import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  //   const token = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}${url}`
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}${url}`);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };
  return { data, isLoading, error, reFetch };
};

export default useFetch;
