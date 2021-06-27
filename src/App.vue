<template>
  <div id="nav">
    <video-player />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VideoPlayer from "@/views/Video.vue";

export default defineComponent({
  components: { VideoPlayer },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #eaeaea;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
