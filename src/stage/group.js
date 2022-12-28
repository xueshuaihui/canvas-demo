export default class Group {
  constructor() {}
  /**
   *新建分组
   *
   * @param {Object} opts 组配置参数
   * @return {Object} 返回的group对象
   */
  create(canvas, opts) {
    // 判断当前有没有选中元素，如果没有就不执行任何操作
    if (!canvas.getActiveObject()) {
      return;
    }
    const activeObject = canvas.getActiveObject();
    console.log(11111, activeObject);
    const { top, left } = activeObject;
    const group = new fabric.Group(activeObject._objects, {
      top,
      left,
    });
    activeObject._objects.forEach((element) => {
      canvas.remove(element);
    });
    canvas.add(group);
    canvas.requestRenderAll();
    return group;
  }
  /**
   * 解散分组
   *
   * @param {Object} canvas 画布对象
   * @return {Object} 返回的group对象
   */
  dispersed(canvas) {
    // 判断当前有没有选中元素，如果没有就不执行任何操作
    if (!canvas.getActiveObject()) {
      return;
    }

    // 判断当前是否选中组，如果不是，就不执行任何操作， 此处需要考虑多选
    if (canvas.getActiveObject().type !== "group") {
      return;
    }

    // 先获取当前选中的对象，然后打散
    canvas.getActiveObject().toActiveSelection();
  }
}
