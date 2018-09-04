<template>
  <div class="component-wrapper">
    <select v-model="hoursModel">
      <option v-if="isAmSelected" :value="0">
        12 (midnight)
      </option>
      <option v-for="hour in hours" :value="hour">
        {{ hour }}
      </option>
      <option v-if="isAmSelected" :value="12">
        12 (noon)
      </option>
    </select>
    <span class="hour-minutes-separator">
      :
    </span>
    <select v-model="minutesModel">
      <option v-for="minute in minutes" :value="minute">
        {{ minute | leadingZero }}
      </option>
    </select>
    <select v-model="amModel">
      <option :value="true">
        am
      </option>
      <option :value="false">
        pm
      </option>
    </select>
  </div>
</template>

<script>
import { times } from 'ramda';

function roundMinutes(minutes) {
    if (minutes % 5 === 0) return minutes;

    return minutes + (5 - (minutes % 5));
}

export default {
    props: {
        value: Object
    },
    data() {
        return {
            am: true
        };
    },
    filters: {
        leadingZero(value) {
            return parseInt(value, 10) < 10 ? `0${value}` : value;
        }
    },
    computed: {
        hours() {
            return times(number => number + 1, 11);
        },
        minutes() {
            return times(number => number * 5, 12);
        },
        isAmSelected() {
            return this.am;
        },
        amModel: {
            get() {
                return this.am;
            },
            set(value) {
                this.am = value;

                // There is no 0 or 12 on PM hours list, so reset
                // to 1 when PM is selected.
                if (!value && [0, 12].includes(this.hoursModel)) {
                    this.hoursModel = 1;
                    return;
                }

                this.updateHoursModel(this.hoursModel);
            }
        },
        hoursModel: {
            get() {
                const { hours } = this.value;

                if (hours > 12) {
                    this.am = false;
                    return hours - 12;
                }

                return hours;
            },
            set(value) {
                this.updateHoursModel(value);
            }
        },
        minutesModel: {
            get() {
                return roundMinutes(this.value.minutes);
            },
            set(minutes) {
                this.$emit('input', {
                    hours: this.value.hours,
                    minutes
                });
            }
        }
    },
    methods: {
        updateHoursModel(value) {
            const hours = this.isAmSelected ? value : value + 12;

            this.$emit('input', {
                hours,
                minutes: roundMinutes(this.value.minutes)
            });
        }
    },
    mounted() {
        // Update model so that we are sure minutes are rounded
        this.updateHoursModel(this.hoursModel);
    }
};
</script>

<style scoped>
.component-wrapper {
    display: flex;
    align-items: baseline;
}

.hour-minutes-separator {
    margin: 0 .5rem;
}

select {
    -webkit-appearance: none;
    appearance: none;

    border: none;
    padding: 0 1rem 0 0;

    background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVR42mNgwAfKy8v/48I4FeA0AacVDFQBAP9wJkE/KhUMAAAAAElFTkSuQmCC") no-repeat scroll right center transparent;

}

select:last-of-type {
    margin-left: 1rem;
}
</style>
