<template>
  <div>
    <div class="taskbar">
      <button class="start-button" @click="toggleStartMenu" :class="{'start-button--active': menuOpened}">
        <windows-logo/>
      </button>

      <div class="taskbar__datetime">
        <div>{{ time }}</div>
        <div>{{ date }}</div>
      </div>
    </div>

    <div v-if="menuOpened" class="start-menu">

    </div>
  </div>
</template>

<script>
import WindowsLogo from "@/components/WindowsLogo";
import date from 'date-and-time'

export default {
  components: {WindowsLogo},
  data() {
    return {
      updateInterval: null,
      date: null,
      time: null,
      menuOpened: false
    }
  },
  methods: {
    toggleStartMenu() {
      this.menuOpened = !this.menuOpened;
    },
    checkElementAndParentsForClass(el, className) {
      if (el.classList && el.classList.contains(className)) {
        return true;
      } else {
        if (el.parentNode && el.parentNode.classList) {
          this.checkElementAndParentsForClass(el.parentNode, className)
        } else {
          return false;
        }
      }
    }
  },
  mounted() {
    this.updateInterval = setInterval(() => {
      const now = new Date();
      this.date = date.format(now, 'M/D/YYYY');
      this.time = date.format(now, 'h:mm A');
    }, 1000);

    document.addEventListener('click', event => {
      console.log(this.checkElementAndParentsForClass(event.target, 'taskbar'));
      if (this.menuOpened && !this.checkElementAndParentsForClass(event.target, 'taskbar')) {
        this.menuOpened = false;
      }
    })
  }
}
</script>

<style lang="scss">
.taskbar {
  @apply fixed flex justify-start items-center bottom-0 right-0 left-0 h-12 bg-gray-900 opacity-90;

  &__datetime {
    @apply flex flex-col justify-center items-center ml-auto text-white pr-3 text-xs;
  }
}

.start-button {
  @apply flex justify-center items-center w-16 h-full outline-none italic font-medium text-white cursor-default;

  &:hover {
    @apply bg-gray-800;
  }

  &:focus {
    @apply outline-none;
  }

  &--active {
    @apply bg-gray-700;

    &:hover {
      @apply bg-gray-700;
    }
  }
}

.start-menu {
  @apply fixed flex bottom-0 left-0 mb-12 bg-gray-800 opacity-90 w-96;
  height: 32rem;
}
</style>