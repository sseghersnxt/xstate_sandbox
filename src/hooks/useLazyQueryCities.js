import { gql, useLazyQuery } from '@apollo/client';

const queryCitiesByTemperature = gql`
 query GetCitiesByTemperature($temp: String!) {
   getCitiesByTemperature(temp: $temp) {
    city,
    state,
    temperature,
  }
}`;

export const useLazyQueryCities = () => {
  const [lazyFetch, eagerData] = useLazyQuery(queryCitiesByTemperature);
  return { fetch: lazyFetch };
};
