import { gql, useLazyQuery } from '@apollo/client';

const queryWeatherByZip = gql`
 query GetWeatherByZip($zip: Int!) {
   getWeatherByZip(zip: $zip) {
      humidity,
      heatIndex,
      temperature,
      zip,
  }
}`;

export const useLazyQueryWeather = () => {
  const [lazyFetch, eagerData] = useLazyQuery(queryWeatherByZip);
  return { fetch: lazyFetch };
};
