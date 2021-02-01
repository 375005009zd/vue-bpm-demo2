import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import { find } from 'min-dash'

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

import {
  getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';


const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2;


export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer,paletteEntries) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
    this.paletteEntries = paletteEntries
  }

  canRender(element) {

    // only render tasks and events (ignore labels)
    return isAny(element, [ 'bpmn:Task', 'bpmn:Event' ]) && !element.labelTarget;
  }

  drawShape(parentNode, element) {
    // const shape = this.bpmnRenderer.drawShape(parentNode, element);

    // if (is(element, 'bpmn:Task')) {
    //   const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS, '#52B415');

    //   prependTo(rect, parentNode);

    //   svgRemove(shape);

    //   return shape;
    // }

    // const rect = drawRect(parentNode, 30, 20, TASK_BORDER_RADIUS, '#cc0000');

    // svgAttr(rect, {
    //   transform: 'translate(-20, -10)'
    // });

    // return shape;
    const paletteEntries = this.paletteEntries
    //通过type找到对应的配置
    const shape = find(paletteEntries,(entry)=>{
        return is(element, entry.type)
    })
    //如果传入自定义方法，则回调该方法
    if(shape && shape.drawShape instanceof Function) {
      console.log(element)
        return shape.drawShape(parentNode,element,this.bpmnRenderer,shape.imageUrl)
    }
    //否则调用默认渲染的方法
    return this.bpmnRenderer.drawShape(parentNode,element)

  }

  getShapePath(shape) {
    if (is(shape, 'bpmn:Task')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer','config.paletteEntries' ];

// helpers //////////
