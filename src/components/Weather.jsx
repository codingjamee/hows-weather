import { useContext, useEffect, useState } from "react";
import LocationContext from "../store/location-context";
import classes from "./Weather.module.css";

const Weather = () => {
  const [isLoading, setIsLoading] = useState();
  const [loadedData, setLoadedData] = useState([]);
  const [dustLv, setDustLv] = useState("");
  const [ultraDustLv, setUltraDustLv] = useState("");
  const curLocation = useContext(LocationContext);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&sidoName=${curLocation.curState}&stationName=${curLocation.curStation}&ver=1.3`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const curStationIndex = data.response.body.items.findIndex(
          (item) => item.stationName === curLocation.curStation
        );
        if (curStationIndex > 0) {
          return data.response.body.items[curStationIndex];
        } else {
          return data.response.body.items[0];
        }
      })
      .then((item) => {
        console.log(item);
        setLoadedData(item);
      });
  }, [url, curLocation.curStation]);

  const dustLev = loadedData.pm10Grade1h || loadedData.pm10Grade;
  const ultraDustLev = loadedData.pm25Grade1h || loadedData.pm25Grade;

  useEffect(() => {
    switch (dustLev) {
      case "1":
        setDustLv("좋음");
        break;
      case "2":
        setDustLv("보통");
        break;
      case "3":
        setDustLv("나쁨");
        break;
      case "4":
        setDustLv("매우나쁨");
        break;
      default:
        setDustLv("");
        break;
    }

    switch (ultraDustLev) {
      case "1":
        setUltraDustLv("좋음");
        break;
      case "2":
        setUltraDustLv("보통");
        break;
      case "3":
        setUltraDustLv("나쁨");
        break;
      case "4":
        setUltraDustLv("매우나쁨");
        break;
      default:
        setUltraDustLv("");
        break;
    }
  }, [dustLev, ultraDustLev]);

  return (
    <div className={classes.dust}>
      <div>{loadedData.stationName}</div>
      <div>미세먼지: {loadedData.pm10Value} ppm</div>
      <div>초미세먼지: {loadedData.pm25Value} ppm</div>
      <div>미세먼지: {dustLv}</div>
      <div>초미세먼지: {ultraDustLv}</div>
      <div>측정기준시간 : {loadedData.dataTime}</div>
    </div>
  );
};
export default Weather;
