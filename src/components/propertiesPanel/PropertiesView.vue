<template>
  <div class="custom-properties-panel">
    <div class="empty" v-if="selectedElements.length <= 0">请选择一个元素</div>
    <div class="empty" v-else-if="selectedElements.length > 1">只能选择一个元素</div>
    <div v-else>
      <startView v-if="element.type=='bpmn:StartEvent'" :modeler="modeler" :element="element"></startView>
      <taskView v-else-if="element.type=='bpmn:Task'" :modeler="modeler" :element="element"></taskView>
    </div>
    <button @click="printXML">打印xml</button>
    <button @click="createDynamicElement">动态创建task</button>
    <button style="margin-top:10px" @click="drawDynamicElement">在画布动态生成task</button>
  </div>
</template>

<script>
import startView from '@/components/propertiesPanel/parts/startView.vue'
import taskView from '@/components/propertiesPanel/parts/taskView.vue'

export default {
  name: 'PropertiesView',
  components: {startView,taskView},
  props: {
    modeler: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedElements: [], //选择的当前元素集合
      element: null, //当前点击的元素
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { modeler } = this
      modeler.on('selection.changed', e => {
        this.selectedElements = e.newSelection
        this.element = e.newSelection[0]
      })
      modeler.on('element.changed', e => {
        const { element } = e
        const { element: currentElement } = this
        if (!currentElement) {
          return
        }
        // update panel, if currently selected element changed
        if (element.id === currentElement.id) {
          this.element = element
        }
      })
    },
    //打印xml
    printXML() {
       const { modeler } = this
      modeler.saveXML({ format: true }, function (err, xml) {
           console.log(xml)
       });
       //流程图json数据
       let definitions = modeler.get('canvas').getRootElement().businessObject.$parent;
       console.log(definitions);
    },
    //动态创建元素
    createDynamicElement() {
      if(!this.element) {
        return
      }
      //在某个选中元素后面添加一个元素
      let elementFactory = this.modeler.get('elementFactory')
      let create = this.modeler.get('create')
      var shape = elementFactory.createShape(Object.assign({ type: 'bpmn:EndEvent' }));
      create.start(event, shape, {
        source: this.element
      });
    },
    //动态在画布绘制元素
    drawDynamicElement() {
      if(!this.element) {
        return
      }
      let elementFactory = this.modeler.get('elementFactory')
      let injector = this.modeler.get('injector')
      let autoPlace = injector.get('autoPlace', false);
      var shape = elementFactory.createShape(Object.assign({ type: 'bpmn:EndEvent' }));

      autoPlace.append(this.element, shape);
    }
  }
}
</script>

<style scoped>
.custom-properties-panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  background-color: #fff;
  border-color: rgba(0, 0, 0, 0.09);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  padding: 20px;
}
.empty {
  height: 200px;
  line-height: 200px;
  font-weight: 700;
}
.element-item {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid;
  border-color: darkorange;
  border-radius: 8px;
}
.element-item:first-child {
  margin-top: 0;
}
.custom-properties-panel input,
.custom-properties-panel textarea {
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  outline: none;
}
.custom-properties-panel input:focus,
.custom-properties-panel button:focus,
.custom-properties-panel textarea:focus,
.custom-properties-panel [contenteditable]:focus {
  border-color: rgb(239, 112, 96);
  box-shadow: 0 0 1px 2px rgb(239, 112, 96, 0.2);
}
.custom-properties-panel label {
  font-weight: bold;
}

.custom-properties-panel label:after {
  content: ': ';
}

.custom-properties-panel button + button {
  margin-left: 10px;
}
</style>
