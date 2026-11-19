import { Image, StyleSheet, Text, View } from 'react-native';

import { WeatherResponse } from '@/src/types/weather';

type Props = {
  weather: WeatherResponse;
  locationName: string;
};

export function WeatherCard({ weather, locationName }: Props) {
  const { current } = weather;

  return (
    <View style={styles.card}>
      <Text style={styles.location}>{locationName}</Text>

      <Image
        style={styles.icon}
        source={{ uri: `https:${current.condition.icon}` }}
        accessibilityLabel={current.condition.text}
      />

      <Text style={styles.temperature}>{`${Math.round(current.temp_c)}°C`}</Text>
      <Text style={styles.condition}>{current.condition.text}</Text>

      <View style={styles.details}>
        <Text style={styles.detail}>{`Sensación térmica: ${Math.round(current.feelslike_c)}°C`}</Text>
        <Text style={styles.detail}>{`Humedad: ${current.humidity}%`}</Text>
        <Text style={styles.detail}>{`Viento: ${Math.round(current.wind_kph)} km/h`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  location: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0f172a',
  },
  icon: {
    width: 96,
    height: 96,
  },
  temperature: {
    fontSize: 56,
    fontWeight: '700',
    color: '#0f172a',
  },
  condition: {
    fontSize: 18,
    color: '#475569',
    marginBottom: 16,
  },
  details: {
    gap: 4,
    alignItems: 'center',
  },
  detail: {
    fontSize: 15,
    color: '#334155',
  },
});