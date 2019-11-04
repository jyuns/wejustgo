import momentTimezone from 'moment-timezone'

export const state = () => ({
    _skyscanner : null,
    _currentWeather : null,
    _weatherIndex : [
        {   
            'type' : 'Thunderstorm',
            'description' : '천둥번개',
            'icon' : 'wi-thunderstorm'
        },

        {   'type' : 'Drizzle',
            'description' : '이슬비',
            'icon' : 'wi-rain'
        },

        {   'type' : 'Rain',
            'description' : '비',
            'icon' : 'wi-rain'
        },

        {   'type' : 'Snow',
            'description' : '눈',
            'icon' : 'wi-snow'
        },

        {   'type' : 'Mist',
            'description' : '안개',
            'icon' : 'wi-fog'
        },

        {   'type' : 'Smoke',
            'description' : '안개',
            'icon' : 'wi-smoke'
        },

        {   'type' : 'Haze',
            'description' : '안개',
            'icon' : 'wi-fog'
        },

        {   'type' : 'Dust',
            'description' : '먼지',
            'icon' : 'wi-dust'
        },

        {   'type' : 'Fog',
            'description' : '미세먼지',
            'icon' : 'wi-fog'
        },

        {   'type' : 'Sand',
            'description' : '황사',
            'icon' : 'wi-sandstorm'
        },

        {   'type' : 'Ash',
            'description' : '황사',
            'icon' : 'wi-sandstorm'
        },

        {   'type' : 'Squall',
            'description' : '돌풍',
            'icon' : 'wi-tornado'
        },

        {   'type' : 'Tornado',
            'description' : '토네이도',
            'icon' : 'wi-tornado'
        },

        {   'type' : 'Clear',
            'description' : '맑음',
            'icon' : 'wi-day-sunny'
        },

        {   'type' : 'Clouds',
            'description' : '구름',
            'icon' : 'wi-cloudy'
        },
    ]
})

export const mutations = {
    SET_SKYSCANNER(state, payload) {
        state._skyscanner = payload
    },

    async SET_WEATHER(state, payload) {
        
        state._currentWeather = {'temp_max' : Math.round(payload.data.main.temp_max - 273.15),
                               'temp_min' : Math.round(payload.data.main.temp_min - 273.15),
                               'temp_current' : Math.round(payload.data.main.temp - 273.15)}

        state._currentWeather.icon = await state._weatherIndex.reduce((n, o) => {
            return n['type'] == payload.data.weather[0].main ? n : o
        })
    }
}

export const actions = {

    async SKYSCANNER( {commit, state}, payload ) {
        
        const skyscanner = await this.$axios.post('/other/skyscanner', {
            param : {
                countryCode : payload.countryCode
            }
        })
    
        const result = await skyscanner.data.Quotes.reduce( (n, o) => {
            return n.MinPrice < o.MinPrice ? n : o
        })

        commit('SET_SKYSCANNER', result)

        return result
    },

    async TIMEZONE({commit, state}, payload) {
        const timezone =  payload.timezone
        // ? Timezone의 경우,  Api까지 갈 필요 없음.
        return  await momentTimezone.tz(timezone)
    },

    async WEATHER({commit, state}, payload) {

        const weather = await this.$axios.post('/other/weather', {
            param : {
                lat : payload.lat,
                lon : payload.lon,
            }
        })

        commit('SET_WEATHER', weather)
    }

}

export const strict = false