export default class EraserBrush {
  constructor() {
    this.freeDrawingBrush = null;
  }
  create(canvas) {
    canvas.isDrawingMode = true;
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas); // 使用橡皮擦画笔
      this.freeDrawingBrush = canvas.freeDrawingBrush;
    }
  }
  setWidth(value) {
    this.freeDrawingBrush.width = parseInt(value, 10) || 1;
  }
  destory(canvas) {
    canvas.freeDrawingBrush = null;
    canvas.isDrawingMode = false;
    this.freeDrawingBrush = null;
  }
}
