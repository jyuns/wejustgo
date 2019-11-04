var sf = require('sf')

module.exports = {
 
    //skyscanner
    fetchSkyscanner : async (axios, countryCode) => {

        const baseUrl = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/"
        const query = "KR/KRW/ko-KR/KR-sky/"+ countryCode +"-sky/anytime?inboundpartialdate=anytime"

        const skyscannerResult = await axios.get(
            baseUrl + query, {
                headers : {
                    'Content-Type' : 'routerlication/json',
                    'X-RapidAPI-Key' : '816dfd2fa1msh46ec4d788bb59c9p179cd6jsn888edaf79f6f'
                }
            }
        )

        return skyscannerResult
    },

    // weather
    fetchWeather : async (axios, lat, lon) => {
        
        const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
        const query = sf('?lat={lat}&lon={lon}', {lat : lat, lon : lon})
        const apiKey = '&appid=2ace0378daa150485ad803422c8f8e24'

        const weatherResult = axios.get(
            baseUrl + query + apiKey
        )

        return weatherResult
    } 
}