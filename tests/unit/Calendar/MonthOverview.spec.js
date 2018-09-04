import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MonthOverview from '@/components/Calendar/MonthOverview.vue';
import Month from '@/lib/month';

const localVue = createLocalVue();
localVue.use(Vuex);

let days = [];
let wrapper = {};
let store = {};
const date = new Date(2018, 2);
const monthName = 'March';

beforeEach(() => {
    days = Month.getDaysFor(date);
    store = new Vuex.Store({
        modules: {
            calendar: {
                namespaced: true,
                actions: {
                    setDate: jest.fn()
                }
            }
        }
    });
    wrapper = shallowMount(MonthOverview, {
        propsData: {
            date
        },
        store,
        localVue
    });
});

describe('MonthOverview.vue', () => {
    it('renders month name', () => {
        expect(wrapper.find('caption').text()).toMatch(monthName);
    });

    it('renders header properly', () => {
        expect(wrapper.findAll('thead th').length).toEqual(7); // 7 days of week
    });

    it('renders correct number of days with table offset', () => {
        /* The first day of March 2018 is on Thusday, so if weeks start
           on Sunday, the offset should be 4 (Sun, Mon, Tue, Wed)
        */
        expect(wrapper.findAll('tr td').length).toEqual(days.length + 4);
        expect(wrapper.find(`tr td:nth-of-type(2)`).text()).toMatch('');
    });
});
