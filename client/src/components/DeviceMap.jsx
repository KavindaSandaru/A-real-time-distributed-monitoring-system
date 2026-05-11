import {
  MapContainer,
  TileLayer,
  CircleMarker,
} from "react-leaflet";

export default function DeviceMap({
  devices,
}) {

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      zoomControl={false}
      attributionControl={false}
      worldCopyJump={false}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.0}
      className="h-full w-full bg-[#050816]"
    >

      {/* Premium Dark Map */}
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      {devices.map((device) => {

        if (
          !device.location?.lat ||
          !device.location?.lng
        ) {
          return null;
        }

        return (
          <div key={device._id}>

            {/* Glow Layer */}
            <CircleMarker
              center={[
                device.location.lat,
                device.location.lng,
              ]}
              radius={16}
              pathOptions={{
                color: "#22c55e",
                fillColor: "#22c55e",
                fillOpacity: 0.15,
                weight: 0,
              }}
            />

            {/* Main Dot */}
            <CircleMarker
              center={[
                device.location.lat,
                device.location.lng,
              ]}
              radius={6}
              pathOptions={{
                color: "#22c55e",
                fillColor: "#4ade80",
                fillOpacity: 1,
                weight: 2,
              }}
            />

          </div>
        );
      })}

    </MapContainer>
  );
}