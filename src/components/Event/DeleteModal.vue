<template>
    <div class="shadow" v-show="isVisible">
      <div class="modal-wrapper">
        <div class="delete-modal">
          <p>
            Are you sure that you want to delete this event?
          </p>

          <div class="actions">
            <sui-button positive basic @click.native="onKeep">
              Keep it
            </sui-button>
            <sui-button negative basic @click.native="onDelete">
              Delete it
            </sui-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        value: Boolean
    },
    computed: {
        isVisible: {
            get() {
                return this.value;
            },
            set(toValue) {
                this.$emit('input', toValue);
                return toValue;
            }
        }
    },
    methods: {
        onKeep() {
            this.isVisible = false;
            this.$emit('keep');
        },
        onDelete() {
            this.isVisible = false;
            this.$emit('delete');
        }
    }
};
</script>

<style scoped>
.shadow {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* Set z-index to 1001 to match SUI modal settings */
    z-index: 1001;

    background-color: rgba(0, 0, 0, .7);
}

.modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
}

.delete-modal {
    width: 80%;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
}

.actions {
    display: flex;
    margin-top: 20px;
}

.actions button {
    flex-grow: 1;
}
</style>
