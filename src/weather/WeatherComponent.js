import { useState } from 'react';
import { useSelector } from '@xstate/react';
import { useWeatherState } from './useWeatherState';
import { WeatherStates } from './useWeatherState.state';
import '../styles.css';

export const WeatherComponent = () => {
    const [input, setInput] = useState('12345');
    const { queryAllWeatherData, baseWeatherService } = useWeatherState();
    const state = useSelector(baseWeatherService, state => state.value);
    const dataIsLoading = useSelector(baseWeatherService, state => [WeatherStates.queryWeatherData, WeatherStates.queryCitiesData].some(state.matches));
    const dataIsReady = useSelector(baseWeatherService, state => state.matches(WeatherStates.ready));
    const data = useSelector(baseWeatherService, state => state.context);
    const dataContent = dataIsReady
        ? <div className="dataColumns">
            <p>{data.weatherData.zip} : {data.cityData[0].temperature}</p>
            <div className="cityDataContainer">{data.cityData.slice(0, 4).map(byZipData => <p key={`${byZipData.city}.${byZipData.state}`}>
                {byZipData.city}
            </p>)}
            </div>
        </div>
        : 'Not Loaded';
    const onFetchWeather = () => {
        queryAllWeatherData({ variables: { zip: input } });
    };

    return <div className="container">
        <div className="inputContainer">
            <input
                style={{ height: '16px' }}
                value={input}
                onChange={(event) => {
                    setInput(event.target.value);
                }}></input>
            <button
                className="button"
                onClick={onFetchWeather}>
                {dataIsLoading ? <svg className="rotating" style={{ height: '20px' }} fill="#FFFFFF" viewBox="0 0 489.645 489.645">
                    <g>
                        <path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
                c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
                c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
                c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
                C414.856,432.511,548.256,314.811,460.656,132.911z"/>
                    </g>
                </svg> : 'Get Weather'}
            </button>
        </div>
        <div className="dataContainer">
            <p>State is: {state}</p>
            <div>Data: {dataIsLoading
                ? 'is loading'
                : <>{dataContent}</>
            }</div>
        </div>
    </div>;
}