<template>
<frame id="ble">
    <Page  actionBarHidden="true">
        <ActionBar  style="background-color" >
          <Label text="BLUETOOTH"  horizontalAlignment="center" verticalAlignment="top" />                      
        </ActionBar>
    <StackLayout>
      <StackLayout orientation="horizontal"  padding="5"  @tap="clickedBtn1" class="btn-img">        
        <Image src="~/images/bluetooth_symbol.png" width="10%" verticalAlignment="center" marginRight="10" />
        <Label text="Bluetooth Scan" horizontalAlignment="center"  />
      </StackLayout> 
      <!-- <StackLayout>
        <Progress value="0" maxValue="100" (valueChanged)="onValueChanged($event)"></Progress>
      </StackLayout> -->
      <StackLayout orientation="horizontal" row="0"  padding="5" >
        <ListView for="item in getBleList" height="*" @itemTap="clickedListItem" >
          <v-template> 
            <GridLayout row="*" col="*" rows="*,*" cols="*,*,*" class="item" >
              <Image row="0" col="0" marginRight="10" src="~/images/bluetooth_scan.png"  width="10%" horizontalAlignment="left" verticalAlignment="center" />
              <!-- <Label row="0" col="1" width="10%" horizontalAlignment="left"  text="Name:" verticalAlignment="center" /> -->
              <Label row="0" col="1" width="*" :text="item.BLEname"  horizontalAlignment="center" verticalAlignment="center" />

              <!-- <Label row="1" col="1" width="10%"  horizontalAlignment="left" text="UUID:"  verticalAlignment="center" />
              <Label row="1" col="2" width="*" :text="item.UUID" horizontalAlignment="right" verticalAlignment="center"  /> -->
            </GridLayout>             
          </v-template>
        </ListView>
      </StackLayout> 
      
    </StackLayout>
    </Page>
</frame>    
</template>

