import Vue from 'vue';
import Vuex from 'vuex';
import { Http } from '@nativescript/core'

Vue.use(Vuex);

const volunteerStore = {
    namespaced: true,
    state:{
        volunteers: [],
        selectedVolunteer: {},              
    },
    getters:{
        
    },
    mutations:{
        // 데이터 변환 부분(데이터를 실제로 변환하는 것은 이 부분에서만 가능)
        setVolunteers: function(state, volunteers) {
            state.volunteers = volunteers;
        },
        selectVolunteer: function(state, selectedvolunteer) {
            state.selectedVolunteer = selectedvolunteer;
        },
    },
    actions:{
        fetchVolunteers: function(context) {
            Http.request({
                    url: 'https://selectmeat.backendless.app/api/data/volunteer',
                    method: 'GET'
                })
                .then((HttpResponse) => {
                    context.commit('setVolunteers', JSON.parse(JSON.stringify( HttpResponse.content))  );            
                },
                err => {
                    console.log(err);                    
                }
            )
        },
        
       
        
    },
};

export default volunteerStore;