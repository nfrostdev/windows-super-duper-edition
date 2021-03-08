<template>
  <div class="home">
    <taskbar/>
  </div>
</template>

<script>
import Vue from 'vue'
import Taskbar from "@/components/Taskbar/Taskbar";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  components: {Taskbar},
  data() {
    return {
      errorMessageInterval: null
    }
  },
  methods: {
    spawnErrorMessage() {
      // Spawn an error message 25% of the time.
      if (Math.random() < 0.25) {
        const errorMessage = Vue.extend(ErrorMessage);
        const instance = new errorMessage({
          propsData: {
            content: 'This is an error message! Close me!'
          }
        });
        instance.$mount();
        this.$el.appendChild(instance.$el);
      }
    }
  },
  mounted() {
    this.errorMessageInterval = setInterval(this.spawnErrorMessage, 5000)
  }
}
</script>
