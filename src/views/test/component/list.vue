<template>
  <div>
    <div>{{a}}</div>
    <div>{{bbb}}</div>
    <div>{{ddd}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch, Emit, Ref } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
class myMixin extends Vue {
  a: string = '使用装饰器  混入'
}

@Component({
  name: 'list'
})
export default class extends mixins(myMixin) {
  @Prop(Number)
   readonly aaa: Number | undefined

  @Prop({ default: '默认prop' })
   readonly bbb !: string

  @Prop()
  age!: number

  @PropSync('ddd', { default: 'propsync 装饰器' })
  syncDDD!: string

  @Watch('age', { immediate: true, deep: true })
  public onAgeChange(newVal: string, oldVal: string) {
    console.log(newVal, oldVal)
  }

  @Emit()
  public addNum() {
    this.age++
  }

  @Emit('reset')
  public fn(a: string) {
    console.log(a)
    return a + 'bbb'
  }

  @Ref('abutton')
  readonly another!: HTMLButtonElement
}
</script>
