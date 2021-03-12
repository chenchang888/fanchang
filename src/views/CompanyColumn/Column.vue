<template>
  <div id="column-container">
    <div class="main">
      <div class="main-content">
        <div class="title-type">企业开办</div>
        <ul>
          <li class="item">学籍变动</li>
          <li class="item">教育服务</li>
          <li class="item">"义务教育和高中阶段家庭经济困难残疾学生资助"</li>
          <li class="item">休学审批</li>
          <li class="item">学前教育资助服务</li>
          <li class="item">高等教育阶段家庭经济困难残疾学生资助</li>
          <li class="item">菜单选项菜单选项</li>
          <li class="item">菜单选项菜单选项菜单选</li>
          <li class="item">菜单选项菜单选项菜单选项菜单</li>
          <li class="item">菜单选项菜单选项菜单选项菜</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "./data.json"
export default {
    data() {
        return {
            navList:[]
        }
    },
    mounted(){
        console.log(Data);
        
    }
}
</script>

<style lang="less" scoped>
#column-container {
  .main {
    position: relative;
    width: 1200px;
    height: 700px;
    margin: 0 auto;
    border: 1px solid #ffffff;
    .main-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1180px;
      height: 680px;
      box-shadow: 0px 14px 43px 14px rgba(3, 3, 110, 0.47);
      background-color: rgba(255, 255, 255, 0.2);
      .title-type {
        width: 240px;
        line-height: 60px;
        margin: 0 auto;
        margin-bottom: 20px;
        text-align: center;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        background-color: #5252bb;
        font-size: 26px;
        letter-spacing: 6px;
        color: #fff;
      }
      ul {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        padding: 0 50px;
        box-sizing: border-box;
      }
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45%;
        padding: 20px;
        margin: 20px;
        text-align: center;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #ffa749;
        color: #fff;
        font-size: 26px;
      }
    }
  }
}
</style>
