import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { MoonLoader } from "react-spinners";
import { CountrySpecificData } from "../types/chartsAndMapsTypes";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const countrySpecificCases = async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
};

const graphDataForCases = async () => {
 return await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
};

type CountryDataProps = {
  isLoading: boolean;
  data: CountrySpecificData[]
}

const ChartsAndMaps = () => {
  const { isLoading: isCountryLoading, data: countryData }: Partial<CountryDataProps> = useQuery({
    queryKey: ["country-specific-cases"],
    queryFn: countrySpecificCases,
  });

  const { isLoading: isGraphDataLoading, data: graphData } = useQuery({
    queryKey: ["graph-data-for-cases"],
    queryFn: graphDataForCases,
  });
  

  const getTheCountryWiseData = () => {
    const countryWideCases = countryData?.map((obj: any) => {
      return {
        country: obj.country,
        active: obj.active,
        recovered: obj.recovered,
        deaths: obj.deaths,
        lat: obj.countryInfo.lat,
        lon: obj.countryInfo.long,
      };
    });

    return (
      <div className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold p-5">
          A map that reflects the data of every country about the cases.
        </h1>

        <MapContainer
          center={[20, 77]}
          zoom={3}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            noWrap={true}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryWideCases?.map((country: any, index: number) => (
            <CircleMarker
              key={index}
              center={[country.lat, country.lon]}
              radius={10}
              color="blue"
              fillColor="blue"
              fillOpacity={0.5}
            >
              <Popup>
                <div>
                  <strong>{country.country}</strong>
                  <br />
                  Active: {country.active}
                  <br />
                  Recovered: {country.recovered}
                  <br />
                  Deaths: {country.deaths}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    );
  };

  const getThePlottableData = () => {
    const labels = Object.keys(graphData?.data.cases);
    const data = Object.values(graphData?.data.cases);

    const finalData = {
      labels: labels,
      datasets: [
        {
          labels: "Cases from past 3 years",
          data: data,
          backgroundColor: "aqua",
          borderColor: "black",
          pointBorderColor: "aqua",
          fill: true,
          tension: 0.4,
        },
      ],
    };

    return (
      <div className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold p-5">
          A line graph for the data of the cases with dates
        </h1>
        <Line data={finalData}></Line>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-44 mt-12">
      <div>
        {isGraphDataLoading ? (
          <div className="flex justify-center">
            <MoonLoader size={60} color="#32e6be" speedMultiplier={0.5} />
          </div>
        ) : (
          getThePlottableData()
        )}
      </div>
      <div>
        {isCountryLoading ? (
          <div className="flex justify-center">
            <MoonLoader size={60} color="#32e6be" speedMultiplier={0.5} />
          </div>
        ) : (
          getTheCountryWiseData()
        )}
      </div>
    </div>
  );
};

export default ChartsAndMaps;
