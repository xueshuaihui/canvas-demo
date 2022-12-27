import { stageConfig, zoomConfig, brushConfig, eraserConfig } from "./config";
import Mouse from "./mouse";
import Brush from "./brush";
import EraserBrush from "./eraserBrush";
import stageImage from "./image";
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
    this.Image = stageImage;
    this.zoom = stageConfig.zoom;
    this.mouse = new Mouse();
    this.mouse.init(this.canvas);
    this.Brush = Brush
    this.EraserBrush = EraserBrush
  }
  getAllObject(type) {
    return this.canvas.getObjects(type);
  }
  setPosition(obj) {
    /**
     * 设置位置相关信息
     * 新上传图片相对最后一个元素右移
     */
    const AllObject = this.getAllObject();
    const length = AllObject.length;
    let left = 0,
      width = 0,
      top = 0;
    if (length) {
      const lastObj = AllObject[length - 1];
      console.log(lastObj);
      left = lastObj.left;
      width = lastObj.width * this.zoom ;
      top = lastObj.top;
    }
    obj.left = (left + width) ;
    obj.top = top ;
    obj.scaleX = this.zoom;
    obj.scaleY = this.zoom;
    obj.width = obj.width;
    obj.height = obj.height;
  }
  addImg(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      const imgobj = new Image();
      imgobj.onload = () => {
        fabric.Image.fromObject(imgobj, (obj) => {
          obj.id = Math.random();
          obj.type = 'image';
          this.setPosition(obj);
          this.canvas.add(obj);
        });
      };
      imgobj.src = e.target.result;
    };
  }
  aaa() {
    fabric.Image.fromObject(img, (obj) => {
      obj.id = Math.random();
      obj.left = 100 * this.zoom;
      obj.top = 100 * this.zoom;
      obj.scaleX = this.zoom;
      obj.scaleY = this.zoom;
      obj.x = 0;
      obj.y = 0;
      // obj.width =  obj.width * this.zoom
      // obj.height = obj.height * this.zoom
      console.log(111, obj);
      this.canvas.add(obj);

      // this.canvas.renderAll()
    });
  }
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


// 3.选择图片可以进行合并图层
// 5.橡皮功能，可以修改橡皮大小，橡皮粒度（0-1范围，1没有用，即rgba的alpha变成1，0全部涂抹掉，即rgba的alpha变成0，0.3把图片的alpha变成0.3)
// 7.下载图片，以图片最上端、最左端、右、下为边界下载画布上的图片

/**
 * 完成：
 * 2.可以上传图片，每张图片可以拖拽、放缩、旋转
 * 4.提供画笔功能，可以修改画笔大小、色彩
 * 1.无限画布
 * 6.基于鼠标位置为中心点的画布缩放
 */
