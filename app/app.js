import Vue from 'nativescript-vue'

import tabview from './components/TabView'

import store from './store/index'

new Vue({  
  store,
  render: (h) => h(tabview),// h('frame', [h(tabview)]),
}).$start()

store.dispatch('db/init');