<template>
  <div class="card-panel">
    <div class="card-panel-header">项目1</div>
    <el-row>
      <el-col :span="8" v-for="item in 10" :key="item">
        <div class="card-panel-description">
          <span class="card-panel-text">服务总数:</span>
          <span class="card-panel-num">30</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// import CountTo from 'vue-count-to'

@Component({
  name: 'PanelGroup',
  components: {}
})
export default class extends Vue {
  private handleSetLineChartData(type: string) {
    this.$emit('handleSetLineChartData', type)
  }
}
</script>

<style lang="scss" scoped>
.card-panel-col {
  margin-bottom: 32px;
}

.card-panel {
  // height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  // overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border: 1px solid red;

  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }
  }
  &-header {
    text-align: center;
    font-weight: 700;
  }

  .icon-people {
    color: #40c9c6;
  }

  .card-panel-description {
    margin: 8px;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 5px;
    }

    .card-panel-num {
      font-size: 14px;
      color: blue;
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
