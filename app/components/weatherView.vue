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
        <ListView for="idx in this.$store.state.weather.weatherData" height="*">
                <v-template>
                   <GridLayout row="*" col="*" rows="*,*,*,*,*,*,*,*" cols="*,*,*" marginBottom="10">
                        <Label row="0" col="0" :text="day" class="date" />                
                        <Label row="0" col="1" :text="idx.icon" class="icon" />                
                   
                        <Label row="1" col="0" text="Latitude: " horizontalAlignment="left" verticalAlignment="center" />
                        <Label row="1" col="1" :text="idx.lat" horizontalAlignment="center" verticalAlignment="center" />
                        <label row="1" col="2" text=" metric"  horizontalAlignment="right" verticalAlignment="center"/>
                    
                        <Label row="2" col="0" text="Longtitude: " horizontalAlignment="left" verticalAlignment="center" />
                        <Label row="2" col="1" :text="idx.lon" horizontalAlignment="center" verticalAlignment="center"/>
                        <label row="2" col="2" text=" metric" horizontalAlignment="right" verticalAlignment="center"/>
                    
                        <Label row="3" col="0" text="Temp: " horizontalAlignment="left" verticalAlignment="center" />
                        <Label row="3" col="1" :text="idx.temp" horizontalAlignment="center" verticalAlignment="center"/>                  
                        <label row="3" col="2" text=" °C" horizontalAlignment="right" verticalAlignment="center" />
                    
                        <Label row="4" col="0" text="Weather Description: " horizontalAlignment="left" verticalAlignment="center"/>
                        <Label row="4" col="1" :text="idx.weatherDescription" horizontalAlignment="right" verticalAlignment="center" />                  
                    
                        <Label row="5" col="0" text="Temp Min: " horizontalAlignment="left" verticalAlignment="center"/>
                        <Label row="5" col="1" :text="idx.tempMin" horizontalAlignment="center" verticalAlignment="center"/>  
                        <label row="5" col="2" text=" °C" horizontalAlignment="right" verticalAlignment="center"/>   
                    
                        <Label row="6" col="0" text="Temp Max: " horizontalAlignment="left" verticalAlignment="center" />
                        <Label row="6" col="1" :text="idx.tempMax" horizontalAlignment="center" verticalAlignment="center"/>  
                        <label row="6" col="2" text=" °C" horizontalAlignment="right" verticalAlignment="center" />
                    
                        <Label row="7" col="0" text="Humidity: " horizontalAlignment="left" verticalAlignment="center"/>
                        <Label row="7" col="1" :text="idx.humidity" horizontalAlignment="center" verticalAlignment="center"/>  
                        <label row="7" col="2" text=" %" horizontalAlignment="right" verticalAlignment="center" />
                    </GridLayout>    
                </v-template>
        </ListView>
    </StackLayout>
  </Page>
</frame>
</template>

<script>
  
  
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
};

  export default{    
    data(){
      return {
        day:null,

      };      
    }, 
    
    methods:{        
        showWeather: function() {
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
            var date = (data[0] + ". " + data[1] + ". " + data[2] + ". " + data[3] + "h") ;

            this.day = date.toString();
            this.$store.dispatch('weather/showWeather', day);
            console.log("clicked Weather Search!");
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
