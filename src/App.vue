<template>
  <div class="viewport">
    <router-view/>
    <img class="viewport__background" src="./assets/images/background.jpg" aria-hidden="true"
         alt="Windows 10 Background"/>
  </div>
</template>

<style lang="scss">
.viewport {
  font-family: "Segoe UI", sans-serif;
  @apply fixed top-0 right-0 bottom-0 left-0;
  user-select: none;

  &__background {
    @apply w-full h-full object-cover fixed top-0 right-0 bottom-0 left-0;
    z-index: -1;
  }
}
</style>
<script>
export default {}
</script>