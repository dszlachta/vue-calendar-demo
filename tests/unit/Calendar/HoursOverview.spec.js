import { shallowMount, createLocalVue } from '@vue/test-utils';
import { format } from 'date-fns';
import SuiVue from 'semantic-ui-vue';
import HoursOverview from '@/components/Calendar/HoursOverview.vue';

const localVue = createLocalVue();
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
    wrapper = shallowMount(HoursOverview, {
        propsData: {
            events: expectedEvents
        },
        stubs: [ 'router-link' ],
        localVue
    });
});

describe('HoursOverview.vue', () => {
    it('renders only hours with events', () => {
        expect(wrapper.findAll('tr').length).toBe(expectedEvents.length);
    });
});
