<template>
    <div id="app">
      <app-navigation :current-route="$route"></app-navigation>
      <router-view/>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppNavigation from '@/components/AppNavigation.vue';

import localStorage from '@/lib/local_storage';

export default {
    components: {
        AppNavigation
    },
    methods: {
        ...mapActions({
            loadEvents: 'events/loadEvents'
        })
    },
    created() {
        // Sync saved events
        const events = localStorage.get('events');
        this.loadEvents(events);
    }
}
</script>

<style>
:root {
    --border-color-grey: #b9b7b7;
    --date-switcher-height: 4rem;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

button,
a,
.button {
    touch-action: manipulation;
}

table {
    width: 100%;
}
</style>
