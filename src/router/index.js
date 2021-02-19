import Vue from 'vue'
import Router from 'vue-router'
import Bpmn from '@/components/Bpmn.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bpmn',
      component: Bpmn
    }
  ]
})
