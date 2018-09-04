<template>
    <section>

      <days-overview :year="year" :month="month" :days="days" :events="thisMonthEvents"></days-overview>

    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { flatten } from 'ramda';

import DaysOverview from './DaysOverview.vue';

import Month from '@/lib/month';

export default {
    components: {
        DaysOverview
    },
    computed: {
        ...mapGetters({
            year: 'calendar/year',
            month: 'calendar/month',
            days: 'calendar/days',
            events: 'events/events'
        }),
        thisMonthEvents() {
            const keys = Object.keys(this.events)
                  .filter(timestamp => {
                      return (new Date(parseInt(timestamp, 10))).getMonth() === this.month;
                  });

            return flatten(
                keys
                    .map(key => this.events[key])
            );
        }
    }
};
</script>
