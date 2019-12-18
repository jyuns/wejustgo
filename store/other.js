import momentTimezone from 'moment-timezone'

export const state = () => ({
    _skyscanner : null,
    _currentWeather : null,
    _weatherIndex : [
        {   
            'type' : 'Thunderstorm',
            'description' : '천둥번개',
            'icon' : 'storm'
        },

        {   'type' : 'Drizzle',
            'description' : '이슬비',
            'icon' : 'rain'
        },

        {   'type' : 'Rain',
            'description' : '비',
            'icon' : 'rain'
        },

        {   'type' : 'Snow',
            'description' : '눈',
            'icon' : 'snow'
        },

        {   'type' : 'Mist',
            'description' : '안개',
            'icon' : 'fog'
        },

        {   'type' : 'Smoke',
            'description' : '안개',
            'icon' : 'fog'
        },

        {   'type' : 'Haze',
            'description' : '안개',
            'icon' : 'fog'
        },

        {   'type' : 'Dust',
            'description' : '먼지',
            'icon' : 'fog'
        },

        {   'type' : 'Fog',
            'description' : '미세먼지',
            'icon' : 'fog'
        },

        {   'type' : 'Sand',
            'description' : '황사',
            'icon' : 'fog'
        },

        {   'type' : 'Ash',
            'description' : '황사',
            'icon' : 'fog'
        },

        {   'type' : 'Squall',
            'description' : '돌풍',
            'icon' : 'tornado'
        },

        {   'type' : 'Tornado',
            'description' : '토네이도',
            'icon' : 'tornado'
        },

        {   'type' : 'Clear',
            'description' : '맑음',
            'icon' : 'sun'
        },

        {   'type' : 'Clouds',
            'description' : '구름',
            'icon' : 'cloud'
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