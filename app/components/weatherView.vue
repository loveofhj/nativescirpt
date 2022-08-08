<template>
<frame id="weatherView">
  <Page actionBarHidden="true">    
    <ActionBar  style="background-color">          
      <Label text="WeatherView"  horizontalAlignment="center" verticalAlignment="top" />                      
    </ActionBar>
    
    <StackLayout padding="10">
        <StackLayout orientation="horizontal" >
            <TextField hint="input a city name"  v-model="query" ></TextField>
            <button :enabled="!!query" text="Search" @tap="showWeather"/>            
        </StackLayout>   
        <StackLayout> 
            <StackLayout orientation="horizontal" >
                <Label :text="day" class="date" />                
                <Label :text="icon" class="icon" />                
            </StackLayout> 
            <StackLayout orientation="horizontal" >
                <Label text="Latitude: " />
                <Label :text="lat" />
                <label text=" metric" />
            </StackLayout> 
            <StackLayout orientation="horizontal" >
                <Label text="Longtitude: " />
                <Label :text="lon" />
                <label text=" metric" />
            </StackLayout> 

            <StackLayout orientation="horizontal" >
                <Label text="Temp: " />
                <Label :text="temp" />                  
                <label text=" °C" />
            </StackLayout> 

            <StackLayout orientation="horizontal" >
                <Label text="Weather Description: " />
                <Label :text="weatherDescription" />                  
            </StackLayout> 

            <StackLayout orientation="horizontal" >
                <Label text="Temp Min: " />
                <Label :text="tempMin" />  
                <label text=" °C" />   
            </StackLayout> 

            <StackLayout orientation="horizontal" >
                <Label text="Temp Max: " />
                <Label :text="tempMax" />  
                <label text=" °C" />
            </StackLayout> 

            <StackLayout orientation="horizontal" >
                <Label text="Humidity: " />
                <Label :text="humidity" />  
                <label text=" %" />
            </StackLayout>        
        </StackLayout> 
    </StackLayout>
  </Page>
</frame>
</template>

<script>
  import { Http } from '@nativescript/core'
//   import axios from 'axios';
//   axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/';
  const apikey = 'input your key';

  import { getWeather, dailyForecast, showWeather, getLocation } from 'nativescript-weather-api';
 
// <!--degree symbol in UNICODE use-->
// &deg; or &#176;
export const WEATHER_ICONS = {
  day: {
    'clear': 0xf00d,
    'clouds': 0xf002,
    'drizzle': 0xf009,
    'rain': 0xf008,
    'thunderstorm': 0x010,
    'snow': 0xf00a,
    'mist': 0xf0b6
  },
  night: {
    'clear': 0xf02e,
    'clouds': 0xf086,
    'drizzle': 0xf029,
    'rain': 0xf028,
    'thunderstorm': 0xf02d,
    'snow': 0xf02a,
    'mist': 0xf04a
  },
  neutral: {
    'temperature': 0xf055,
    'wind': 0xf050,
    'cloud': 0xf041,
    'pressure': 0xf079,
    'humidity': 0xf07a,
    'rain': 0xf019,
    'sunrise': 0xf046,
    'sunset': 0xf052
  }
};

export function getIcons(icon_names) {
  var icons = icon_names.map((name) => {
    return {
      'name': name,
      'icon': String.fromCharCode(constants.WEATHER_ICONS.neutral[name])
    };
  });
  return icons;
}

  export default{    
    data(){
      return {
        query: '',
        error: false,
        lat: null,
        lon: null,
        city: '',
        country: '',
        weatherDescription: '',
        temp: null,
        tempMin: null,
        tempMax: null,
        humidity: null,
        icon: null,
        day:null,


      };      
    },  
    methods:{
        getStrDate(){            
            var today = new Date();                
            var year = today.getFullYear();
            var month =('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);        
            var hours = ('0' + today.getHours()).slice(-2); 
            var minutes = ('0' + today.getMinutes()).slice(-2);
            var seconds = ('0' + today.getSeconds()).slice(-2);         
            var milliseconds = today.getTime();
            const data = [];
    
            data[0] = year;        
            data[1] = month;
            data[2] = day;
            data[3] = hours;
            data[4] = minutes;
            data[5] = seconds;        
            var date = (data[0] + ". " + data[1] + ". " + data[2] + ". ") ;
            
            return date.toString();
        },    

        showWeather: async function(){
            console.log(this.query);              

            await getLocation().then((location) => {

                getWeather({

                    key: apikey,
                    lat: location.latitude,
                    lon: location.longitude,
                    unit: "metric"

                }).then(() => {
                    
                    this.day = this.getStrDate();
                    this.lat = location.latitude;
                    this.lon = location.longitude

                    var data = new showWeather();
                    
                    this.wind = data.wind;
                    //this.city = data.country;
                    this.country = data.country;
                    this.weatherDescription = data.description;
                    this.temp = data.temp;
                    this.tempMin = data.temp_min;
                    this.tempMax = data.temp_max;
                    this.humidity = data.humidity;
                    this.pressure = data.pressure;
                    this.icon =  String.fromCharCode(data.icon);

                });

            });

            // Open Weather API 유효기간 만료
            // let link = `https://api.openweathermap.org/data/2.5/weather?q=${this.query}&appid=${apikey}`;
            // console.log(link);
            // await Http.request({
            //         url: 'https://api.openweathermap.org/data/2.5/weather?q=${this.query}&appid=${apikey}',
            //         method: 'GET'
            //     })
            //     .then((response) => {
            //         console.log(response);  
                    
            //         this.city = response.data.name;
            //         this.country = response.data.country;
            //         this.weatherDescription = response.data.weather[0].description;  
            //         this.temp = response.data.main.temp;
            //         this.tempMin = response.data.main.temp_min;
            //         this.tempMax = response.data.main.temp_max;
            //         this.humidity = response.data.main.humidity;
            //         this.error = false;
            //     },
            //     err => {
            //         console.log(err);     
            //         this.error = ture;               
            //     }
            // );



            // axios.get( 'weather?q=${this.query}&appid=${apikey}', ).then( response => {
            //   this.city = response.data.name;
            //   this.country = response.data.country;
            //   this.weatherDescription = response.data.weather[0].description;  
            //   this.temp = response.data.main.temp;
            //   this.tempMin = response.data.main.temp_min;
            //   this.tempMax = response.data.main.temp_max;
            //   this.humidity = response.data.main.humidity;
            //   this.error = false;
            // })
            // .catch(()=>{
            //     this.error = true;
            //     this.city='';
            // });
        },
    }
  
  };
</script>


<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles  

    Page {
        font-size: 15px;
    }
    .item {
        padding: 20px 10px;
    }
     
    .date {
        font-size: 20px;
    }
    
    .icon {
        font-family: 'weathericons';
        font-size: 30px;
    }
</style>
