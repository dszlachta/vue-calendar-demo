<template>
    <form @submit.prevent>
      <div class="form-group">
        <label>
          What?
          <input type="text" v-model="name" placeholder="What event is it?" required>
        </label>
      </div>
      <div class="form-group">
        <label>
          Where?
          <input type="text" v-model="location" placeholder="Add location details">
        </label>
      </div>
      <div class="form-group">
        <label>
          When?
        </label>

        <div class="inputlike">
          <time-select v-model="time"></time-select>
        </div>
      </div>
  </form>
</template>

<script>
import { getHours, getMinutes, setHours, setMinutes, format } from 'date-fns';

import TimeSelect from '@/components/TimeSelect';

export default {
    props: {
        value: Object
    },
    components: {
        TimeSelect
    },
    computed: {
        name: {
            get() {
                return this.value.name;
            },
            set(value) {
                this.updateModel('name', value);
            }
        },
        location: {
            get() {
                return this.value.location;
            },
            set(value) {
                this.updateModel('location', value);
            }
        },
        time: {
            get() {
                return {
                    hours: getHours(this.value.date),
                    minutes: getMinutes(this.value.date)
                };
            },
            set({ hours, minutes }) {
                const newDate = setHours(setMinutes(this.value.date, minutes), hours);

                this.updateModel('date', newDate);
            }
        }
    },
    methods: {
        updateModel(key, value) {
            this.$emit('input', {
                ...this.value,
                ...{ [key]: value }
            });
        }
    }
};
</script>

<style scoped>
input {
    border: none;
}

input[type=text],
.inputlike {
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color-grey);
}

.form-group {
    margin-bottom: 2rem;
}
</style>
