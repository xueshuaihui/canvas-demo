export default class EraserBrush {
  constructor() {
    this.freeDrawingBrush = null;
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
