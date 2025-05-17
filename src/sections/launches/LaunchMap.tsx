import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import type { Launchpad } from "../../types";

type Props = {
  launchpads: Launchpad[];
};

export const LaunchMap = ({ launchpads }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "TU_API_KEY", // reemplazar por tu API key
  });

  const [selected, setSelected] = useState<Launchpad | null>(null);

  if (!isLoaded) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <GoogleMap
      zoom={3}
      center={{ lat: 25, lng: -80 }}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      {launchpads.map((pad) => (
        <Marker
          key={pad.id}
          position={{ lat: pad.latitude, lng: pad.longitude }}
          onClick={() => setSelected(pad)}
        />
      ))}
      {selected && (
        <InfoWindow
          position={{ lat: selected.latitude, lng: selected.longitude }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <Typography variant="subtitle1">{selected.name}</Typography>
            <Typography variant="body2">
              {selected.locality}, {selected.region}
            </Typography>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
