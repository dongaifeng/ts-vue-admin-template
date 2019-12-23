<template>
  <div>
    <div>{{msg}}</div>
    <div>{{aaa}}</div>
    <list :age='333'></list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import List from './component/list.vue'
@Component({
  name: 'page',
  props: {
    bar: {
      default: '在Component装饰器中的props'
    }
  },
  components: { List }
})
export default class extends Vue {
  msg: string = '我是测试数据'
  // foo = this.bar + '初始化使用props'

  get aaa() {
    return '计算属性 使用get特殊字段'
  }

  handle() {
    console.log('方法 methods')
  }
}
</script>
