<template>
    <table>
      <tr v-for="(day, index) in days">
        <th scope="row">
          {{ day.dayOfMonth }}
        </th>
        <td>
          {{ getDayName(day) }}
        </td>
        <td>

          <div class="task-list">
            <div @click="goToDay(day)">
              <div class="morning-tasks ui segments">
                <sui-segment class="morning task" v-for="(event, index) in getEvents(day)" :key="index">
                  <event-summary :event="event"></event-summary>
                </sui-segment>
              </div>

              <div class="afternoon-tasks ui segments">
                <sui-segment class="afternoon task" v-for="(event, index) in getEvents(day, true)" :key="index">
                  <event-summary :event="event"></event-summary>
                </sui-segment>
              </div>
            </div>
            <div class="task-add-button">
              <a href="#" @click.prevent="goToCreateEvent(day)">
                Add new event
              </a>
            </div>
          </div>

        </td>
      </tr>
    </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { format, isSameDay, getHours, setDate } from 'date-fns';

import EventSummary from './EventSummary';

export function getEventsForDay(events, dayDate) {
    const isSameDayPredicate = ({ date }) => isSameDay(dayDate, date);
    const sortByTime = ({ date: dateA }, { date: dateB }) => dateA - dateB;

    return events
        .filter(isSameDayPredicate)
        .sort(sortByTime);
}

export default {
    props: {
        days: Array,
        month: Number,
        year: Number,
        events: Array
    },
    components: {
        EventSummary
    },
    computed: {
        ...mapGetters({
            date: 'calendar/date'
        })
    },
    methods: {
        ...mapActions({
            setDate: 'calendar/setDate'
        }),
        getDayName({ dayDate }) {
            return format(dayDate, 'dddd');
        },
        getEvents({ dayDate }, afternoon=false) {
            const beforeNoonPredicate = ({ date }) => getHours(date) <= 12;
            const afterNoonPredicate = ({ date }) => getHours(date) > 12;

            return getEventsForDay(this.events, dayDate)
            .filter(afternoon ? afterNoonPredicate : beforeNoonPredicate);
        },
        goToDay({ dayDate }) {
            this.setDate(dayDate);
            this.$router.push({ name: 'dayDetails' });
        },
        goToCreateEvent({ dayDate }) {
            this.setDate(dayDate);
            this.$router.push({ name: 'createEvent' });
        }
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

tr:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color-grey);
}

th,
td {
    padding: 1rem;
}

table tr:nth-child(odd) {
    background: #f6f6f6;
}

.task-list {
    display: flex;
    flex-direction: column;
}

.morning-tasks:empty,
.afternoon-tasks:empty {
    display: none;
}
</style>
