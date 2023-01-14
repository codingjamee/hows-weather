import { useContext, useEffect } from "react";
import classes from "./Map.module.css";
import LocationContext from "../store/location-context";
const { kakao } = window;

const Map = () => {
  const curlocation = useContext(LocationContext);

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    curlocation.getCurPosition();
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(curlocation.curLat, curlocation.curLog), //지도의 중심좌표.
      level: 7, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
      curlocation.curLat,
      curlocation.curLog
    );

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  }, [curlocation]);

  useEffect(() => {
    curlocation.getCurAdress(curlocation.curLat, curlocation.curLog);
  });

  return <div id="map" className={classes.map}></div>;
};
export default Map;
