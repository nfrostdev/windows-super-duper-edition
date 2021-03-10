<template>
  <div class="window" ref="window"
       @mousedown="focusWindow"
       :class="{'window--regular': hasSizeControls}">
    <div class="window__top" ref="windowTop">
      <div class="window__title"
           @mousedown="movementEnabled = true"
           @mousemove="modifyMessagePosition($event)">{{ title }}
      </div>
      <div class="window__controls">
        <div v-if="hasSizeControls" class="window__size-controls">
          <button class="window__size-control" @click="close">
            <font-awesome-icon icon="minus"/>
          </button>
          <button class="window__size-control" @click="maximize">
            <font-awesome-icon :icon="{prefix: 'far', iconName: 'square'}"/>
          </button>
          <button class="window__size-control window__close" @click="close">
            <font-awesome-icon icon="times"/>
          </button>
        </div>
        <button v-else class="window__size-control window__size-control--square window__close" @click="close">
          <font-awesome-icon icon="times"/>
        </button>
      </div>
    </div>

    <div class="window__content">
      <slot/>
    </div>

    <div v-if="hasActions" class="window__bottom">
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
    title: {
      type: String,
      default: 'New Window'
    },
    hasSizeControls: {
      type: Boolean,
      default: true
    },
    isRandomlyPositioned: {
      type: Boolean,
      default: false
    },
    hasActions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      movementEnabled: false,
      isMaximized: false,
      storedWidth: null,
      storedHeight: null,
      storedTop: null,
      storedLeft: null
    }
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    centerMessagePosition() {
      this.$refs.window.style.left = (window.innerWidth / 2) - (this.$refs.window.offsetWidth / 2) + 'px';
      this.$refs.window.style.top = (window.innerHeight / 2) - (this.$refs.window.offsetHeight / 2) + 'px';
    },
    randomizeMessagePosition() {
      const xOffset = 384;
      const yOffset = 256;
      const padding = 48;
      this.$refs.window.style.left = this.getRandomInt(xOffset + (padding * 2), window.innerWidth) - xOffset - padding + 'px';
      this.$refs.window.style.top = this.getRandomInt(yOffset + (padding * 2), window.innerHeight) - yOffset - padding + 'px';
    },
    modifyMessagePosition(event) {
      const xCoord = event.x;
      const yCoord = event.y;

      if (this.movementEnabled && (xCoord || yCoord)) {
        this.$refs.window.style.left = xCoord - (this.$refs.windowTop.offsetWidth / 2) + 'px';
        this.$refs.window.style.top = yCoord - (this.$refs.windowTop.offsetHeight / 2) + 'px';
      }
    },
    maximize() {
      const component = this.$refs.window;
      if (this.isMaximized) {
        component.style.width = this.storedWidth;
        component.style.height = this.storedHeight;
        component.style.top = this.storedTop;
        component.style.left = this.storedLeft;
        this.isMaximized = false;
      } else {
        this.storedWidth = component.offsetWidth + 'px';
        this.storedHeight = component.offsetHeight + 'px';
        this.storedTop = component.style.top;
        this.storedLeft = component.style.left;

        component.style.width = '100%';
        component.style.height = window.innerHeight - document.querySelector('.taskbar').offsetHeight + 'px';
        component.style.top = 0;
        component.style.left = 0;
        this.isMaximized = true;
      }
    },
    close() {
      this.$el.remove();
    },
    focusWindow() {
      let zIndex = 1;
      document.querySelectorAll('.window').forEach(window => {
        window.style.zIndex = zIndex;
        zIndex++;
      })
      this.$refs.window.style.zIndex = zIndex;
    }
  },
  mounted() {
    document.addEventListener('mouseup', () => this.movementEnabled = false)

    this.isRandomlyPositioned
        ? this.randomizeMessagePosition()
        : this.centerMessagePosition()
  }
}
</script>

<style lang="scss">
.window {
  @apply fixed flex flex-col bg-white shadow-md border border-black z-50 w-96;

  &--regular {
    min-width: 25%;
    min-height: 25%;
  }

  &__top {
    @apply flex justify-start items-start text-xs leading-none w-full h-8;
  }

  &__title {
    @apply p-3 flex-grow;
  }

  &__controls {
    @apply flex justify-start items-start ml-auto h-full h-8;
  }

  &__size-control {
    @apply flex justify-center w-12 h-8 h-full items-center text-gray-500 mb-auto transition duration-200 ease-in-out cursor-default;

    &s {
      @apply flex justify-start items-start h-8;
    }

    &--square {
      @apply w-8;
    }

    &:hover {
      @apply bg-gray-300 text-black;
    }

    &:focus {
      @apply outline-none;
    }
  }

  &__close {
    &:hover {
      @apply bg-red-600 text-white;
    }

    &:focus {
      @apply outline-none;
    }
  }

  &__content {
    @apply flex-grow flex justify-start items-start text-sm p-3 border-t border-gray-300;
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