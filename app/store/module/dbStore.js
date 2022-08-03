import Vue from 'vue';
import Vuex from 'vuex';

const Sqlite = require( "nativescript-sqlite" );

Vue.use(Vuex);

const dbStore = {
    namespaced: true,
    state:{
        database: null,
        data: [],
    },
    getters:{

    },
    mutations:{
        init(state, data) {
            state.database = data.database;
        },
        load(state, data) {
            state.data = [];
            for(var i = 0; i < data.data.length; i++) {
                state.data.push({
                    firstname: data.data[i][0],
                    lastname: data.data[i][1]
                });
            }
        },
        save(state, data) {
            state.data.push({
                firstname: data.data.firstname,
                lastname: data.data.lastname
            });
        },
        
    },
    actions:{
        init(context) {
            (new Sqlite("my.db")).then(db => {
                console.log("Create a table On SQLite");
                db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then(id => {
                    context.commit("init", { "database": db });
                    console.log("update db");
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                });
            }, error => {
                console.log("OPEN DB ERROR", error);
            });
        },
        insert(context, data) {            
            console.log("INSERT START");
            context.state.database.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [data.firstname, data.lastname]).then(id => {
                context.commit("save", { data: data });
            }, error => {
                console.log("INSERT ERROR", error);
            });
        },
        query(context) {
            console.log("Load START");
            context.state.database.all("SELECT firstname, lastname FROM people", []).then(result => {
                context.commit("load", { data: result });
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }
    },
};


export default dbStore;

