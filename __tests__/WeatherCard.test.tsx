import { render } from '@testing-library/react-native';

import { WeatherCard } from '@/src/components/WeatherCard';
import { WeatherResponse } from '@/src/types/weather';

const mockWeather: WeatherResponse = {
  location: {
    name: 'Buenos Aires',
    region: 'Distrito Federal',
    country: 'Argentina',
    localtime: '2026-11-19 15:00',
  },
  current: {
    temp_c: 24.4,
    feelslike_c: 25.2,
    humidity: 60,
    wind_kph: 12.3,
    is_day: 1,
    condition: {
      text: 'Parcialmente nublado',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003,
    },
  },
};

describe('<WeatherCard />', () => {
  test('muestra el nombre del lugar', async () => {
    const { getByText } = await render(
      <WeatherCard weather={mockWeather} locationName="Villa Lugano" />
    );

    getByText('Villa Lugano');
  });

  test('muestra la temperatura redondeada y la condición', async () => {
    const { getByText } = await render(
      <WeatherCard weather={mockWeather} locationName="Villa Lugano" />
    );

    getByText('24°C');
    getByText('Parcialmente nublado');
  });

  test('muestra sensación térmica, humedad y viento', async () => {
    const { getByText } = await render(
      <WeatherCard weather={mockWeather} locationName="Villa Lugano" />
    );

    getByText('Sensación térmica: 25°C');
    getByText('Humedad: 60%');
    getByText('Viento: 12 km/h');
  });
});