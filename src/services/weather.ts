import { VILLA_LUGANO } from '@/src/constants/location';
import { WeatherResponse } from '@/src/types/weather';

const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getCurrentWeather(
  query: string = VILLA_LUGANO.query
): Promise<WeatherResponse> {
  const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Falta EXPO_PUBLIC_WEATHER_API_KEY en el archivo .env');
  }

  const url = `${BASE_URL}/current.json?key=${apiKey}&q=${encodeURIComponent(query)}&lang=es`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al consultar WeatherAPI (${response.status})`);
  }

  return response.json();
}