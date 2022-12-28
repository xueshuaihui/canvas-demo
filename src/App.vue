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
      @download="handleDownload"
      @selectionSwitch="selectionSwitch"
      @createGroup="handleCreateGroup"
      @dispersedGroup="handleDispersedGroup"
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
/**
 * 图片上传回调
 *
 * @param {Object} file file对象的上传数据
 */
const handleImgUpload = (file) => {
  stage.addImg(file);
};
/**
 * 缩放变量
 *
 * @const
 * @type {ref}
 */
let zoom = ref({
  val: 1,
  max: 2,
  min: 0.01,
});
/**
 * 缩放触发的回掉，同步缩放比例
 *
 * @param {Number} val 缩放比例
 */
const handleZoomChange = (val) => {
  if (typeof val === "number") {
    zoom.value.val = Number(val.toFixed(2));
    // stage.canvas.setZoom(Number(val) / 100); // 左上角为中心点
    stage.canvas.zoomToPoint(
      {
        x: innerWidth / 2,
        y: innerHeight / 2,
      },
      zoom.value.val
    ); // 画布中心为中心点
    stage.zoom = zoom.value.val
  }
};
/**
 * 画笔对象
 *
 * @const
 * @type {Object}
 */
let brush = null;
/**
 * 创建画笔
 */
const handleCreateBrush = () => {
  brush = new stage.Brush();
  brush.create(stage.canvas);
};
/**
 * 销毁画笔
 */
const handleDestoryBrush = () => {
  brush?.destory(stage.canvas);
};
/**
 * 更新画笔数据
 *
 * @param {Object} datas 待更新画笔数据
 * @param {Number} datas.width 待更新画笔宽度
 * @param {String} datas.color 待更新画笔颜色
 */
const handleUpdateBrush = (datas) => {
  const { color, width } = datas;
  brush?.setColor(color);
  brush?.setWidth(width);
};
/**
 * 橡皮擦对象
 *
 * @const
 * @type {Object}
 */
let eraserBrush = null;
/**
 * 创建橡皮擦
 */
const handleCreateEraserBrush = () => {
  eraserBrush = new stage.EraserBrush();
  eraserBrush.create(stage.canvas);
};
/**
 * 销毁橡皮擦
 */
const handleDestoryEraserBrush = () => {
  eraserBrush?.destory(stage.canvas);
};
/**
 * 更新橡皮擦数据
 *
 * @param {Object} datas 待更新橡皮擦数据
 * @param {Number} datas.width 待更新橡皮擦宽度
 * @param {Number} datas.deep 待更新橡皮擦粒度
 */
const handleUpdateEraserBrush = (datas) => {
  const { width, deep } = datas;
  eraserBrush?.setWidth(width);
};
/**
 * 开启/关闭框选功能
 *
 * @param {boolean} flag true/false
 */
const selectionSwitch = (flag) => {
  stage.selectionSwitch(flag);
};
// 合并图层
let groupObj = null;
/**
 * 合并框选元素
 */
const handleCreateGroup = () => {
  groupObj = new stage.Group();
  groupObj.create(stage.canvas);
};
/**
 * 解散合并图层
 */
const handleDispersedGroup = () => {
  groupObj?.dispersed(stage.canvas);
};
/**
 * 解散合并图层
 */
const handleDownload = () => {
  stage.outputImg();
};
</script>

<style scoped>
</style>