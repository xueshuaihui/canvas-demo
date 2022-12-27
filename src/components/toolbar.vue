<template>
  <div class="toolbar">
    <div class="toolbar-item">
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        multiple
        :limit="100"
        :before-upload="handleUpload"
        :show-file-list="false"
      >
        <el-button type="primary">本地上传</el-button>
      </el-upload>
    </div>
    <div class="toolbar-item">
      <el-tooltip
        :content="`画布缩放:${zoomVal}%`"
        placement="bottom"
        effect="light"
      >
        <input
          type="range"
          :min="zoom.min * 100"
          :max="zoom.max * 100"
          v-model="zoomVal"
        />
      </el-tooltip>
    </div>
    <div class="toolbar-item">
      <el-icon
        style="margin-right: 10px"
        @click="handleBrush"
        :color="brush.active ? '#409EFC' : ''"
        ><EditPen
      /></el-icon>
      <el-tooltip
        :content="`画笔大小:${brush.width}`"
        placement="bottom"
        effect="light"
      >
        <input type="range" min="1" max="100" v-model="brush.width" />
      </el-tooltip>

      <el-color-picker v-model="brush.color" show-alpha />
    </div>
    <div class="toolbar-item">
      <el-icon
        style="margin-right: 10px"
        @click="handleEraser"
        :color="eraser.active ? '#409EFC' : ''"
        ><Notification
      /></el-icon>
      <el-tooltip
        :content="`橡皮大小:${eraser.width}`"
        placement="bottom"
        effect="light"
      >
        <input type="range" min="1" max="100" v-model="eraser.width" />
      </el-tooltip>
      <el-tooltip
        :content="`橡皮粒度:${eraser.deep}`"
        placement="bottom"
        effect="light"
      >
        <input
          type="range"
          min="0"
          max="1.0"
          step="0.01"
          v-model="eraser.deep"
        />
      </el-tooltip>
    </div>
    <div class="toolbar-item">
      <el-button type="primary">图层合并</el-button>
      <el-button type="primary">图层分解</el-button>
    </div>
    <div class="toolbar-item">
      <el-button type="primary">下载</el-button>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  defineEmits,
  defineProps,
  watchEffect,
  watch,
} from "vue";
const emit = defineEmits([
  "imgUpload",
  "zoomChange",
  "createBrush",
  "destoryBrush",
  "updateBrush",
  "createEraserBrush",
  "updateEraserBrush",
  "destoryEraserBrush",
]);
const props = defineProps({
  stage: Object,
  zoom: {
    type: Object,
    default: {
      val: 1,
      min: 0.01,
      max: 20,
    },
  },
});
// 图片上传
const fileList = ref([]);
const handleUpload = (rawFile) => {
  emit("imgUpload", rawFile);
  return false;
};
// 缩放
// let zoomVal = ref(props.zoom.val * 100);
const zoomVal = computed({
  get() {
    return props.zoom.val * 100;
  },
  set(val) {
    emit("zoomChange", Number(val) / 100);
    // stage.canvas.setZoom(Number(val) / 100); // 左上角为中心点
    props.stage.canvas.zoomToPoint(
      {
        x: innerWidth / 2,
        y: innerHeight / 2,
      },
      Number(val) / 100
    ); // 画布中心为中心点
  },
});

// 画笔
const brush = ref({
  active: false,
  width: 75,
  color: "rgba(255, 69, 0, 0.68)",
});
const handleBrush = () => {
  eraser.value.active = false;
  brush.value.active = !brush.value.active;
  if (brush.value.active) {
    emit("createBrush");
    emit("updateBrush", {
      color: brush.value.color,
      width: parseInt(brush.value.width, 10) || 1,
    });
  } else {
    destoryBrush();
  }
};
const destoryBrush = () => {
  brush.value.active = false;
  emit("destoryBrush");
};
watchEffect(() => {
  emit("updateBrush", {
    color: brush.value.color,
    width: parseInt(brush.value.width, 10) || 1,
  });
});
// 橡皮擦
const eraser = ref({
  active: false,
  width: 5,
  deep: 1,
});
const handleEraser = () => {
  destoryBrush();
  eraser.value.active = !eraser.value.active;
  if (eraser.value.active) {
    emit("createEraserBrush");
    emit("updateEraserBrush", {
      deep: eraser.value.deep,
      width: parseInt(eraser.value.width, 10) || 1,
    });
  } else {
    emit("destoryEraserBrush");
  }
};
watchEffect(() => {
  emit("updateEraserBrush", {
    deep: eraser.value.deep,
    width: parseInt(eraser.value.width, 10) || 1,
  });
});
</script>

<style scoped>
.toolbar {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}
.toolbar-item {
  padding: 0 8px;
  border-right: 1px solid #eee;
  /* flex: 1; */
  /* display: flex; */
}
</style>