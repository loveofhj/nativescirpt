<template>
<frame id="bpview">
  <Page actionBarHidden="true">    
    <ActionBar  style="background-color">          
      <Label text="LogView"  horizontalAlignment="center" verticalAlignment="top" />                      
    </ActionBar>
    
    <StackLayout padding="10">       
        <!-- <StackLayout orientation="horizontal">
            <Label :text="$props.item.BLEname"  />
        </StackLayout>            -->
        <ListView for="idx in this.$store.state.ble.loglist" height="*" >
          <v-template>      
            <GridLayout row="*" col="*" rows="*,*,*,*,*" cols="*,*" class="item" marginBottom="10">
              <Label row="0" col="0" :text="idx.logDate"  horizontalAlignment="left" verticalAlignment="center" />
              <Label row="0" col="1" :text="idx.logValue"  horizontalAlignment="right" verticalAlignment="center" />             
            </GridLayout>   
          </v-template>
        </ListView>   
    </StackLayout>
  </Page>
</frame>
</template>

<script>
 
  export default{
    props:['item'],
    data(){
      return {
        batteryLevel: '0',        
      }
    },  
  
  };
</script>


<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .item{
        //border-radius: 10;
        //border-width: 1;
        color:#3B5997;
        margin: 20;
        font-size: 13;
        border-color: #2b3c6a;
        background-color: white;        
    }
</style>
