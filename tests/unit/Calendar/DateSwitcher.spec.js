import { mount, createLocalVue } from '@vue/test-utils';
import SuiVue from 'semantic-ui-vue';
import DateSwitcher from '@/components/Calendar/DateSwitcher.vue';

const localVue = createLocalVue();
localVue.use(SuiVue);

let wrapper = {};

beforeEach(() => {
    wrapper = mount(DateSwitcher, { localVue });
});

describe('DateSwitcher.vue', () => {
    it('renders buttons: today, previous and next', () => {
        expect(wrapper.findAll('button').length).toBe(3);
    });

    it('emits correct events on buttons click', () => {
        const buttons = [
            wrapper.find('nav button:first-child'),
            wrapper.find('nav button:nth-child(2)'),
            wrapper.find('nav button:last-child')
        ];

        buttons.forEach(button => button.trigger('click'));

        expect(wrapper.emitted().today).toBeTruthy();
        expect(wrapper.emitted().previous).toBeTruthy();
        expect(wrapper.emitted().next).toBeTruthy();
    });
});
