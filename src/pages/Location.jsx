import React, { useEffect, useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapImage from "../assets/img/map/map-uf.svg";
import markersData from "../assets/json/location/map-markers.json";
import { useOutletContext } from "react-router-dom";

const DEFAULT_CENTER = [500, 500];

function SetViewOnUser({ userPos }) {
  const map = useMap();

  useEffect(() => {
    if (userPos) {
      map.setView(userPos, map.getZoom());
    }
  }, [userPos, map]);

  return null;
}

function getMarkerIcon(iconFile) {
  return L.divIcon({
    className: "custom-marker",
    html: `<img src="${
      new URL(`../assets/img/map/${iconFile}`, import.meta.url).href
    }" style="width:32px;height:32px;display:block;" />`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

function LocationPage() {
  const { lang = "nl" } = useOutletContext();
  const markers = markersData[lang];
  const imageBounds = [
    [0, 0],
    [800, 800],
  ];
  const [userPos, setUserPos] = useState(null);
  const userLocationText = lang === "nl" ? "Uw locatie" : "Your location";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setUserPos([230, 550]),
        () => {}
      );
    }
  }, []);

  return (
    <main className="h-110 w-full pt-12">
      <MapContainer
        center={userPos || DEFAULT_CENTER}
        zoom={1}
        scrollWheelZoom={true}
        crs={L.CRS.Simple}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <ImageOverlay url={mapImage} bounds={imageBounds} />
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={marker.position}
            icon={getMarkerIcon(marker.icon)}
          >
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
        {userPos && (
          <>
            <Marker position={userPos}>
              <Popup>{userLocationText}</Popup>
            </Marker>
            <SetViewOnUser userPos={userPos} />
          </>
        )}
      </MapContainer>
    </main>
  );
}

export default LocationPage;