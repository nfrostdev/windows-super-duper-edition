<template>
  <div class="home">
    <taskbar/>
    <window title="This is an example window.">
      <div>This is example content.</div>
    </window>

    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
    <error-message content="Test" />
  </div>
</template>

<script>
import Vue from 'vue'
import Taskbar from "@/components/Taskbar/Taskbar";
import ErrorMessage from "@/components/ErrorMessage";
import Window from "@/components/Windows/Window";

export default {
  components: {ErrorMessage, Window, Taskbar},
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
        const messageStart = 'Error detected in ';
        const paths = [
          'C:/Windows/Performance/WinSAT/DataStore/2019-02-05 17.25.34.606.winsat.etl',
          'C:/Windows/Performance/WinSAT/DataStore/2019-02-05 17.25.37.806 Cpu.Assessment (Initial).WinSAT',
          'C:/Windows/Performance/WinSAT/DataStore/2019-02-05 17.25.37.806 Disk.Assessment (Initial).WinSAT',
          'C:/Windows/Performance/WinSAT/DataStore/2019-02-05 17.25.37.806 DWM.Assessment (Initial).WinSAT',
          'C:/Windows/Performance/WinSAT/DataStore/2019-02-05 17.25.37.806 Graphics3D.Assessment (Initial).WinSAT',
          'C:/Windows/Performance/WinSAT/DataStore/2019-02-05 17.25.37.806 Mem.Assessment (Initial).WinSAT',
          'C:/Windows/Performance/WinSAT/DataStore/2019-02-05 17.27.16.605 Formal.Assessment (Initial).WinSAT',
          'C:/Windows/System32/Boot/winload.efi',
          'C:/Windows/System32/Boot/winload.exe',
          'C:/Windows/System32/Boot/winresume.efi',
          'C:/Windows/System32/Boot/winresume.exe',
          'C:/Windows/System32/Boot/en-US/winload.efi.mui',
          'C:/Windows/System32/Boot/en-US/winload.exe.mui',
          'C:/Windows/System32/Boot/en-US/winresume.efi.mui',
          'C:/Windows/System32/Boot/en-US/winresume.exe.mui',
        ];
        const messageEnd = ".";
        const instance = new errorMessage({
          propsData: {
            content: messageStart + paths[Math.floor(Math.random() * paths.length)] + messageEnd
          }
        });
        instance.$mount();
        this.$el.appendChild(instance.$el);
      }
    }
  },
  mounted() {
    this.errorMessageInterval = setInterval(this.spawnErrorMessage, 30000)
  }
}
</script>
