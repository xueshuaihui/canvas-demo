<template>
  <div>
    <toolbar
      v-if="sta"
      :stage="sta"
      :zoom="zoom"
      @imgUpload="handleImgUpload"
      @zoomChange="handleZoomChange"
      @createBrush="handleCreateBrush"
      @destoryBrush="handleDestoryBrush"
      @updateBrush="handleUpdateBrush"
      @createEraserBrush="handleCreateEraserBrush"
      @destoryEraserBrush="handleDestoryEraserBrush"
      @updateEraserBrush="handleUpdateEraserBrush"
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
  if (typeof val === "number") {
    zoom.value.val = Number(val.toFixed(2));
  }
};
// brush
let brush = null;
const handleCreateBrush = () => {
  brush = new stage.Brush();
  brush.create(stage.canvas);
};
const handleDestoryBrush = () => {
  brush?.destory(stage.canvas);
};
const handleUpdateBrush = (datas) => {
  const {color, width} = datas
  console.log(1111, color);
  brush?.setColor(color);
  brush?.setWidth(width);
}
// EraserBrush
let eraserBrush = null
const handleCreateEraserBrush = () => {
  eraserBrush = new stage.EraserBrush();
  eraserBrush.create(stage.canvas)
}
const handleDestoryEraserBrush = () => {
  eraserBrush?.destory(stage.canvas)
}
const handleUpdateEraserBrush = (datas) => {
  const {width, deep} = datas
  eraserBrush?.setWidth(width)
}
</script>

<style scoped>
</style>