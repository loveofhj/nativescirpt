import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const tabviewStore = {
    namespaced: true,
    state: {
        // 데이터 부분 vue의 data와 유사
        tabViewIndex: 0,
    },
    mutations: {
        // 데이터 변환 부분(데이터를 실제로 변환하는 것은 이 부분에서만 가능)
        setTabViewIndex: function(state, tabViewIndex) {
            state.tabViewIndex = tabViewIndex;
        },
    },
    actions: {
        // 함수부분(비동기처리 ex. db 업데이트) vue의 method와 유사
        setBPView: function(state, index ){
            this.setTabViewIndex(state, index);
        },
    },
    getters: {
        // vue의 computed와 유사
    }
};

export default tabviewStore
