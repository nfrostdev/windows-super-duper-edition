<template>
  <div class="taskbar">
    <button class="start-button">
      <windows-logo/>
    </button>

    <div class="taskbar__datetime">
      <div>{{ time }}</div>
      <div>{{ date }}</div>
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
      time: null
    }
  },
  mounted() {
    this.updateInterval = setInterval(() => {
      const now = new Date();
      this.date = date.format(now, 'M/D/YYYY');
      this.time = date.format(now, 'hh:mm A');
    }, 1000);
  }
}
</script>

<style lang="scss">
.taskbar {
  @apply fixed flex justify-start items-center bottom-0 right-0 left-0 h-12 bg-gray-900 opacity-95;

  &__datetime {
    @apply flex flex-col justify-center items-center ml-auto text-white pr-3 text-xs;
  }
}

.start-button {
  @apply flex justify-center items-center w-16 h-full outline-none italic font-medium text-white cursor-default;

  &:hover, &:focus {
    @apply bg-gray-800 outline-none;
  }
}
</style>