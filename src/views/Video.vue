<template>
  <div class="barrage">
    <div class="container">
      <barrage :rows="textRows" ref="textViewRef"></barrage>
    </div>
    <div class="controller">
      <span>轨道数量</span>
      <select v-model="textRows">
        <option :value="2">2</option>
        <option :value="4">4</option>
        <option :value="6">6</option>
      </select>
      <input
        type="text"
        placeholder="请输入弹幕~"
        @keypress.enter="send"
        ref="inputRef"
      />
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Barrage from "@/components/Barrage/index.vue";

let uid = 0;

export default defineComponent({
  components: { Barrage },
  data: () => ({
    textRows: 2,
  }),
  setup() {
    const textViewRef = ref<InstanceType<typeof Barrage>>();
    const inputRef = ref();

    const send = () => {
      const randomData = {
        id: uid++,
        value: inputRef.value.value,
      };
      textViewRef.value?.add(randomData);
      inputRef.value.value = "";
      inputRef.value.focus();
    };

    return {
      textViewRef,
      inputRef,
      send,
    };
  },
});
</script>

<style lang="scss" scoped>
.barrage {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  width: 500px;
  height: 300px;
  background-color: gray;
  position: relative;
}
.controller {
  margin-top: 20px;

  input {
    width: 200px;
    height: 30px;
    padding-left: 8px;
  }

  button {
    width: 60px;
    height: 30px;
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>