<script>

  import { Bluetooth } from "@nativescript-community/ble";    
  


  var bluetooth = new Bluetooth();

  export default {
    data(){
        return { };            
    },
    beforeCreate: function() {      
      
      console.log("beforeCreate Area"); 
      //recordLog("beforeCreate Area");
    },  
    created: function() {
      console.log("created Area");        
      //recordLog("created Area"); 
    },  
    mounted: function () {
      console.log("mounted Area");   
      //recordLog("mounted Area");  
    },  
    updated: function(){
      console.log("updated Area");    
      //recordLog("updated Area");            
    },  
    computed: {
        getBleList(){
            return this.$store.getters['ble/getAllBLEList'];
        },
        getBPList(){
            return this.$store.getters['ble/getAllBPlist'];
        }, 
        getLogList(){
            return this.$store.getters['ble/getLogAllList'];
        }      
    },
     
    methods: {
      // recordLog: function( item ){      
      //   var newData = { 'logDate': getStrDate(), 'logValue': item}
      //   this.$store.dispatch( 'ble/addLog', JSON.parse(JSON.stringify(newData)) );
      // }, 
     
      clickedBtn1() {

        bluetooth.isBluetoothEnabled().then(
          (enabled) => { 
             console.log("Enabled? " + enabled);                 
          }
        );
        bluetooth.hasLocationPermission().then(
          (granted) => {          
            console.log("Has Location Permission? " + granted);            
          }
        );
        bluetooth.requestLocationPermission().then(
          (granted) => {
            console.log("Location permission requested, user granted? " + granted);            
          }
        );
        bluetooth.startScanning({
          //filters: [{serviceUUID:'1810'}],   //},{serviceUUID:'FE4A'}
          seconds: 1,
          onDiscovered: (peripheral) => {                           
              var UIDD = peripheral.UUID;
              var bleName = peripheral.name;
              var newItem = {BLEname: bleName, UUID: UIDD };              
              if( bleName != null){
                console.log("Periperhal found with UUID : " + UIDD);
                console.log("Periperhal found with name :" + bleName);              
                console.log( 'Peripheral.advertismentData.serviceUUIDs: ' + peripheral.advertismentData?.serviceUUIDs);     

                var check = true;
                
                for( let i=0;i<this.getBleList.length; i++){
                  var item = this.getBleList[i]
                  console.log(JSON.stringify(item))
                   if(JSON.stringify(item)===JSON.stringify(newItem)){
                    check = false;
                   }                   
                }
                if( check )
                {
                  console.log(check);                  
                  
                  this.$store.dispatch( 'ble/addItem', JSON.parse(JSON.stringify(newItem)) );
                }
              }
          }
        }).then( () => {
          console.log("scanning complete");          
        }, (err) => {
          console.log("error while scanning: " + err);          
        });

      },
      clickedListItem( event ){

        console.log(  JSON.parse(JSON.stringify(event.item)) );
        
        this.onConnect(event.item);

        
        //this.$root.nativeView.showModal('bpview');

        // this.$navigateTo( { 
        //   frame: 'bpview', 
        //   props:{item:event.item} 
        //   });
      },
      getNumberOfWeek() {
          const today = new Date();
          const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
          const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
          return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      },      
      getDate(){            
        var today = new Date();        
        var week =  this.getNumberOfWeek();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;  //('0' + (today.getMonth() + 1)).slice(-2);
        var day = today.getDay();//('0' + today.getDate()).slice(-2);        
        var hours = today.getHours(); //('0' + today.getHours()).slice(-2); 
        var minutes = today.getMinutes(); //('0' + today.getMinutes()).slice(-2);
        var seconds = today.getSeconds(); //('0' + today.getSeconds()).slice(-2); 
        
        var milliseconds = today.getTime();
        const data = new Uint8Array(10);
 
        data[0] = year;
        data[1] = ((year >> 8) & 0xFF);
        data[2] = month;
        data[3] = day;
        data[4] = hours;
        data[5] = minutes;
        data[6] = seconds;
        data[7] = (week + 5) % 7 + 1; // Rotate
        data[8] = (milliseconds * 256 / 1000); // Fractions256
        data[9] = 1; // Adjust Reason: Manual time update
                
        return data 
      },              
      
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
        var date = (data[0] + "-" + data[1] + "-" + data[2] + " " + data[3] + ":" + data[4] + ":" + data[5]);        
        
        return date.toString()
      },    
      
      onConnect(item){
         bluetooth.connect({
          UUID: item.UUID,
          autoDiscoverAll: true,
          onConnected: (peripheral) => {
            console.log("Periperhal connected with UUID: " + peripheral.UUID);

            //배터리 상태 읽어오기
            bluetooth.startNotifying({
              peripheralUUID: item.UUID,
              serviceUUID: '180F',
              characteristicUUID: '2A19',
              onNotify:  (result) => {
              // see the read example for how to decode ArrayBuffers
              //console.log("read: " + JSON.stringify(result));
              //this.batteryLevel = JSON.stringify(result);
              var newDate = this.getStrDate()
              var newData;
              if (result.value) {                        
                  var data = new Uint8Array(result.value);
                  //console.log("read: " + data); 
                  newData = { 'date': newDate, 'batteryLevel': data.toString()};
                  console.log(JSON.stringify(newData)); 
                }   
              }  
            }).then(function() {
              console.log("Battery Service");
            },(err) => {
              console.log("Battery Service error: " + err);              
            });

            // 날짜 정보 읽어오기
            bluetooth.startNotifying({
                peripheralUUID: item.UUID,
                serviceUUID: '1805',
                characteristicUUID:'2A2B',
                onNotify: (result) => {
                    // see the read example for how to decode ArrayBuffers
                    // 날짜 갱신
                    bluetooth.write({
                      peripheralUUID: item.UUID,
                      serviceUUID: '1805',
                      characteristicUUID: '2A2B', 
                      value: this.getDate()
                    }).then( (result) => {                      
                      console.log("Current Time Written");                        
                    }, (err) => {
                      console.log("Current Time Service Write error: " + err);                      
                    });   
                        
                }
                }).then( ()=> {
                console.log("Current Time Service"); 
                },(err) => {
                console.log("Current Time Service error: " + err);                
            });


            // 혈압정보 읽어오기
            bluetooth.startNotifying({
                peripheralUUID: item.UUID,
                serviceUUID: '1810',
                characteristicUUID: '2A35',
                onNotify:  (result) => {
                  // see the read example for how to decode ArrayBuffers
                console.log("read: " + JSON.stringify(result));
                
                var sys;
                var dia;
                var pulse;
                // var year;
                // var month;
                // var day;
                // var hours;
                // var minutes;
                // var seconds;
                var newDate;
                

                if (result.value) {                        
                    var data = new Uint8Array(result.value);
                    console.log("read: " + data); 
                    sys = "SYS: " + data[1].toString();
                    dia = "DIA: " + data[3].toString();
                    // year = data[7].toString();
                    // month = data[9].toString();
                    // day = data[10].toString();
                    // hours = data[11].toString();
                    // minutes= data[12].toString();
                    // seconds= data[13].toString();
                    pulse = "PULSE: " + data[14].toString(); 
                    
                    //newDate = year + '-' + month + '-' + day + '-' + hours + ':' + minutes + ':' + seconds;     
                    newDate = this.getStrDate();
                    
                    const newdata =  { 'bpDate':newDate, 'uuid':item.UUID , 'sysblm': sys, 'diablm': dia, 'pulseblm': pulse };

                    //this.bpmlist.push(newdata);
                     this.$store.dispatch( 'ble/addBPItem', JSON.parse(JSON.stringify(newdata)) );
                }             

                console.log("Done")
                }  
              }).then( (result) => {          
                console.log("Blood Pressure Measurement");
              },(err) => {
                console.log("Blood Pressure Measurement error: " + err);          
              });
          },
          onDisconnected: function (peripheral) {
            console.log("Periperhal disconnected with UUID: " + peripheral.UUID);            
          }
        });   
      }    
    }
  };
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles

    .item{
        border-radius: 5;
        border-width: 1;
        color:#3B5997;
        margin: 10;
        font-size: 13;
        border-color: #2b3c6a;
        background-color: rgba(216, 204, 204, 0.11);
    }

    .btn-img{
        border-radius: 5;
        border-width: 1;
        color: white;
        margin: 10;
        font-size: 22;
        border-color: #2b3c6a;
        background-color: #3B5997;
    }
</style>
