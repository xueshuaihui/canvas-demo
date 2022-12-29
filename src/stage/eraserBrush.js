export default class EraserBrush {
  constructor() {
    this.freeDrawingBrush = null;
    this.point = null
  }
  /**
   *新建橡皮擦
   *
   * @param {Object} canvas 当前画布对象
   */
  create(canvas) {
    canvas.isDrawingMode = true;
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas); // 使用橡皮擦画笔
      this.freeDrawingBrush = canvas.freeDrawingBrush;
      
      this.setAlpha(canvas)
    }
  }
  /**
   *设置橡皮擦宽度
   *
   * @param {number} value 橡皮擦宽度
   */
  setWidth(value) {
    this.freeDrawingBrush.width = parseInt(value, 10) || 1;
  }
  /**
   *
   */
  setAlpha(canvas) {
    // canvas.on("mouse:move", (opt) => {
      
    //   if ((canvas.isDrawingMode = true && this.freeDrawingBrush)) {
    //     // console.log(111, this.freeDrawingBrush);
    //     const {_points} = this.freeDrawingBrush
    //     this.point = new fabric.Point(_points)
    //     console.log(222, this.point);
    //     fabric.util.loadImage('/public/1111.png', function (img) {
    //       this.point.set(
    //         "fill",
    //         new fabric.Pattern({
    //           source: img,
    //           repeat: document.getElementById("repeat").value,
    //         })
    //       );
    //       canvas.renderAll();
    //     });
    //   }
    //   // 鼠标移动时触发
    //   if (canvas.isDragging) {
    //     let evt = opt.e;
    //     let vpt = canvas.viewportTransform; // 聚焦视图的转换
    //     vpt[4] += evt.clientX - canvas.lastPosX;
    //     vpt[5] += evt.clientY - canvas.lastPosY;
    //     canvas.requestRenderAll(); // 重新渲染
    //     canvas.lastPosX = evt.clientX;
    //     canvas.lastPosY = evt.clientY;
    //   }
    // });
  }
  /**
   *销毁橡皮擦
   *
   * @param {Object} canvas 当前画布对象
   */
  destory(canvas) {
    canvas.freeDrawingBrush = null;
    canvas.isDrawingMode = false;
    this.freeDrawingBrush = null;
  }
}
