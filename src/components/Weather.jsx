import { useEffect, useState } from "react";

const Weather = () => {
  const [isLoading, setIsLoading] = useState();
  const [loadedData, setLoadedData] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&sidoName=경기&ver=1.3`;
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.response.body.items);
        return data.response.body.items;
      })
      .then((item) => {
        console.log(item[0]);
      });
  }, [url]);
  return <div>{loadedData}</div>;
};
export default Weather;
