import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate"
import NSVuexPersistent from 'nativescript-vuex-persistent'


Vue.use(Vuex);



//작성한 모듈 가져오기
import ble from './module/ble'
import tabview from './module/tabView'
import db from './module/dbStore'
import volunteer from './module/volunteeStore';
import weather from './module/weatherStore';



export default new Vuex.Store({
    modules:{
        ble: ble,   
        tabview: tabview,  
        db: db, 
        volunteer: volunteer, 
        weather: weather,
    },

    plugins: [
        NSVuexPersistent({
            paths: ["db", "volunteer" ],
        }),
    ]


});


