export default class Brush {
  constructor() {
    this.freeDrawingBrush = null;
  }
  /**
   *新建画笔
   *
   * @param {Object} canvas 当前画布对象
   */
  create(canvas) {
    canvas.isDrawingMode = true;
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      this.freeDrawingBrush = canvas.freeDrawingBrush;
    }
  }
  /**
   *设置画笔颜色
   *
   * @param {string} value 橡皮擦颜色
   */
  setColor(value) {
    this.freeDrawingBrush.color = value;
  }
  /**
   *设置画笔宽度
   *
   * @param {number} value 橡皮擦宽度
   */
  setWidth(value) {
    this.freeDrawingBrush.width = parseInt(value, 10) || 1;
  }
  /**
   *销毁画笔
   *
   * @param {Object} canvas 当前画布对象
   */
  destory(canvas) {
    canvas.freeDrawingBrush = null;
    canvas.isDrawingMode = false;
    this.freeDrawingBrush = null;
  }
}
