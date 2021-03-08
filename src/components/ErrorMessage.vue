<template>
  <div class="error-message">
    <div class="error-message__top">
      <div class="error-message__title">Error!</div>
      <button class="error-message__close" @click="close">
        <font-awesome-icon icon="times"/>
      </button>
    </div>

    <div class="error-message__content">
      <div class="error-message__icon">
        <font-awesome-icon icon="times"/>
      </div>
      <div>{{ content }}</div>
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
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    centerMessagePosition() {
      this.$el.style.left = (window.innerWidth / 2) - (this.$el.offsetWidth / 2) + 'px';
      this.$el.style.top = (window.innerHeight / 2) - (this.$el.offsetHeight / 2) + 'px';
    },
    randomizeMessagePosition() {
      const halfElWidth = this.$el.offsetWidth / 2;
      const halfElHeight = this.$el.offsetHeight / 2;
      this.$el.style.left = this.getRandomInt(halfElWidth, window.innerWidth - halfElWidth) - halfElWidth + 'px';
      this.$el.style.top = this.getRandomInt(halfElHeight, window.innerHeight - halfElHeight) - halfElHeight + 'px';
    },
    close() {
      this.$el.remove();
    }
  },
  mounted() {
    this.randomizeMessagePosition();
  }
}
</script>

<style lang="scss">
.error-message {
  @apply fixed flex flex-col bg-white shadow-md border border-gray-400 z-50;

  &__top {
    @apply flex justify-between items-center text-xs leading-none;
  }

  &__title {
    @apply m-3;
  }

  &__close {
    @apply flex justify-center items-center h-8 w-8 text-gray-500 mb-auto transition duration-200 ease-in-out cursor-default;

    &:hover, &:focus {
      @apply outline-none bg-red-600 text-black;
    }
  }

  &__content {
    @apply flex-grow flex justify-center items-center text-sm p-3;
  }

  &__icon {
    @apply text-2xl flex justify-center items-center bg-red-500 border border-red-700 text-white rounded-full w-10 h-10 mr-3;
  }

  &__bottom {
    @apply bg-gray-200 flex justify-end items-center border-t border-gray-400;
  }
}
</style>