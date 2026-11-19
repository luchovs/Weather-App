export type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type WeatherLocation = {
  name: string;
  region: string;
  country: string;
  localtime: string;
};

export type WeatherCurrent = {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  is_day: number;
  condition: WeatherCondition;
};

export type WeatherResponse = {
  location: WeatherLocation;
  current: WeatherCurrent;
};