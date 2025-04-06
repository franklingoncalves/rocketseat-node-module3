export interface Coordinate {
  latitude: number;
  longitude: number;
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate
): number {
  const R = 6371; // Raio da Terra em quilômetros
  const lat1 = from.latitude * (Math.PI / 180); // Converter graus para radianos
  const lat2 = to.latitude * (Math.PI / 180);
  const deltaLat = (to.latitude - from.latitude) * (Math.PI / 180);
  const deltaLon = (to.longitude - from.longitude) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distância em quilômetros
  return distance;
}
