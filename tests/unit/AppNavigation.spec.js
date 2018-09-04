import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SuiVue from 'semantic-ui-vue';
import AppNavigation from '@/components/AppNavigation.vue';
import Formats from '@/lib/formats';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(SuiVue);

let store = {};

beforeEach(() => {
    store = new Vuex.Store({
        modules: {
            calendar: {
                namespaced: true,
                getters: {
                    date() {
                        return new Date();
                    }
                }
            }
        }
    });
});

describe('AppNavigation.vue', () => {
    it('renders correct header for year overview', () => {
        const wrapper = shallowMount(AppNavigation, {
            propsData: {
                currentRoute: { name: 'yearDetails' }
            },
            store,
            localVue
        });

        expect(wrapper.find('h1').text()).toMatch(Formats.year(new Date()));
    });

    it('renders correct header for month overview', () => {
        const wrapper = shallowMount(AppNavigation, {
            propsData: {
                currentRoute: { name: 'monthDetails' }
            },
            store,
            localVue
        });

        expect(wrapper.find('h1').text()).toMatch(Formats.month(new Date()));
    });

    it('renders correct header for day overview', () => {
        const wrapper = shallowMount(AppNavigation, {
            propsData: {
                currentRoute: { name: 'dayDetails' }
            },
            store,
            localVue
        });

        expect(wrapper.find('h1').text()).toMatch(Formats.day(new Date()));
    });
});
