import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (coords) => ["weather", coords],
    forecast: (coords) => ["forecast", coords],
}

export function useWeatherQuery(coordinates) {
   return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0}),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useForecastQuery(coordinates) {
    return useQuery({
         queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0}),
         queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
         enabled: !!coordinates,
     })
 }