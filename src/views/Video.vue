<template>
  <div class="barrage">
    <div class="container">
      <barrage :area="area" ref="textViewRef"></barrage>
    </div>
    <div class="controller">
      <span>显示区域</span>
      <select v-model="area" style="margin-right: 10px">
        <option value="small">1/4</option>
        <option value="half">半屏</option>
        <option value="most">3/4</option>
        <option value="full">全屏</option>
      </select>
      <input
        type="text"
        placeholder="请输入弹幕~"
        @keypress.enter="send"
        ref="inputRef"
      />
      <button @click="send">发送</button>
    </div>
    <div>
      <input type="text" v-model="total" />条
      <button @click="add">发送</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Barrage from "@/components/Barrage/index.vue";
import { Text } from "@/components/Barrage/types";
import { getBulltes } from "@/components/Barrage/model";

let uid = 0;

export default defineComponent({
  components: { Barrage },
  data: () => ({
    area: "half",
  }),
  setup() {
    const textViewRef = ref<InstanceType<typeof Barrage>>();
    const inputRef = ref();
    const total = ref();

    const send = () => {
      const randomData: Text = {
        id: uid++,
        value: inputRef.value.value,
      };
      textViewRef.value?.add(randomData);
      inputRef.value.value = "";
      inputRef.value.focus();
    };

    const add = () => {
      textViewRef.value?.add(getBulltes(total.value));
    };

    return {
      textViewRef,
      inputRef,
      total,
      send,
      add,
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
  background-color: #000;
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
