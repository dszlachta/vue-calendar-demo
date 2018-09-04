<template>
    <section class="calendar-view">

      <div class="date-switcher-wrapper">
        <date-switcher
          @today="setTodayDate"
          @previous="setPreviousDate"
          @next="setNextDate"></date-switcher>
      </div>

      <div class="router-view-wrapper">
        <router-view></router-view>
      </div>

    </section>
</template>

<script>
import { mapActions } from 'vuex';

import localStorage from '@/lib/local_storage';

import DateSwitcher from '@/components/Calendar/DateSwitcher.vue';

export default {
    components: {
        DateSwitcher
    },
    methods: {
        ...mapActions({
            setToday: 'calendar/setToday',
            setNextYear: 'calendar/setNextYear',
            setPreviousYear: 'calendar/setPreviousYear',
            setNextMonth: 'calendar/setNextMonth',
            setPreviousMonth: 'calendar/setPreviousMonth',
            setNextDay: 'calendar/setNextDay',
            setPreviousDay: 'calendar/setPreviousDay',
        }),
        setTodayDate() {
            this.setToday();
        },
        setPreviousDate() {
            new Map([
                [ 'yearDetails', this.setPreviousYear ],
                [ 'monthDetails', this.setPreviousMonth ],
                [ 'dayDetails', this.setPreviousDay ]
            ]).get(this.$route.name)();
        },
        setNextDate() {
            new Map([
                [ 'yearDetails', this.setNextYear ],
                [ 'monthDetails', this.setNextMonth ],
                [ 'dayDetails', this.setNextDay ]
            ]).get(this.$route.name)();
        }
    }
};
</script>

<style scoped>
.calendar-view {
    margin-bottom: var(--date-switcher-height);
}

.date-switcher-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 1;
}

.router-view-wrapper {
    padding-bottom: var(--date-switcher-height);
}
</style>
