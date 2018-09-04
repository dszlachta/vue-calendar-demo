import { shallowMount, createLocalVue } from '@vue/test-utils';
import { format } from 'date-fns';
import Vuex from 'vuex';
import SuiVue from 'semantic-ui-vue';
import DaysOverview, { getEventsForDay } from '@/components/Calendar/DaysOverview.vue';
import Month from '@/lib/month';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(SuiVue);

let days = [];
let wrapper = {};
let store = {};

const expectedDate = new Date(2018, 2, 1);
const expectedEvents = [
    {
        date: expectedDate,
        id: 'test',
        name: 'Test Event'
    }
];

beforeEach(() => {
    days = Month.getDaysFor(expectedDate);
    store = new Vuex.Store({
        modules: {
            calendar: {
                namespaced: true,
                getters: {
                    date() {
                        return expectedDate;
                    }
                },
                actions: {
                    setDate: jest.fn()
                }
            }
        }
    });
    wrapper = shallowMount(DaysOverview, {
        propsData: {
            days,
            month: expectedDate.getMonth(),
            year: expectedDate.getFullYear(),
            events: expectedEvents
        },
        store,
        localVue
    });
});

describe('DaysOverview.vue', () => {
    it('getEventsForDay is correct', () => {
        const result = getEventsForDay(expectedEvents, expectedDate);

        expect(result.length).toEqual(1);
    });

    it('renders correct number of days', () => {
        expect(wrapper.findAll('tr').length).toEqual(days.length);
    });

    it('renders correct day details', () => {
        const firstDay = wrapper.find('tr:first-of-type');
        const dayOfMonth = firstDay.find('th');
        const dayName = firstDay.find('td');

        expect(dayOfMonth.text()).toMatch(days[0].dayOfMonth.toString());
        expect(dayName.text()).toMatch(format(days[0].dayDate, 'dddd'));
    });

    it('renders events for a given day', () => {
        expect(wrapper.findAll('tr:first-of-type .task').length).toEqual(1);
    });
});
