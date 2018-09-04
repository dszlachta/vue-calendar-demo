import Vue from 'vue';
import Vuex from 'vuex';

import events from './events';
import calendar from './calendar';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        events,
        calendar
    }
});

export default store;
