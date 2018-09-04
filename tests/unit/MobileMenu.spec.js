import { mount, createLocalVue } from '@vue/test-utils';
import SuiVue from 'semantic-ui-vue';
import MobileMenu from '@/components/MobileMenu.vue';

const localVue = createLocalVue();
localVue.use(SuiVue);

const $router = {
    push: jest.fn()
};

let wrapper = {};

beforeEach(() => {
    wrapper = mount(MobileMenu, {
        propsData: {
            value: false
        },
        mocks: { $router },
        localVue
    });
});

describe('MobileMenu.vue', () => {
    it('renders hidden', () => {
        expect(wrapper.find('section').isVisible()).toBe(false);
    });

    it('shows if model is set to true', () => {
        wrapper.setProps({ value: true });
        expect(wrapper.find('section').isVisible()).toBe(true);
    });

    it('changes route on menu item click', () => {
        wrapper.setProps({ value: true });
        wrapper.find('button.primary').trigger('click');
        expect($router.push).toHaveBeenCalled();
    });
});
