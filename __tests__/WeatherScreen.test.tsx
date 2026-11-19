import { fireEvent, render } from '@testing-library/react-native';

import { useWeather } from '@/src/hooks/useWeather';
import WeatherScreen from '@/src/screens/WeatherScreen';
import { WeatherResponse } from '@/src/types/weather';

jest.mock('@/src/hooks/useWeather');

const mockedUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;

const mockWeather: WeatherResponse = {
  location: {
    name: 'Buenos Aires',
    region: 'Distrito Federal',
    country: 'Argentina',
    localtime: '2026-11-19 15:00',
  },
  current: {
    temp_c: 24,
    feelslike_c: 25,
    humidity: 60,
    wind_kph: 12,
    is_day: 1,
    condition: {
      text: 'Parcialmente nublado',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003,
    },
  },
};

describe('<WeatherScreen />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('muestra el mensaje de carga', async () => {
    mockedUseWeather.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = await render(<WeatherScreen />);

    getByText('Cargando clima...');
  });

  test('muestra el clima de Villa Lugano cuando hay datos', async () => {
    mockedUseWeather.mockReturnValue({
      data: mockWeather,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = await render(<WeatherScreen />);

    getByText('Villa Lugano');
    getByText('24°C');
    getByText('Parcialmente nublado');
  });

  test('muestra el error y reintenta al tocar el botón', async () => {
    const refetch = jest.fn();
    mockedUseWeather.mockReturnValue({
      data: null,
      loading: false,
      error: 'Falló la API',
      refetch,
    });

    const { getByText } = await render(<WeatherScreen />);

    getByText('Falló la API');
    await fireEvent.press(getByText('Reintentar'));

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});