<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="常规" name="first">常规</el-tab-pane>
        <el-tab-pane label="属性" name="second">
          <el-form ref="ruleForm" :model="ruleForm" label-width="150px">
               <el-form-item label="URL上下文名称">
                 <el-input v-model="ruleForm.name" @change="event => changeField(event, 'name')"></el-input>
               </el-form-item>
               <el-form-item label="解析请求体的方式">
                  <el-radio-group v-model="ruleForm.resource"  @change="event => changeField(event, 'resource')" style="text-align: left;">
                      <el-radio label="以流方式解析"></el-radio>
                      <el-radio label="以字符方式解析"></el-radio>
                      <el-radio label="不解析"></el-radio>
                    </el-radio-group>
               </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane  label="身份认证" name="third">身份认证</el-tab-pane>
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
