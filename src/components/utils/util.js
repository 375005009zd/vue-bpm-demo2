// 一开始就有label标签的元素类型
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent']

//自定义元素的配置
const customConfig = {
  'bpmn:StartEvent': {
      'field': 'start',
      'title': '开始节点',
      'attr': { x: 0, y: 0, width: 40, height: 40 }
  },
  'bpmn:EndEvent': {
      'field': 'end',
      'title': '结束节点',
      'attr': { x: 0, y: 0, width: 40, height: 40 }
  },
  'bpmn:Task': {
      'field': 'task',
      'title': '普通任务',
      'attr': { x: 0, y: 0, width: 48, height: 48 }
  }

}

//自定义元素的样式
const customShapeAction = [
  {
    type: 'create.start-event',
    action: ['bpmn:StartEvent','event','bpmn-icon-custom','Create StartEvent', require('./img/start.png'),'drawShape']
  },
  {
    type: 'create.end-event',
    action: ['bpmn:EndEvent','event','bpmn-icon-custom','Create EndEvent', require('./img/end.png'),'drawShape']
  },
  {
    type: 'create.task',
    action: ['bpmn:Task','event','bpmn-icon-custom','Create Task', require('./img/rules.png'),'drawShape']
  }
]

    /**
     * 循环创建出一系列的元素
     * @param {Array} actions 元素集合
     * @param {Object} fn 处理的函数
     */
export function batchCreateCustom(actions, fn) {
    const customs = {}
    actions.forEach(item => {
        customs[item['type']] = fn(...item['action'])
    })
    return customs
}

export {customConfig,customShapeAction,hasLabelElements}
