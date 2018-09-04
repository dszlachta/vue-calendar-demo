import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SuiVue from 'semantic-ui-vue';

import Year from '@/components/Calendar/Year.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(SuiVue);

let wrapper = {};
let store = {};

beforeEach(() => {
    store = new Vuex.Store({
        modules: {
            calendar: {
                namespaced: true,
                getters: {
                    year() {
                        return 2018;
                    }
                }
            }
        }
    });
    wrapper = shallowMount(Year, { store, localVue });
});

describe('Year.vue', () => {
    it('produces correct number of months', () => {
        expect(wrapper.vm.months.length).toEqual(12);
    });
});
