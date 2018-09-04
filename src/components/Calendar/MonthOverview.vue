<template>
    <table @click="setMonth">
      <caption>
          {{ monthName }}
      </caption>

      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rowIndex in rows">
          <td v-for="(day, index) in getRow(rowIndex)" :key="index">
            <span
              class="day"
              :class="{ today: isToday(day) }"
              @click.stop="setDay(day.dayOfMonth)">
              {{ day ? day.dayOfMonth : '' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { mapActions } from 'vuex';
import { times, identity } from 'ramda';
import { setDate, isToday } from 'date-fns';

import Month from '@/lib/month';

export default {
    props: {
        date: Date,
    },
    computed: {
        days() {
            return Month.getDaysFor(this.date);
        },
        monthName() {
            return Month.getName(this.date.getMonth());
        },
        offset() {
            return this.days[0].dayOfWeek;
        },
        rows() {
            return times(identity, Math.ceil(
                (this.offset + this.days.length) / 7
            ));
        }
    },
    methods: {
        ...mapActions({
            setDate: 'calendar/setDate'
        }),
        getRow(rowIndex) {
            const rowStartIndex = rowIndex * 7;
            const rowEndIndex = rowStartIndex + 7;

            const visibleData =  [
                ...times(() => null, this.offset),
                ...this.days
            ];

            return visibleData.slice(rowStartIndex, rowEndIndex);
        },
        setDay(day) {
            const dayDate = setDate(this.date, day);

            this.setDate(dayDate);
            this.$router.push({ name: 'dayDetails' });
        },
        setMonth() {
            this.setDate(this.date);
            this.$router.push({ name: 'monthDetails' });
        },
        isToday(day) {
            // Offsets in the row are null
            if (!day) return false;

            const { dayDate } = day;

            return isToday(dayDate);
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    table-layout: fixed;
}

caption {
    font-size: 1rem;
}

td {
    text-align: right;
}

.day {
    cursor: pointer;
}

.today {
    padding: 2px 6px;
    background-color: rgba(255, 0, 0, .3);
    border-radius: 1rem;
    font-weight: bold;
}
</style>
