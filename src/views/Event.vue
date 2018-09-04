<template>
    <section class="event-view">

      <delete-modal
        v-model="deleteModalOpened"
        @delete="deleteEvent">
      </delete-modal>

      <header>
        <h1>
          {{ header }}
        </h1>
        <sui-button
          negative
          icon="trash"
          v-show="isUpdate"
          @click="toggleDeleteModal">
          Delete
        </sui-button>
      </header>

      <event-form v-model="model">
      </event-form>

      <div class="actions">
        <sui-button @click="cancel">Cancel</sui-button>
        <sui-button primary @click="save">Add</sui-button>
      </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import uuid from 'uuid/v4';
import { flatten } from 'ramda';

import localStorage from '@/lib/local_storage';

import EventForm from '@/components/Event/Form';
import DeleteModal from '@/components/Event/DeleteModal';

export function createEvent(name='', date=new Date(), location='') {
    return {
        id: uuid(),
        name,
        date,
        location
    };
}

export default {
    components: {
        EventForm,
        DeleteModal
    },
    data() {
        return {
            model: createEvent(),
            deleteModalOpened: false
        };
    },
    computed: {
        ...mapGetters({
            events: 'events/events'
        }),
        isUpdate() {
            return this.$route.name === 'updateEvent';
        },
        header() {
            if (this.isUpdate) return 'Edit Event';

            return 'Add New Event';
        }
    },
    methods: {
        ...mapActions({
            addEvent: 'events/addEvent',
            updateStoreEvent: 'events/updateEvent',
            deleteStoreEvent: 'events/deleteEvent'
        }),
        createEvent() {
            this.addEvent(this.model);
            localStorage.set('events', this.events);

            this.model = createEvent();
        },
        updateEvent() {
            this.updateStoreEvent(this.model);
            localStorage.set('events', this.events);

            this.$router.push({ name: 'dayDetails' });
        },
        deleteEvent() {
            this.deleteStoreEvent(this.model);
            localStorage.set('events', this.events);
            this.cancel();
        },
        toggleDeleteModal() {
            this.deleteModalOpened = !this.deleteModalOpened;
        },
        save() {
            if (this.isUpdate) {
                this.updateEvent();
                return;
            }

            this.createEvent();
        },
        cancel() {
            this.$router.push({ name: 'dayDetails' });
        }
    },
    mounted() {
        if (!this.isUpdate) return;

        const allEvents = Object.values(this.events);

        this.model = flatten(allEvents)
            .find(({ id }) => id === this.$route.params.eventId);
    }
};
</script>

<style scoped>
.event-view {
    padding: 1rem;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

header h1 {
    margin: 0;
}

.actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;

    height: var(--date-switcher-height);
}

.actions button {
    width: 50%;
}
</style>
