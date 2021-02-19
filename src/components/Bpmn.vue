<template>
<div class="containers">
  <div class="canvas" ref="canvas"></div>
  <properties-view v-if="bpmnModeler" :modeler="bpmnModeler"></properties-view>
</div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { xmlStr } from '../xmlStr'

// 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

import customPalette from './palette'
//配置工具栏
import paletteEntries from './palette/config/paletteEntries'
//画布渲染
import customRenderer from './renderer'
//绘制自定义元素
import customContextPad from './contextPad'
//右侧自定义属性栏
// // 原有的 properties-panel 这个框
import propertiesPanelModule from 'bpmn-js-properties-panel'

import PropertiesView from './custom-properties-panel/PropertiesView'

export default {
  name: 'HelloWorld',
  components: {
    PropertiesView
  },
  data () {
    return {
     // bpmn建模器
      bpmnModeler: null
    }
  },
    mounted() {
        // 获取到属性ref为“canvas”的dom节点
        const canvas = this.$refs.canvas
        const panelContainer = this.$refs.panel
        //去掉默认工具栏
        const modules = BpmnModeler.prototype._modules
        const index = modules.findIndex(it=>it.paletteProvider)
        modules.splice(index,1)
        //建模
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加控制板
          propertiesPanel: {
                parent: panelContainer
          },
          paletteEntries,
          additionalModules: [
            customPalette,
            customRenderer,
            customContextPad
          ]
        });
        this.createNewDiagram()
  },
  methods: {
    createNewDiagram () {
			// 将字符串转换成图显示出来
			this.bpmnModeler.importXML(xmlStr)
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.containers{
	background-color: #ffffff;
	width: 100%;
	height: calc(100vh - 0px);
}
.canvas{
	width: 100%;
	height: 100%;
}
.panel{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 260px;
    z-index: 10;
    border-left: 1px solid #ccc;
    overflow: auto;
}
</style>
