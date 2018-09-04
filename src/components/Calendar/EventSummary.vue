<template>
  <div class="event-summary" @click="updateEvent">

    <div class="basic">
      <time>
        {{ time }}
      </time>
      <span class="name">
        {{ event.name }}
      </span>
    </div>

  </div>
</template>

<script>
import Formats from '@/lib/formats';

export default {
    props: {
        event: Object
    },
    computed: {
        time() {
            const { date } = this.event;

            return Formats.eventTime(date);
        }
    },
    methods: {
        updateEvent() {
            this.$router.push({
                name: 'updateEvent',
                params: { eventId: this.event.id }
            })
        }
    }
};
</script>

<style scoped>
time {
    font-weight: bold;
}
</style>
