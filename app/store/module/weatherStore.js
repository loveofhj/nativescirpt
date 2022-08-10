import Vue from 'vue';
import Vuex from 'vuex';


import { getWeather, dailyForecast, showWeather, getLocation } from 'nativescript-weather-api';
import { Http } from '@nativescript/core'

Vue.use(Vuex);



const weatherStore = {
    namespaced: true,
    state:{
        weatherData: [ ], 
        airData: [],                  
    },
    getters:{
                
    },
    mutations:{
       setWeatherData(state, data){
            state.weatherData = data;
       },
       setAirData(state, data){
            state.airData = data;
       }
    },
    actions:{    
        
        fetchAir: async function(context, item) {

            console.log('running function: featchAir ' + item);
            //var rootURL = 'https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc?';
            var rootURL = 'http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?';
            var serviceKey = 'vzKpJkLJUtb%2FXxUGA7tBHbv0Sdbt2u7scCVtjRUv4Q5qX6Y6Ln4qDTbLvFYST9JMtyeXwJ01gEV8zevZfso06Q%3D%3D';
            var requestParameter = encodeURIComponent('serviceKey') + '=' + serviceKey +'&';
            requestParameter += encodeURIComponent('returnType') + '=json&'  ;
            requestParameter += encodeURIComponent('numOfRows') + '=100&' ;
            requestParameter += encodeURIComponent('pageNo') + '=1&' ;
            requestParameter += encodeURIComponent('year') + '=2022&';
            requestParameter += encodeURIComponent('itemCode') + '=PM10';
            
            
            //console.log(rootURL + requestParameter);
            
            await Http.request({
                    url: rootURL + requestParameter,
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                })
                .then((HttpResponse) => {
                    var jsonData =JSON.parse(  JSON.stringify( HttpResponse.content ) );  
                    
                    
                    context.commit('setAirData', JSON.parse( JSON.stringify(jsonData.response.body.items) )  );            
                },
                err => {
                    console.log(err);                    
                }
            )
            console.log('running function: featchAir end point ');
        },

        fetchWeather: async function(context, item){
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

                  
                    var day = item;
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