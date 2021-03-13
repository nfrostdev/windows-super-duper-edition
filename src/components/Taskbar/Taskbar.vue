<template>
  <div>
    <div class="taskbar">
      <button class="start-button"
              ref="startButton"
              @click="toggleStartMenu"
              :class="{'start-button--active': menuOpened}">
        <windows-logo/>
      </button>

      <div class="taskbar__datetime">
        <div>{{ time }}</div>
        <div>{{ date }}</div>
      </div>
    </div>

    <div v-if="menuOpened" class="start-menu">
      <div class="start-menu__sidebar">
        <button v-for="(sidebarButton, index) in sidebarButtons"
                :key="index"
                @click="dispatchErrorMessage"
                class="start-menu__sidebar__button">
          <font-awesome-icon :icon="sidebarButton"/>
        </button>
      </div>
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
      menuOpened: false,
      sidebarButtons: [
        'user-circle',
        {prefix: 'far', iconName: 'file'},
        {prefix: 'far', iconName: 'image'},
        'cog',
        'power-off'
      ]
    }
  },
  methods: {
    toggleStartMenu() {
      this.menuOpened = !this.menuOpened;
    },
    dispatchErrorMessage() {
      const message = 'An error has occurred while attempting to perform that action.';
      this.$store.dispatch('spawnErrorMessage', {content: message, isRandomlyPositioned: false})
    }
  },
  mounted() {
    this.updateInterval = setInterval(() => {
      const now = new Date();
      this.date = date.format(now, 'M/D/YYYY');
      this.time = date.format(now, 'h:mm A');
    }, 1000);

    document.addEventListener('click', event => {
      if (event.target !== document.querySelector('.start-button')) {
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
  @apply fixed flex bottom-0 left-0 mb-12 bg-gray-800 opacity-90 w-72;
  height: 32rem;

  &__sidebar {
    @apply flex flex-col justify-end text-white;

    &__button {
      @apply flex justify-center items-center w-12 h-12;

      &:hover {
        @apply bg-gray-700;
      }

      &:focus {
        @apply outline-none;
      }
    }
  }
}
</style>