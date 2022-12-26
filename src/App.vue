<template>
  <div>
    <toolbar 
    :stage="stage"
    @imgUpload="handleImgUpload"
    />
    <canvas id="c"></canvas>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";


import toolbar from "./components/toolbar.vue";
import Stage from "./stage/index";
// import stage from "./components/stage.vue";
let stage = ref(null)
const handleImgUpload = (file) => {
  if(stage){
    stage.addImg(file)
  }
}
const zoom = ref(0)
onMounted(() => {
  const stage = new Stage()
  stage.value = 
  console.log(stage.value);
});
</script>

<style scoped>
</style>