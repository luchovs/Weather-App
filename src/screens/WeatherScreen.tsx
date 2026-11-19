import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { WeatherCard } from '@/src/components/WeatherCard';
import { VILLA_LUGANO } from '@/src/constants/location';
import { useWeather } from '@/src/hooks/useWeather';

export default function WeatherScreen() {
  const { data, loading, error, refetch } = useWeather();

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.message}>Cargando clima...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.button} onPress={refetch}>
            <Text style={styles.buttonText}>Reintentar</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && data && (
        <WeatherCard weather={data} locationName={VILLA_LUGANO.name} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  center: {
    alignItems: 'center',
    gap: 12,
  },
  message: {
    fontSize: 16,
    color: '#475569',
  },
  error: {
    fontSize: 16,
    color: '#b91c1c',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});