<template>
  <div class="taskbar">
    <button class="start-button">
      <windows-logo/>
    </button>
  </div>
</template>

<style lang="scss">
.taskbar {
  @apply fixed bottom-0 right-0 left-0 h-12 bg-gray-900 opacity-95;
}

.start-button {
  @apply flex justify-center items-center w-16 h-full outline-none italic font-medium text-white cursor-default;

  &:hover, &:focus {
    @apply bg-gray-800 outline-none;
  }
}
</style>
<script>
import WindowsLogo from "@/components/WindowsLogo";
export default {
  components: {WindowsLogo}
}
</script>