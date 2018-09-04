<template>
    <section>
      <hours-overview :events="events"></hours-overview>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

import HoursOverview from './HoursOverview.vue';

export default {
    components: {
        HoursOverview
    },
    computed: {
        ...mapGetters({
            events: 'events/currentDayEvents'
        })
    }
};
</script>
