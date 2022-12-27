export default class Brush {
  constructor() {
    this.freeDrawingBrush = null;
  }
  create(canvas) {
    canvas.isDrawingMode = true;
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      this.freeDrawingBrush = canvas.freeDrawingBrush;
    }
  }
  setColor(value) {
    this.freeDrawingBrush.color = value;
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
