<template>
  <div class="home">
    <taskbar/>
  </div>
</template>

<script>
import Taskbar from "@/components/Taskbar/Taskbar"

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
        const message = messageStart + paths[Math.floor(Math.random() * paths.length)] + messageEnd
        this.$store.dispatch('spawnErrorMessage', {content: message, isRandomlyPositioned: true})
      }
    }
  },
  mounted() {
    this.errorMessageInterval = setInterval(this.spawnErrorMessage, 30000)
  }
}
</script>
