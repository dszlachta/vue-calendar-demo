<template>
  <div>

    <nav class="ui buttons">
      <sui-button icon="home" @click="$emit('today')">Today</sui-button>
      <sui-button icon="angle left" @click="$emit('previous')"></sui-button>
      <sui-button icon="angle right" @click="$emit('next')"></sui-button>
    </nav>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
nav.ui.buttons {
    display: flex;

    height: var(--date-switcher-height);
}
</style>
