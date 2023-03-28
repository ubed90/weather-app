export const GET_WEATHER_DATA = '[Search] Get Weather Data';
export const GET_WEATHER_DATA_SUCCESS = '[Search] Get Weather Data Success';
export const GET_WEATHER_DATA_FAIL = '[Search] Get Weather Data Fail';


export class GetWeatherData {
    type = GET_WEATHER_DATA;
    payLoad;

    constructor(payLoad) {
        this.payLoad = payLoad
    }
}

export class GetWeatherDataSuccess {
    type = GET_WEATHER_DATA_SUCCESS;
    payLoad;

    constructor(payLoad) {
        this.payLoad = payLoad;
    }
}

export class GetWeatherDataFail {
    type = GET_WEATHER_DATA_FAIL;
    payLoad;

    constructor(payLoad) {
        this.payLoad = payLoad;
    }
}

// module.exports = { GET_WEATHER_DATA, GetWeatherData, GET_WEATHER_DATA_FAIL, GetWeatherDataFail, GET_WEATHER_DATA_SUCCESS, GetWeatherDataSuccess };