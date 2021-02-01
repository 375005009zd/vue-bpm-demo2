import { is } from 'bpmn-js/lib/util/ModelUtil'
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
export default {
   'create.start-event': createAction(
       'bpmn:StartEvent',
       'event',
       'bpmn-icon-custom',
       'Create StartEvent',
       require('./img/task.png'),
       drawShape
   ),
   'create.task': createAction(
       'bpmn:Task',
       'activity',
       'bpmn-icon-custom',
       'Create Task',
       require('./img/task2.png'),
       drawShape
   )
}

function createAction(type, group, className, title, imageUrl,drawShape,options) {

    function createListener(event, autoActivate, elementFactory, create) {
        var shape = elementFactory.createShape({ type: type });

        if (options) {
            shape.businessObject.di.isExpanded = options.isExpanded;
        }

        create.start(event, shape);
        }

        //var shortType = type.replace(/^bpmn:/, '');
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

        if(drawShape) {
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

    if (is(element, 'bpmn:Task') || is(element, 'bpmn:StartEvent')) {
      const height = 80
      const width = 100
      element.width = width
      element.height = height
      const rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS, color,imageUrl);
 
      prependTo(rect, parentNode);

      svgRemove(shape);

      return shape;
    }

    const rect = drawRect(parentNode, 30, 20, TASK_BORDER_RADIUS, color);

    svgAttr(rect, {
      transform: 'translate(-20, -10)'
    });

    return shape;
  }

  
// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor,imageUrl) {
 // const rect = svgCreate('rect');

  // svgAttr(rect, {
  //   width: width,
  //   height: height,
  //   rx: borderRadius,
  //   ry: borderRadius,
  //   stroke: strokeColor || '#000',
  //   strokeWidth: 2,
  //   fill: '#fff'
  // });
  var rect = svgCreate('image',{
    x: 0,
    y: 0,
    width: width,
    height: height,
    href: imageUrl
})

  svgAppend(parentNode, rect);

  return rect;
}

// copied from https://github.com/bpmn-io/diagram-js/blob/master/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}