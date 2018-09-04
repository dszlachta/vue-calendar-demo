<template>
<div>
    <section v-show="isVisible">
      <div class="actions">
        <sui-button icon="close" size="large" @click="toggle"></sui-button>
      </div>

      <nav>
        <sui-button primary icon="add" @click="changeRoute('createEvent')">
          Add Event
        </sui-button>

        <div class="ui vertical basic buttons calendar-modes">
          <sui-button @click="changeRoute('dayDetails')">
            Day
          </sui-button>
          <sui-button @click="changeRoute('monthDetails')">
            Month
          </sui-button>
          <sui-button @click="changeRoute('yearDetails')">
            Year
          </sui-button>
        </div>
      </nav>

    </section>
</div>
</template>

<script>
export default {
    props: {
        value: Boolean
    },
    computed: {
        isVisible() {
            return this.value;
        }
    },
    methods: {
        toggle() {
            this.$emit('input', !this.isVisible);
        },
        changeRoute(newRouteName) {
            this.$router.push({ name: newRouteName });
            this.toggle();
        }
    }
}
</script>

<style scoped>
section {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    padding: 10px;
    background: white;
}

.actions {
    display: flex;
    justify-content: flex-end;
}

nav {
    margin-top: 20px;
}

nav .button.primary {
    width: 100%;
}

/* Full class list in selector to overwrite a default
   display: flex-inline
*/
.ui.vertical.buttons.calendar-modes {
    display: flex;
    margin-top: 20px;
}
</style>
