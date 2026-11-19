import { renderHook, waitFor } from '@testing-library/react-native';

import { useWeather } from '@/src/hooks/useWeather';
import { getCurrentWeather } from '@/src/services/weather';
import { WeatherResponse } from '@/src/types/weather';

jest.mock('@/src/services/weather');

const mockedGetCurrentWeather = getCurrentWeather as jest.MockedFunction<
  typeof getCurrentWeather
>;

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

describe('useWeather', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('empieza en estado de carga', async () => {
    // Promesa que nunca se resuelve: el hook queda cargando
    mockedGetCurrentWeather.mockReturnValue(new Promise(() => {}));

    const { result } = await renderHook(() => useWeather());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('devuelve los datos cuando el servicio responde bien', async () => {
    mockedGetCurrentWeather.mockResolvedValue(mockWeather);

    const { result } = await renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockWeather);
    expect(result.current.error).toBeNull();
  });

  test('devuelve el error cuando el servicio falla', async () => {
    mockedGetCurrentWeather.mockRejectedValue(new Error('Falló la API'));

    const { result } = await renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Falló la API');
    expect(result.current.data).toBeNull();
  });
});