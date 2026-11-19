import { getCurrentWeather } from '@/src/services/weather';
import { WeatherResponse } from '@/src/types/weather';

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

describe('getCurrentWeather', () => {
  const originalKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

  beforeEach(() => {
    process.env.EXPO_PUBLIC_WEATHER_API_KEY = 'test-key';
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env.EXPO_PUBLIC_WEATHER_API_KEY = originalKey;
    jest.resetAllMocks();
  });

  test('devuelve el clima cuando la API responde bien', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockWeather,
    });

    const result = await getCurrentWeather();

    expect(result).toEqual(mockWeather);
  });

  test('llama a la API con la key y las coordenadas de Villa Lugano', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockWeather,
    });

    await getCurrentWeather();

    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain('key=test-key');
    expect(url).toContain(encodeURIComponent('-34.6866,-58.4698'));
    expect(url).toContain('lang=es');
  });

  test('lanza error si la API responde con error', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
    });

    await expect(getCurrentWeather()).rejects.toThrow('401');
  });

  test('lanza error si falta la API key', async () => {
    delete process.env.EXPO_PUBLIC_WEATHER_API_KEY;

    await expect(getCurrentWeather()).rejects.toThrow('EXPO_PUBLIC_WEATHER_API_KEY');
  });
});