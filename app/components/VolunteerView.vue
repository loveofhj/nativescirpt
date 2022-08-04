<template>
<frame id="volunteerview">
  <Page actionBarHidden="true">    
    <ActionBar  style="background-color">          
      <Label text="volunteerview"  horizontalAlignment="center" verticalAlignment="top" />                      
    </ActionBar>
    
    <StackLayout padding="10">       
        <StackLayout orientation="horizontal">
             <button text='Open Volunteers' @tap="clickedOpen" />
        </StackLayout>           
        <ListView for="idx in this.$store.state.volunteer.volunteers" height="*" >
          <v-template>      
            <GridLayout row="*" col="*" rows="*,*,*,*,*" cols="*,*" class="item" marginBottom="10">
              <Label row="0" col="0" text="id:"  horizontalAlignment="left" verticalAlignment="center" />
              <Label row="0" col="1" :text="idx.id"  horizontalAlignment="right" verticalAlignment="center" />

              <Label row="1" col="0" text="objectId:" horizontalAlignment="left" verticalAlignment="center" />
              <Label row="1" col="1" :text="idx.objectId" horizontalAlignment="right" verticalAlignment="center"  />
<!-- 
              <Label row="2" col="0" text="Sys:" horizontalAlignment="left" verticalAlignment="center" />
              <Label row="2" col="1" :text="idx.sys" horizontalAlignment="right" verticalAlignment="center" />

              <Label row="3" col="0" text="Dia:" horizontalAlignment="left" verticalAlignment="center" />
              <Label row="3" col="1" :text="idx.dia" horizontalAlignment="right" verticalAlignment="center" />

              <Label row="4" col="0" text="Pulse:" horizontalAlignment="left" verticalAlignment="center" />
              <Label row="4" col="1" :text="idx.pulse" horizontalAlignment="right" verticalAlignment="center"/> -->
            </GridLayout>   
          </v-template>
        </ListView>   
    </StackLayout>
  </Page>
</frame>
</template>

<script>
 
  export default{
    data(){
        return {};
    }, 
    methods: {
        clickedOpen(){
            this.$store.dispatch("volunteer/fetchVolunteers");
            console.log("clicked open volunteers!");
        },
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
        border-radius: 10;
        border-width: 1;
        color:#3B5997;
        margin: 20;
        font-size: 12;
        border-color: #2b3c6a;
        background-color: white;        
    }
</style>
