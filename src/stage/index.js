import { stageConfig, zoomConfig, brushConfig, eraserConfig } from "./config";
import Mouse from "./mouse";

class Stage {
  constructor() {
    this.canvas = null;
    this.config = {
      stageConfig,
      zoomConfig,
      brushConfig,
      eraserConfig,
    };
    this.init();
  }

  addImg(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      const result = e.target.result;
      const img = new Image();
      img.src = result;
      //   img.onload = () => {
      // fabric.Image.fromObject(img, (obj)=>{
      //     this.canvas.add(obj)
      // })
      //   };
      fabric.Image.fromObject(img, (obj) => {
        obj.left = 100;
        obj.top = 100;
        console.log(0, obj);
        this.canvas.add(obj);
        // 橡皮擦
        this.canvas.isDrawingMode = true; // 进入绘画模式
        this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas); // 使用橡皮擦画笔
        this.canvas.freeDrawingBrush.width = 10; // 设置画笔粗细为 10
        console.log(111, this.canvas.freeDrawingBrush);
        this.canvas.on("erasing:start", (opt) => {
          console.log(222, opt);
        });
        this.canvas.on("erasing:interaction", (opt) => {
          console.log(333, opt);
        });
        this.canvas.on("erasing:end", (opt) => {
          console.log(444, opt);
        });
        //
      });
    };
  }
  testObj() {
    const rect = new fabric.Rect({
      top: 100, // 距离容器顶部 100px
      left: -50, // 距离容器左侧 100px
      fill: "orange", // 填充 橙色
      width: 100, // 宽度 100px
      height: 100, // 高度 100px
    });
    // 将矩形添加到画布中
    this.canvas.add(rect);
  }
  init() {
    this.canvas = new fabric.Canvas("c", {
      width: innerWidth,
      height: innerHeight - 60,
      ...stageConfig,
    });
    this.testObj();
    this.mouse = new Mouse(this);
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
