import { shallowMount, createLocalVue } from '@vue/test-utils';
import SuiVue from 'semantic-ui-vue';
import TimeSelect from '@/components/TimeSelect.vue';

const localVue = createLocalVue();
localVue.use(SuiVue);

let wrapper = {};
const testTime = {
    hours: 4,
    minutes: 30
};

beforeEach(() => {
    wrapper = shallowMount(TimeSelect, {
        propsData: {
            value: testTime
        },
        localVue
    });
});

describe('TimeSelect.vue', () => {
    it('renders hours, minutes and time of day selects', () => {
        expect(wrapper.findAll('select').length).toBe(3);
    });

    it('sets correct values based on model', () => {
        expect(wrapper.vm.hoursModel).toBe(testTime.hours);
        expect(wrapper.vm.minutesModel).toBe(testTime.minutes);
        expect(wrapper.vm.amModel).toBe(testTime.hours <= 12);
    });

    it('changes between am/pm based on hour', () => {
        const expectedTime = {
            hours: 17,
            minutes: 0
        };

        wrapper.setProps({ value: expectedTime });
        expect(wrapper.vm.amModel).toBe(false);
    });
});
