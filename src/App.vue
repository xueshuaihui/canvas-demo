<template>
  <div>
    <toolbar
      v-if="sta"
      :stage="sta"
      :zoom="zoom"
      @imgUpload="handleImgUpload"
      @zoomChange="handleZoomChange"
    />
    <canvas id="c"></canvas>
  </div>
</template>


<script setup>
import { ref, reactive, onMounted } from "vue";
import Stage from "./stage/index";

import toolbar from "./components/toolbar.vue";

let stage = null;
let sta = ref(null);
onMounted(() => {
  stage = new Stage("c");
  stage.mouse.clientZoom = handleZoomChange;
  sta.value = stage;
  zoom.value.val = stage.zoom;
  zoom.value.min = stage.config.zoomConfig.min;
  zoom.value.max = stage.config.zoomConfig.max;
});
// 图片上传
const handleImgUpload = (file) => {
  stage.addImg(file);
};
// zoom
let zoom = ref({
  val: 1,
  max: 2,
  min: 0.01,
});
const handleZoomChange = (val) => {
  console.log(111, val);
  if (typeof val === "number") {
    zoom.value.val = Number(val.toFixed(2));
  }
};
</script>

<style scoped>
</style>