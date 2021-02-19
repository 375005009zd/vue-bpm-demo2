import { is } from 'bpmn-js/lib/util/ModelUtil'
import { customShapeAction,customConfig, batchCreateCustom ,hasLabelElements} from '@/components/utils/util'

import {
  assign
} from 'min-dash'
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg'

const TASK_BORDER_RADIUS = 2

//根据util.js的自定义元素创建图形对象
function createElement() {
   return batchCreateCustom(customShapeAction,createAction)
}

//导出自定义元素图形
export default createElement()

//在画布绘制元素图形
function createAction(type, group, className, title, imageUrl,drawShapeFn,options) {

    function createListener(event, autoActivate, elementFactory, create) {
        var shape = elementFactory.createShape({ type: type });

        if (options) {
            shape.businessObject.di.isExpanded = options.isExpanded;
        }

        create.start(event, shape);
        }

        const config = {
            type,//渲染时判断
            group: group,
            className: className,
            title: title ,
            action: {
                dragstart: createListener,
                click: createListener
            }
        }

        if(imageUrl) {
           assign(config, {imageUrl})
        }

        if(drawShapeFn == 'drawShape') {
           assign(config, {drawShape})
        }

        return config
}

function drawShape(parentNode, element ,bpmnRenderer,imageUrl) {
    const shape = bpmnRenderer.drawShape(parentNode, element);
    const suitable = element.businessObject.suitable
    let color = '#52B415'
    if (suitable) {
        if (suitable > 50) {
          color = 'green'
        }
        if (suitable === 50) {
          color = 'yellow'
        }
        if (suitable < 50) {
          color = 'red'
        }
      }
	    const { type } = element
	    const { attr } = customConfig[type]
      const height = attr.height || 100
      const width = attr.width || 100
      element.width = width
      element.height = height
      const rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS, color,imageUrl);

      prependTo(rect, parentNode);

      svgRemove(shape);

      return shape;
  }


// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor,imageUrl) {
  var customIcon = svgCreate('image',{
    x: 0,
    y: 0,
    width: width,
    height: height,
    href: imageUrl
})

  svgAppend(parentNode, customIcon);

  return customIcon;
}

// copied from https://github.com/bpmn-io/diagram-js/blob/master/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}
