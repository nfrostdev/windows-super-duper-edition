<template>
  <window title="Error!" :has-actions="true" :is-randomly-positioned="isRandomlyPositioned" :has-size-controls="false">
    <div class="error-message__icon">
      <font-awesome-icon icon="times"/>
    </div>
    <div>
      <p class="error-message__text">{{ content }}</p>
      <p class="error-message__restart">
        Please restart your computer and report this issue to Microsoft immediately!
      </p>
    </div>
  </window>
</template>

<script>
import Window from "@/components/Windows/Window";

export default {
  components: {Window},
  props: {
    content: String,
    isRandomlyPositioned: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.error-message {
  &__icon {
    @apply text-2xl flex justify-center items-center bg-red-500 border border-red-700 text-white rounded-full w-10 h-10 mr-3 flex-shrink-0;
  }

  &__text {
  }

  &__restart {
    @apply mt-2;
  }
}
</style>