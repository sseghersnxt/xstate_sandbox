import { assign, createMachine } from 'xstate';

export const WeatherStates = {
    inactive: "inactive",
    error: 'error',
    queryWeatherData: 'queryWeatherData',
    queryCitiesData: 'queryCitiesData',
    ready: 'ready',
};

const WeatherStatesPlan = {
    predictableActionArguments: true,
    id: "WeatherStates",
    initial: WeatherStates.inactive,
    context: {
        weatherData: {},
        cityData: [],
    },
    states: {
        [WeatherStates.inactive]: {
            on: {
                [WeatherStates.queryWeatherData]: {
                    target: WeatherStates.queryWeatherData
                }
            }
        },
        [WeatherStates.queryWeatherData]: {
            invoke: {
                src: 'fetchWeatherService',
                onDone: {
                    actions: 'handleWeatherData',
                    target: WeatherStates.queryCitiesData,
                },
                onError: {
                    target: WeatherStates.error,
                }
            },
        },
        [WeatherStates.queryCitiesData]: {
            invoke: {
                src: 'fetchCitiesService',
                onDone: {
                    actions: 'handleCitiesData',
                    target: WeatherStates.ready,
                },
                onError: {
                    target: WeatherStates.error,
                }
            }
        },
        [WeatherStates.error]: {
            on: {
                [WeatherStates.queryWeatherData]: {
                    target: WeatherStates.queryWeatherData,
                }
            }
        },
        [WeatherStates.ready]: {
            on: {
                [WeatherStates.queryWeatherData]: {
                    target: WeatherStates.queryWeatherData,
                }
            }
        }
    },
};

export const WeatherMachine = createMachine(WeatherStatesPlan);

export const createWeatherMachineEffects = (
    queryWeatherEffect,
    queryCitiesEffect,
) => {
    return {
        actions: {
            handleWeatherData: assign((context, event) => {
                return {
                    ...context,
                    weatherData: event.data[1].data.getWeatherByZip,
                }
            }),
            handleCitiesData: assign((context, event) => {
                return {
                    ...context,
                    cityData: event.data.data.getCitiesByTemperature,
                }
            }),
        },
        services: {
            // Include artificial delay
            fetchWeatherService: (_, event) => Promise.all([
                new Promise((res, _) => {
                    setTimeout(() => {
                        res();
                    }, 2000)
                }),
                // Forward query variables
                queryWeatherEffect(event),
            ]),
            fetchCitiesService: (context) => {
                return queryCitiesEffect({ variables: { temp: context.weatherData.temperature } });
            },
        }
    }
}
