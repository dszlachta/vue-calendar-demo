import { shallowMount } from '@vue/test-utils';
import Formats from '@/lib/formats';
import EventSummary from '@/components/Calendar/EventSummary.vue';

let wrapper = {};
const expectedDate = new Date(2018, 2, 1, 8, 0);
const expectedEvent = {
    date: expectedDate,
    id: 'test',
    name: 'Test Event'
};
const $router = {
    push: jest.fn()
};

beforeEach(() => {
    wrapper = shallowMount(EventSummary, {
        propsData: {
            event: expectedEvent
        },
        mocks: {
            $router
        }
    });
});

describe('EventSummary.vue', () => {
    it('renders correct event details', () => {
        expect(wrapper.find('time').text()).toMatch(Formats.eventTime(expectedEvent.date));
        expect(wrapper.find('.name').text()).toMatch(expectedEvent.name);
    });

    it('redirects to updateEvent on click', () => {
        wrapper.trigger('click');

        expect($router.push).toHaveBeenCalled();
        expect($router.push.mock.calls[0][0]).toEqual({
            name: 'updateEvent',
            params: { eventId: expectedEvent.id }
        });
    });
});
