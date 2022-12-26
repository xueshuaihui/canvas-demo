import { initCustomFormatter } from "vue";

export default class mouse {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }
  scale() {
    this.canvas.on("mouse:wheel", (opt) => {
      let delta = opt.e.deltaY; // 滚轮向上滚一下是 -100，向下滚一下是 100
      let zoom = this.canvas.getZoom(); // 获取画布当前缩放值

      // 控制缩放范围在 0.01~20 的区间内
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      // 设置画布缩放比例
      // 关键点！！！
      // 参数1：将画布的所放点设置成鼠标当前位置
      // 参数2：传入缩放值
      this.canvas.zoomToPoint(
        {
          x: opt.e.offsetX, // 鼠标x轴坐标
          y: opt.e.offsetY, // 鼠标y轴坐标
        },
        zoom // 最后要缩放的值
      );
      this.canvas.scale = zoom;
    });
  }
  translation() {
    this.canvas.on("mouse:down", (opt) => {
        if(this.canvas.isDrawingMode)return ;
      // 鼠标按下时触发
      let evt = opt.e;
      this.canvas.isDragging = true; // isDragging 是自定义的，开启移动状态
      this.canvas.lastPosX = evt.clientX; // lastPosX 是自定义的
      this.canvas.lastPosY = evt.clientY; // lastPosY 是自定义的
    });

    this.canvas.on("mouse:move", (opt) => {
      // 鼠标移动时触发
      if (this.canvas.isDragging) {
        let evt = opt.e;
        let vpt = this.canvas.viewportTransform; // 聚焦视图的转换
        vpt[4] += evt.clientX - this.canvas.lastPosX;
        vpt[5] += evt.clientY - this.canvas.lastPosY;
        this.canvas.requestRenderAll(); // 重新渲染
        this.canvas.lastPosX = evt.clientX;
        this.canvas.lastPosY = evt.clientY;
      }
    });

    this.canvas.on("mouse:up", (opt) => {
      // 鼠标松开时触发
      this.canvas.setViewportTransform(this.canvas.viewportTransform); // 设置此画布实例的视口转换
      this.canvas.isDragging = false; // 关闭移动状态
    });
  }
  init() {
    this.scale();
    this.translation();
  }
}
