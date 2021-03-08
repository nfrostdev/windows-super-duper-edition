<template>
  <button class="windows-button">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="scss">
.windows-button {
  @apply flex justify-center items-center leading-none w-16 h-6 bg-gray-100 text-xs border border-gray-400 cursor-default outline-none text-center;

  &:hover, &:focus {
    @apply outline-none border-2 border-blue-500;
  }
}
</style>