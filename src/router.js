import Vue from 'vue';
import Router from 'vue-router';
import CalendarView from './views/Calendar.vue';
import EventView from './views/Event.vue';
import Year from './components/Calendar/Year.vue';
import Month from './components/Calendar/Month.vue';
import Day from './components/Calendar/Day.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'monthDetails' }
        },
        {
            path: '/details',
            component: CalendarView,
            children: [
                {
                    path: 'year',
                    name: 'yearDetails',
                    component: Year
                },
                {
                    path: 'month',
                    name: 'monthDetails',
                    component: Month
                },
                {
                    path: 'day',
                    name: 'dayDetails',
                    component: Day
                },
            ]
        },
        {
            path: '/event',
            component: EventView,
            children: [
                {
                    path: 'create/:eventDate?',
                    name: 'createEvent'
                },
                {
                    path: 'update/:eventId',
                    name: 'updateEvent'
                }
            ]
        }
    ]
});
