<template>
  <div class="window">
    <router-view/>
    <img class="window__background" src="./assets/images/background.jpg" aria-hidden="true"/>
  </div>
</template>

<style lang="scss">
* {
  @apply z-10;
}

.window {
  font-family: "Segoe UI", sans-serif;
  @apply fixed top-0 right-0 bottom-0 left-0;

  &__background {
    @apply w-full h-full object-cover z-0 fixed top-0 right-0 bottom-0 left-0;
  }
}
</style>
