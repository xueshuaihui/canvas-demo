export default class Brush {
  constructor() {
    this.freeDrawingBrush = null
  }
  create(canvas) {
    canvas.isDrawingMode = true;
    if (!canvas.freeDrawingBrush && canvas.isDrawingMode) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      this.freeDrawingBrush = canvas.freeDrawingBrush
    }
  }
  setColor(value) {
    this.freeDrawingBrush.color = value
  }
  setWidth(value) {
    this.freeDrawingBrush.width = parseInt(value, 10) || 1;
  }
  destoryBrush(canvas){
    canvas.isDrawingMode = false
    this.freeDrawingBrush = null
  }
}
