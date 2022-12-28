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
      <el-button
        type="primary"
        @click="
          selectionFlag = !selectionFlag;
          emit('selectionSwitch', selectionFlag);
        "
        >{{ selectionFlag ? "关闭" : "开启" }}框选</el-button
      >
    </div>
    <div class="toolbar-item">
      <el-button type="primary" @click="emit('createGroup')">图层合并</el-button>
      <el-button type="primary" @click="emit('dispersedGroup')">图层分解</el-button>
    </div>
    <div class="toolbar-item">
      <el-button type="primary" @click="emit('download')">下载</el-button>
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
  "selectionSwitch",
  "createGroup",
  "dispersedGroup",
  "download",
]);
const props = defineProps({
  zoom: {
    type: Object,
    default: {
      val: 1,
      min: 0.01,
      max: 20,
    },
  },
});
/**
 * 本地上传的数据
 *
 * @const
 * @type {ref}
 */
const fileList = ref([]);
/**
 * 上传时触发回调
 *
 * @param {Object} rawFile file对象的上传数据
 * @return {boolean} 是否终止后续操作
 */
const handleUpload = (rawFile) => {
  emit("imgUpload", rawFile);
  return false;
};
/**
 * 缩放比例
 *
 * @const
 * @type {computed}
 */
// let zoomVal = ref(props.zoom.val * 100);
const zoomVal = computed({
  get() {
    return props.zoom.val * 100;
  },
  set(val) {
    emit("zoomChange", Number(val) / 100);
  },
});

/**
 * 画笔基础数据
 *
 * @const
 * @type {ref}
 */
const brush = ref({
  active: false,
  width: 75,
  color: "rgba(255, 69, 0, 0.68)",
});
/**
 * 点击工具栏画笔icon触发
 */
const handleBrush = () => {
  eraser.value.active = false;
  brush.value.active = !brush.value.active;
  if (brush.value.active) {
    // 创建、更新画笔数据
    emit("createBrush");
    emit("updateBrush", {
      color: brush.value.color,
      width: parseInt(brush.value.width, 10) || 1,
    });
  } else {
    // 销毁画笔
    destoryBrush();
  }
};
/**
 * 销毁画笔统一方法
 */
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
/**
 * 橡皮擦基础数据
 *
 * @const
 * @type {ref}
 */
const eraser = ref({
  active: false,
  width: 5,
  deep: 1,
});
/**
 * 点击工具栏橡皮擦icon触发
 */
const handleEraser = () => {
  destoryBrush();
  eraser.value.active = !eraser.value.active;
  if (eraser.value.active) {
    // 创建、更新
    emit("createEraserBrush");
    emit("updateEraserBrush", {
      deep: eraser.value.deep,
      width: parseInt(eraser.value.width, 10) || 1,
    });
  } else {
    // 销毁
    emit("destoryEraserBrush");
  }
};
watchEffect(() => {
  emit("updateEraserBrush", {
    deep: eraser.value.deep,
    width: parseInt(eraser.value.width, 10) || 1,
  });
});
/**
 * 框选能力是否启用
 *
 * @const
 * @type {ref}
 */
const selectionFlag = ref(false);
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