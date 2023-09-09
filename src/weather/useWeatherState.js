import {useInterpret} from '@xstate/react';
import {
    createWeatherMachineEffects,
    WeatherMachine,
    WeatherStates,
} from './useWeatherState.state';
import {useLazyQueryWeather} from '../hooks/useLazyQueryWeather';
import {useLazyQueryCities} from '../hooks/useLazyQueryCities';

export const useWeatherState = () => {
    const {fetch: fetchWeather} = useLazyQueryWeather();
    const {fetch: fetchCities} = useLazyQueryCities();
    const service = useInterpret(
        WeatherMachine,
        createWeatherMachineEffects(
            fetchWeather,
            fetchCities,
        )
    );

    return {
        baseWeatherService: service, 
        queryAllWeatherData: (weatherVars) => {
            service.send(WeatherStates.queryWeatherData, weatherVars);
        },
    }
}