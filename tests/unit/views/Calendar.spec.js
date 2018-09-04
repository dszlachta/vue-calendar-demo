import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Calendar from '@/views/Calendar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper = {};
let store = {};
let actions = {};
const $route = {
    name: 'yearDetails'
};

beforeEach(() => {
    actions =  {
        setToday: jest.fn(),
        setNextYear: jest.fn(),
        setPreviousYear: jest.fn(),
        setNextMonth: jest.fn(),
        setPreviousMonth: jest.fn(),
        setNextDay: jest.fn(),
        setPreviousDay: jest.fn()
    };

    store = new Vuex.Store({
        modules: {
            calendar: {
                namespaced: true,
                actions
            }
        }
    });

    wrapper = shallowMount(Calendar, {
        store,
        stubs: [ 'router-view', 'date-switcher' ],
        mocks: { $route },
        localVue
    });
});

describe('Calendar View', () => {
    it('calls correct actions for setTodayDate', () => {
        wrapper.vm.setTodayDate();

        expect(actions.setToday).toHaveBeenCalled();
    });

    it('calls correct actions for yearDetails route', () => {
        $route.name = 'yearDetails';

        wrapper.vm.setPreviousDate();
        expect(actions.setPreviousYear).toHaveBeenCalled();

        wrapper.vm.setNextDate();
        expect(actions.setNextYear).toHaveBeenCalled();
    });

    it('calls correct actions for monthDetails route', () => {
        $route.name = 'monthDetails';

        wrapper.vm.setNextMonth();
        expect(actions.setNextMonth).toHaveBeenCalled();

        wrapper.vm.setPreviousMonth();
        expect(actions.setPreviousMonth).toHaveBeenCalled();
    });

    it('calls correct actions for dayDetails route', () => {
        $route.name = 'dayDetails';

        wrapper.vm.setNextDay();
        expect(actions.setNextDay).toHaveBeenCalled();

        wrapper.vm.setPreviousDay();
        expect(actions.setPreviousDay).toHaveBeenCalled();
    });
});
