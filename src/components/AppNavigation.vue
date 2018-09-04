<template>
    <div>
      <section class="flex">
        <h1>
          {{ header }}
        </h1>

        <sui-button
          icon="bars"
          size="large"
          @click.native="toggleMobileMenu"
          class="menu-toggle-button"></sui-button>
      </section>

      <MobileMenu v-model="isMobileMenuVisible"></MobileMenu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Formats from '@/lib/formats';

import MobileMenu from './MobileMenu.vue';

const routeNameToHeader = new Map([
    [ 'dayDetails', Formats.day ],
    [ 'monthDetails', Formats.month ],
    [ 'yearDetails', Formats.year ]
])

export default {
    props: {
        // This way we can test it more easily, than using
        // this.$route
        currentRoute: Object
    },
    components: {
        MobileMenu
    },
    data() {
        return {
            isMobileMenuVisible: false
        }
    },
    computed: {
        ...mapGetters({
            date: 'calendar/date'
        }),
        currentRouteName() {
            return this.currentRoute.name;
        },
        header() {
            const getHeaderFunction =
                  routeNameToHeader.get(this.currentRouteName) || routeNameToHeader.get('dayDetails');

            return getHeaderFunction(this.date);
        }
    },
    methods: {
        toggleMobileMenu() {
            this.isMobileMenuVisible = !this.isMobileMenuVisible;
        }
    }
};
</script>

<style scoped>
.flex {
    display: flex;
    align-items: baseline;
    padding: 10px;
    margin-bottom: 10px;
}

h1 {
    font-size: 1.5rem;
    flex-grow: 1;
}

.ui.button.menu-toggle-button {
    color: black;
    box-shadow: none;
    background: none;
}
</style>
