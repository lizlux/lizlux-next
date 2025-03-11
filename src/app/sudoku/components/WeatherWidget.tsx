"use client";

import { useEffect, useState } from "react";

const WeatherWidget = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getWeatherUrl = (lat: string, long: string): string => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&temperature_unit=fahrenheit`;
  };

  const sanFranciscoWeatherUrl = getWeatherUrl("52.52", "13.41");

  useEffect(() => {
    if (data) {
      return;
    }
    fetch(sanFranciscoWeatherUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not okay");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setError(error.message);
        setLoading(false);
      });
  }, [sanFranciscoWeatherUrl, data]);
  console.log("data", data);

  return (
    <div>
      <p>Weather data incoming</p>
      {loading ? <p>Weather is loading</p> : <p>Weather has loaded</p>}
      {error ? <p>Weather has an error</p> : ""}
    </div>
  );
};

export default WeatherWidget;
