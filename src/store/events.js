import Vue from 'vue';

function getKeyForEvent(event) {
    return (+ new Date(event.date).setHours(0, 0, 0, 0));
}

export default {
    namespaced: true,
    state: {
        events: {}
    },
    getters: {
        events(state) {
            return state.events;
        },
        currentDayEvents(state, getters, rootState, rootGetters) {
            const currentKey = (+ (rootGetters['calendar/date']).setHours(0, 0, 0, 0));
            return state.events[currentKey] || [];
        }
    },
    mutations: {
        loadEvents(state, events) {
            state.events = events || {};
        },
        addEvent(state, newEvent) {
            const key = getKeyForEvent(newEvent);

            Vue.set(
                state.events,
                key,
                [
                    ...state.events[key] || [],
                    newEvent
                ]
            );
        },
        updateEvent(state, updatedEvent) {
            const key = getKeyForEvent(updatedEvent);
            const events = state.events[key];

            const updatedEvents = events.map(event => {
                return event.id === updatedEvent.id ? updatedEvent : event;
            });

            Vue.set(
                state.events,
                key,
                updatedEvents
            );
        },
        deleteEvent(state, eventToDelete) {
            const key = getKeyForEvent(eventToDelete);
            const events = state.events[key];

            const restOfEvents = events.filter(({ id }) => {
                return id !== eventToDelete.id;
            });

            Vue.set(
                state.events,
                key,
                restOfEvents
            );
        }
    },
    actions: {
        loadEvents({ commit }, events) {
            commit('loadEvents', events);
        },
        addEvent({ commit }, newEvent) {
            commit('addEvent', newEvent);
        },
        updateEvent({ commit }, updatedEvent) {
            commit('updateEvent', updatedEvent);
        },
        deleteEvent({ commit }, deletedEvent) {
            commit('deleteEvent', deletedEvent);
        }
    }
};
