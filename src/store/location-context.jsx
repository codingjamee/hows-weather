import { createContext, useEffect, useState } from "react";
const { kakao } = window;

const LocationContext = createContext({
  curLat: 0,
  curLog: 0,
  curStation: "",
  getCurPosition: () => {},
});

export const LocationContextProvider = (props) => {
  const [latitude, setLatitude] = useState(0);
  const [logitude, setlogitude] = useState(0);
  const [curStation, setCurStation] = useState("");
  const [curState, setCurState] = useState("");

  const getCurPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setlogitude(position.coords.longitude);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  };

  const getAddr = (lat, lng) => {
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const _arr1 = arr[0].address.region_3depth_name;
        const _arr2 = arr[0].address.region_1depth_name;
        console.log(arr[0].address);
        setCurStation(_arr1);
        setCurState(_arr2);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  const context = {
    curLat: latitude,
    curLog: logitude,
    curStation: curStation,
    curState: curState,
    getCurPosition: getCurPosition,
    getCurAdress: getAddr,
  };

  return (
    <LocationContext.Provider value={context}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
