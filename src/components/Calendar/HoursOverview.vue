<template>
    <section>

      <table v-show="hours.length">
        <tr v-for="([ hour, hourLabel ], index) in hours" :key="index">
          <th scope="row">
            {{ hourLabel }}
          </th>
          <td>
            <div class="ui segments">
              <sui-segment class="afternoon task" v-for="(event, index) in getEventsForHour(hour)" :key="index">
                <event-summary :event="event"></event-summary>
              </sui-segment>
            </div>
          </td>
        </tr>
      </table>

      <div v-show="!hours.length">
        No events for this day yet. Would you like to <router-link :to="{ name: 'createEvent' }">create a new event</router-link>?
      </div>

    </section>
</template>

<script>
import { getHours } from 'date-fns';

import Hours from '@/lib/hours';

import EventSummary from './EventSummary';

export function compareEventHour(hour, { date }) {
    return getHours(date) === hour;
}

export default {
    props: {
        events: {
            type: Array,
            default: () => []
        }
    },
    components: {
        EventSummary
    },
    computed: {
        hours() {
            return Hours.get()
            .filter(([ hour ]) => this.hasEvents(hour));
        }
    },
    methods: {
        hasEvents(hour) {
            return this.events
                .find(compareEventHour.bind(null, hour));
        },
        getEventsForHour(hour) {
            return this.events
                .filter(compareEventHour.bind(null, hour))
        }
    }
}
</script>

<style scoped>
tr:empty {
    display: none;
}
</style>
