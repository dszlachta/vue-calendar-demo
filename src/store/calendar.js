import Vue from 'vue';
import {
    addYears,
    subYears,
    addMonths,
    subMonths,
    addDays,
    subDays
} from 'date-fns';

import Month from '../lib/month';

function getDefaultState(nowDate=new Date()) {
    return {
        date: nowDate,
        year: nowDate.getFullYear(),
        month: nowDate.getMonth(),
        day: nowDate.getDate(),
        days: Month.getDaysFor(nowDate)
    };
}

function updateState(state, newState) {
    Object.entries(newState)
        .forEach(([key, value]) => Vue.set(state, key, value));
}

export default {
    namespaced: true,
    state: getDefaultState(),
    getters: {
        date(state) {
            return state.date;
        },
        year(state) {
            return state.year;
        },
        month(state) {
            return state.month;
        },
        day(state) {
            return state.day;
        },
        days(state) {
            return state.days;
        }
    },
    mutations: {
        setDate(state, dateValue) {
            updateState(state, getDefaultState(dateValue));
        },
        setToday(state) {
            updateState(state, getDefaultState(new Date()));
        }
    },
    actions: {
        setNextYear({ commit, getters }) {
            commit(
                'setDate',
                addYears(getters.date, 1)
            );
        },
        setPreviousYear({ commit, getters }) {
            commit(
                'setDate',
                subYears(getters.date, 1)
            );
        },
        setNextMonth({ commit, getters }) {
            commit(
                'setDate',
                addMonths(getters.date, 1)
            );
        },
        setPreviousMonth({ commit, getters }) {
            commit(
                'setDate',
                subMonths(getters.date, 1)
            );
        },
        setNextDay({ commit, getters }) {
            commit(
                'setDate',
                addDays(getters.date, 1)
            );
        },
        setPreviousDay({ commit, getters }) {
            commit(
                'setDate',
                subDays(getters.date, 1)
            );
        },
        setDate({ commit }, newDate) {
            commit('setDate', newDate);
        },
        setMonth({ commit }, month) {
            commit('setMonth', month);
        },
        setDay({ commit }, day) {
            commit('setDay', day);
        },
        setToday({ commit }) {
            commit('setToday');
        }
    }
};
