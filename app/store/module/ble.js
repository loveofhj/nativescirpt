import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const bleStore = {
    namespaced: true,
    state:{
        blelist : [] , 
        bplist: [ { 'bpDate':'2022-07-10', 'uuid':"28:FF:B2:2C:84:E4", 'sys':'120', 'dia':'70', 'pulse':'77' },
                  { 'bpDate':'2022-07-09', 'uuid':"28:FF:B2:2C:84:E4", 'sys':'127', 'dia':'72', 'pulse':'73' }, ],        
        loglist: [],
        batterylist: []
    },
    getters:{
        getAllBLEList: state => state.blelist,
        getAllBPList: state => state.bplist,        
        getLogAllList: state => state.loglist,
        getAllBatteryList: state => state.batterylist,
        getBPListbyUUID: (state) => (objUUID) => {
            var [obj] = state.ble.bplist.filter( bplist => bplist.uuj)
        }

    },
    mutations:{
        insertItem(state, item){
            state.blelist.push( item );
        },
        insertBPItem(state, item){
            state.bplist.push( item );
        }, 
        insertLog(state, item){
            state.loglist.push( item );
        },
        insertBatteryLevel(state, item){
            state.batterylist.push( item );
        }
    },
    actions:{
        // 블루투스 기기 Name, UUID 정보 추가
        addItem: function(context, item){
            context.commit('insertItem', item);
            console.log( JSON.stringify(item) );

        },
        // 혈압 정보 추가하기
        addBPItem: function(context, item){
            context.commit('inserBPItem', item);
            console.log( JSON.stringify(item) );
        },      
        //Log 리스트 추가하기
        addLog: function(context, item){           
            context.commit('insertLog', item);     
            console.log( JSON.stringify(item) );       
        },
        //배터리 리스트 추가하기
        addBatterylevel: function(context, item){                       
            context.commit('insertLog', item);     
            console.log( JSON.stringify(item) );       
        }
        
    },
};

export default bleStore;