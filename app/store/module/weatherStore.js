import Vue from 'vue';
import Vuex from 'vuex';


import { getWeather, dailyForecast, showWeather, getLocation } from 'nativescript-weather-api';

Vue.use(Vuex);

const weatherStore = {
    namespaced: true,
    state:{
        weatherData: [ ],                   
    },
    getters:{
                
    },
    mutations:{
       setWeatherData(state, data){
            state.weatherData = data;
       },
    },
    actions:{           
        showWeather: async function(context, item){
            console.log( "store: showWeather" );

            const apikey = '7d77e53bc3038d9dbcc941ba7a9a5054';

            console.log( "API Key: " + apikey  );

            await getLocation().then((location) => {


                console.log( "store: getLocation" );

                getWeather({
                    key: apikey,
                    lat: location.latitude,
                    lon: location.longitude,
                    unit: "metric"

                }).then(() => {


                    console.log( "store: getWeather" );

                  
                    var day =  item;
                    var lat = location.latitude;
                    var lon = location.longitude;

                    console.log( "Latitude: " + lat  );
                    console.log( "Longtitude: " + lon  );

                    var data = new showWeather();                    

                    var wind = data.wind;                    
                    var country = data.country;
                    var weatherDescription = data.description;
                    var temp = data.temp;
                    var tempMin = data.temp_min;
                    var tempMax = data.temp_max;
                    var humidity = data.humidity;
                    var pressure = data.pressure;
                    var icon =  String.fromCharCode(data.icon);

                    var tempData = [ {
                        day: day,
                        lat: lat,
                        lon: lon,
                        wind: wind,
                        country: country,
                        weatherDescription: weatherDescription,
                        temp: temp,
                        tempMin: tempMin, 
                        tempMax: tempMax, 
                        humidity: humidity,
                        pressure: pressure,
                        icon: icon
                    } ];

                    console.log( JSON.stringify(tempData ) );

                    context.commit('setWeatherData',  JSON.parse(JSON.stringify(tempData ))  );                    

                }, (err) => {
                    console.log(err);                             
                });
                
            });
        },
       
    },
};

export default weatherStore;