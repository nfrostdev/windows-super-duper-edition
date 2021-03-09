<template>
  <div class="error-message" ref="errorMessage">
    <div class="error-message__top" ref="errorMessageTop"
         @mousedown="movementEnabled = true"
         @mousemove="modifyMessagePosition($event)">
      <div class="error-message__title">Error</div>
      <button class="error-message__close" @click="close">
        <font-awesome-icon icon="times"/>
      </button>
    </div>

    <div class="error-message__content">
      <div class="error-message__icon">
        <font-awesome-icon icon="times"/>
      </div>
      <div>
        <p class="error-message__text">{{ content }}</p>
        <p class="error-message__restart">
          Please restart your computer and report this issue to Microsoft immediately!
        </p>
      </div>
    </div>

    <div class="error-message__bottom">
      <div @click="close">
        <windows-button text="OK"/>
      </div>
    </div>
  </div>
</template>

<script>
import WindowsButton from "@/components/WindowsButton";

export default {
  components: {WindowsButton},
  props: {
    content: String
  },
  data() {
    return {
      movementEnabled: false
    }
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeMessagePosition() {
      this.$refs.errorMessage.style.left = this.getRandomInt(96, window.outerWidth - this.$refs.errorMessage.offsetWidth) - 48 + 'px';
      this.$refs.errorMessage.style.top = this.getRandomInt(96, window.outerHeight - this.$refs.errorMessage.offsetHeight) - 48 + 'px';
    },
    modifyMessagePosition(event) {
      event.preventDefault();
      const xCoord = event.x;
      const yCoord = event.y;

      if (this.movementEnabled && (xCoord || yCoord)) {
        this.$refs.errorMessage.style.left = xCoord - (this.$refs.errorMessageTop.offsetWidth / 2) + 'px';
        this.$refs.errorMessage.style.top = yCoord - (this.$refs.errorMessageTop.offsetHeight / 2) + 'px';
      }
    },
    close() {
      this.$el.remove();
    }
  },
  mounted() {
    this.randomizeMessagePosition();

    document.addEventListener('mouseup', () => this.movementEnabled = false)
  }
}
</script>

<style lang="scss">
.error-message {
  @apply fixed flex flex-col w-96 bg-white shadow-md border border-black z-50;

  &__top {
    @apply flex justify-between items-center text-xs leading-none w-full;
  }

  &__title {
    @apply m-3;
  }

  &__close {
    @apply flex justify-center items-center h-9 w-9 text-gray-500 mb-auto transition duration-200 ease-in-out cursor-default;

    &:hover, &:focus {
      @apply outline-none bg-red-600 text-white;
    }
  }

  &__content {
    @apply flex-grow flex justify-start items-center text-sm p-3;
  }

  &__icon {
    @apply text-2xl flex justify-center items-center bg-red-500 border border-red-700 text-white rounded-full w-10 h-10 mr-3 flex-shrink-0;
  }

  &__text {
    @apply break-all;
  }

  &__restart {
    @apply mt-2;
  }

  &__bottom {
    @apply bg-gray-200 flex justify-end items-center border-t border-gray-400 p-3;
  }
}
</style>