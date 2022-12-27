import { stageConfig, zoomConfig, brushConfig, eraserConfig } from "./config";
import Mouse from "./mouse";

class Stage {
  constructor(el) {
    this.el = el;
    this.canvas = null;
    this.config = {
      stageConfig,
      zoomConfig,
      brushConfig,
      eraserConfig,
    };
    this.init();
    this.zoom = stageConfig.zoom;
    this.mouse = new Mouse();
    this.mouse.zoom(this.canvas, this);
    this.mouse.translation(this.canvas);
  }

  addImg(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      const result = e.target.result;
      const img = new Image();
      img.src = result;
      fabric.Image.fromObject(img, (obj) => {
        obj.left = 100 * this.zoom;
        obj.top = 100 * this.zoom;
        obj.scaleX = this.zoom
        obj.scaleY = this.zoom
        // obj.width =  obj.width * this.zoom
        // obj.height = obj.height * this.zoom
        
        this.canvas.add(obj);
        // obj.scale(this.zoom)
        console.log(111,obj );
        // this.canvas.renderAll()
        // 橡皮擦
        // this.canvas.isDrawingMode = true; // 进入绘画模式
        // this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas); // 使用橡皮擦画笔
        // this.canvas.freeDrawingBrush.width = 10; // 设置画笔粗细为 10
        // console.log(111, this.canvas.freeDrawingBrush);
        // this.canvas.on("erasing:start", (opt) => {
        //   console.log(222, opt);
        // });
        // this.canvas.on("erasing:interaction", (opt) => {
        //   console.log(333, opt);
        // });
        // this.canvas.on("erasing:end", (opt) => {
        //   console.log(444, opt);
        // });
        //
      });
    };
  }
//   setZoom(value) {
//     if (!value) value = this.zoom;
//     this.canvas.setZoom(value);
//     this.zoom = value;
//   }
//   getZoom() {
//     return this.zoom;
//   }
  init() {
    if (!this.el) throw "缺少el元素";
    this.canvas = new fabric.Canvas(this.el, {
      width: innerWidth,
      height: innerHeight - 60,
      ...stageConfig,
    });
  }
}

export default Stage;

// 1.无限画布
// 2.可以上传图片，每张图片可以拖拽、放缩、旋转
// 3.选择图片可以进行合并图层
// 4.提供画笔功能，可以修改画笔大小、色彩
// 5.橡皮功能，可以修改橡皮大小，橡皮粒度（0-1范围，1没有用，即rgba的alpha变成1，0全部涂抹掉，即rgba的alpha变成0，0.3把图片的alpha变成0.3)
// 6.基于鼠标位置为中心点的画布缩放
// 7.下载图片，以图片最上端、最左端、右、下为边界下载画布上的图片

// 选择图片可以进行合并图层? 多张图片合成一张？
// 下载图片？ 整个画布下载？
