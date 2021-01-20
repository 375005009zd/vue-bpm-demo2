<template>
<div class="containers"> 
  <div class="canvas" ref="canvas"></div>
  <div class="panel" ref="panel"></div>
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

import customPalette from './palette'
export default {
  name: 'HelloWorld',
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
        //建模
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          additionalModules: [customPalette]
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
