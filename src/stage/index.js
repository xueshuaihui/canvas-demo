import { stageConfig, zoomConfig, brushConfig, eraserConfig } from "./config";
import Mouse from "./mouse";
import Brush from "./brush";
import EraserBrush from "./eraserBrush";
import stageImage from "./image";
import Group from "./group";

import _ from "lodash";

/**
 * 画布类
 * 基础功能以及子类
 *
 * @class
 */
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
    this.Brush = Brush;
    this.EraserBrush = EraserBrush;
    this.Group = Group;
  }
  /**
   * 获取画布上所有对象元素
   *
   * @param {[string]} type 类型
   * @return {[object]} 画布上的所有元素
   */
  getAllObject(type) {
    return this.canvas.getObjects(type);
  }
  /**
   * 元素设置位置相关信息
   * 新上传图片相对最后(上传顺序)一个元素右移
   * 位置计算有需要后期创新优化 @xuesh
   *
   * @param {object} obj 画布元素
   */
  setPosition(obj) {
    // 获取最后一个上传的元素的位置数据
    const AllObject = this.getAllObject();
    const length = AllObject.length;
    let left = 0,
      width = 0,
      top = 0;
    if (length) {
      const lastObj = AllObject[length - 1];
      left = lastObj.left;
      width = lastObj.width * this.zoom;
      top = lastObj.top;
    }
    // 更新位置信息
    obj.left = left + width;
    obj.top = top;
    obj.scaleX = this.zoom;
    obj.scaleY = this.zoom;
    obj.width = obj.width;
    obj.height = obj.height;
  }
  /**
   * 画布添加元素，渲染图片
   *
   * @param {object} file 待上传的file数据
   */
  addImg(file) {
    // 读取图片数据
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      const imgobj = new Image();
      imgobj.onload = () => {
        // 画布加载、渲染
        fabric.Image.fromObject(imgobj, (obj) => {
          obj.id = Math.random();
          obj.type = "image";
          this.setPosition(obj);
          this.canvas.add(obj);
        });
      };
      imgobj.src = e.target.result;
    };
  }
/**
 * 下载画布
 *
 * @param {string} type 可以下载的图片格式
 */
  outputImg(type) {
    type = type || "jpeg";
    // 通过偏移量、宽高处理全图
    const all = this.getAllObject();
    // 计算画布元素边界
    const maxleftObj = _.maxBy(all, (o) => {
      return o.left;
    });
    const minleftObj = _.minBy(all, (o) => {
      return o.left;
    });
    const maxtopObj = _.maxBy(all, (o) => {
      return o.top;
    });
    const mintopObj = _.minBy(all, (o) => {
      return o.top;
    });
    // 剪切画布， 输出画布数据base64格式
    // console.log(111, minleftObj, minleftObj.left, mintopObj, mintopObj.top);
    const baseimg = this.canvas.toDataURL({
      format: type,
      quality: 1,
      // multiplier: this.zoom,
      withoutTransform: true,
      left: minleftObj.getBoundingRect().left,
      top: mintopObj.getBoundingRect().top,
      width: (maxleftObj.left - minleftObj.left + maxleftObj.width) * this.zoom,
      height: (maxtopObj.top - mintopObj.top + mintopObj.height) * this.zoom,
    });
    this.canvas.requestRenderAll();
    // 下载功能
    let a = document.createElement("a");
    a.setAttribute("href", baseimg);
    a.setAttribute("download", `${Date.parse(new Date())}.${type}`);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "downLoad");
    a.click();
  }
  /**
   * 开启/关闭框选功能
   *
   * @param {boolean} flag 开启/关闭
   * @return {Object} 返回值描述
   */
  selectionSwitch(flag) {
    flag = flag || false;
    this.canvas.selection = flag;
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