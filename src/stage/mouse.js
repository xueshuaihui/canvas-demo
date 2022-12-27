import { zoomConfig } from "./config";

export default class Mouse {
  constructor() {
    this.zoomConfig = zoomConfig;
  }
  zoom(canvas) {
    const { min, max } = zoomConfig;
    canvas.on("mouse:wheel", (opt) => {
      if (canvas.isDrawingMode) return;
      const { target } = opt;
      let delta = opt.e.deltaY; // 滚轮向上滚一下是 -100，向下滚一下是 100
      if (target && target.type === 'image') {
        console.log(target);
        // 获取缩放前的信息数据
        const height = target.getScaledHeight();
        const width = target.getScaledWidth();
        const zoomVal = target.getTotalObjectScaling();
        const { scaleX, scaleY } = zoomVal;
        let X = 0.9999 ** delta;
        if (X > max) X = max;
        if (X < min) X = min;
        const Y = X;
        // 设置缩放大小
        target.scaleToWidth(width * X, true);
        target.scaleToHeight(height * Y, true);
        canvas.requestRenderAll();
      } else if(!target){
        let zoom = canvas.getZoom(); // 获取画布当前缩放值

        // 控制缩放范围在 0.01~20 的区间内
        zoom *= 0.999 ** delta;
        if (zoom > max) zoom = max;
        if (zoom < min) zoom = min;
        // 设置画布缩放比例
        // 关键点！！！
        // 参数1：将画布的所放点设置成鼠标当前位置
        // 参数2：传入缩放值
        canvas.zoomToPoint(
          {
            x: opt.e.offsetX, // 鼠标x轴坐标
            y: opt.e.offsetY, // 鼠标y轴坐标
          },
          zoom // 最后要缩放的值
        );
        if (this.clientZoom) {
          this.clientZoom(zoom);
        }
      }
    });
  }
  translation(canvas) {
    canvas.on("mouse:down", (opt) => {
      if (canvas.isDrawingMode) return;
      // 鼠标按下时触发
      if (!opt.target) {
        let evt = opt.e;
        canvas.isDragging = true; // isDragging 是自定义的，开启移动状态
        canvas.lastPosX = evt.clientX; // lastPosX 是自定义的
        canvas.lastPosY = evt.clientY; // lastPosY 是自定义的
      }
    });

    canvas.on("mouse:move", (opt) => {
      // 鼠标移动时触发
      if (canvas.isDragging) {
        let evt = opt.e;
        let vpt = canvas.viewportTransform; // 聚焦视图的转换
        vpt[4] += evt.clientX - canvas.lastPosX;
        vpt[5] += evt.clientY - canvas.lastPosY;
        canvas.requestRenderAll(); // 重新渲染
        canvas.lastPosX = evt.clientX;
        canvas.lastPosY = evt.clientY;
      }
    });

    canvas.on("mouse:up", (opt) => {
      // 鼠标松开时触发
      canvas.setViewportTransform(canvas.viewportTransform); // 设置此画布实例的视口转换
      canvas.isDragging = false; // 关闭移动状态
    });
  }
  listenEvent(canvas) {}
  init(canvas) {
    this.zoom(canvas);
    this.translation(canvas);
    this.listenEvent(canvas);
  }
}
