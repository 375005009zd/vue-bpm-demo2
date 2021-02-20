<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="常规" name="first">常规</el-tab-pane>
        <el-tab-pane label="属性" name="second">
          <el-form ref="ruleForm" :model="ruleForm" label-width="150px">
               <el-form-item label="服务URL">
                 <el-input v-model="ruleForm.name" @change="event => changeField(event, 'name')"></el-input>
               </el-form-item>
               <el-form-item label="请求方式">
                 <el-input v-model="ruleForm.method" @change="event => changeField(event, 'method')"></el-input>
               </el-form-item>
              <el-form-item label="请求编码方式">
                <el-input v-model="ruleForm.encodeMethod" @change="event => changeField(event, 'encodeMethod')"></el-input>
              </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="身份认证" name="third">身份认证</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'startView',
    props: ['element','modeler'],
    data() {
      return {
         activeName: 'second',
         ruleForm:this.element.businessObject
      }
    },
    methods: {
      //切换tab
       handleClick(tab, event) {
        console.log(tab, event);
      },
      /**
       * 改变控件触发的事件
       * @param { Object } input的Event
       * @param { String } 要修改的属性的名称
       */
      changeField(event, type) {
        const value = event
        let properties = {}
        properties[type] = value
        this.updateProperties(properties)
      },
      /**
       * 更新元素属性
       * @param { Object } 要更新的属性, 例如 { name: '' }
       */
      updateProperties(properties) {
        const { modeler, element } = this
        const modeling = modeler.get('modeling')
        modeling.updateProperties(element, properties)
      }
    }
  }
</script>

<style scoped>
</style>
