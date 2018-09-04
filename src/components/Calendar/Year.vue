<template>
  <section>
    <div class="month-list">

      <sui-card-group :items-per-row="3" stackable>
        <sui-card v-for="(monthDate, index) in months" :key="index">
          <sui-card-content>
            <month-overview
              :date="monthDate">
            </month-overview>
          </sui-card-content>
        </sui-card>
      </sui-card-group>

    </div>
</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { times, identity } from 'ramda';

import MonthOverview from './MonthOverview';

export default {
    components: {
        MonthOverview
    },
    computed: {
        ...mapGetters({
            currentYear: 'calendar/year'
        }),
        months() {
            return times(identity, 12)
                .map((monthNumber) => {
                    return new Date(this.currentYear, monthNumber)
                });
        }
    }
};
</script>

<style scoped>
.month-list {
    padding: 10px;
}
</style>
