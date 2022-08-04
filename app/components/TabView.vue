<template lang="html">
    <Page id="main">
        <ActionBar>
            <NavigationButton visibility="collapse" v-if="!isAndroid" @tap="goBack" text="Back" android.systemIcon="ic_menu_back" />
            <StackLayout orientation="horizontal">
                <Image src="~/images/LOGO_JBCD_1.png" width="80" verticalAlignment="center" />
            </StackLayout>
        </ActionBar>
        <TabView tabTextFontSize="5" androidTabsPosition="bottom" tabTextColor="#767A79" selectedTabTextColor="#004097" androidSelectedTabHighlightColor="#004097" @selectedIndexChanged="selectedIndexChanged">
            
            <TabViewItem title="대상자 정보" >
                <volunteerView />
            </TabViewItem>
           
            <TabViewItem title="사용자 정보" >
                <userview />
            </TabViewItem>
           
            <TabViewItem title="블루투스 정보" >
                <ble />
            </TabViewItem>
           
            <TabViewItem title="혈압 정보">
                <bpview />
            </TabViewItem>
            
            <TabViewItem title="앱 정보">
                <appinfo />
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
import volunteerView from "./VolunteerView.vue"
import userview from "./userView.vue"
import ble from "./Home.vue"
import bpview from "./BPView.vue"
import appinfo from "./AppInfo.vue"
// import logview from "./LogView.vue"
// import { Application, AndroidApplication, Frame} from '@nativescript/core';
// import {exit} from 'nativescript-exit';


export default {
    components: { 
        volunteerView,       
        userview,
        ble,
        bpview,        
        appinfo,        
    },    
    created: function() {      
      this.$store.dispatch('db/init');      
      console.log("DB init Done!");
    },       
    methods: {
        selectedIndexChanged(args) {
            this.$store.commit('tabview/setTabViewIndex', args.newIndex);
        },
  
    },
};
</script>

<style lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
