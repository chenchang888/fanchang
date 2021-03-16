<template>
  <div id="column-container">
    <div class="main">
      <div class="main-content">
        <div class="title-type">{{title}}</div>
        <ul>
          <li class="item" v-for="item in navItem" :key="item.id" @click="handleGoPublic">{{item.title}}</li>
        </ul>
      </div>
    </div>
    <!-- 工具栏 -->
    <div class="util-bar">
      <div @click="toHome" class="util-item">
        <img alt="" src="@/assets/img/a.png">
      </div>
      <div @click="goBack" class="util-item">
        <img src="@/assets/img/d.png">
      </div>
      <div @click="goto" class="util-item">
        <img src="@/assets/img/c.png">
      </div>
      <div @click="userKey" class="util-item">
        <img src="@/assets/img/b.png">
      </div>
    </div>
  </div>
</template>

<script>
import Data from "./data.json"
export default {
  data() {
    return {
      navList: [],//企业或个人列表
      navItem: [],//菜单列表
      title: ""//类型名称
    }
  },
  mounted() {
    this.getListNav()
  },
  methods: {
    getListNav() {
      this.$route.query.typeId == 0 ? this.navList = Data.companyNav : this.navList = Data.personNav
      const navId = this.$route.query.id
      const index = this.navList.findIndex(item => item.id == navId)
      if (index != -1) {
        this.navItem = this.navList[index].children
        this.title = this.navList[index].title
      }
    },
    handleGoPublic() {
      console.log(1);
    },
     //返回首页
    toHome() {
      console.log(6);
      this.$router.push({ name: 'Home' })
    },
    //前进
    goto() {
      this.$router.go(1)
    },
    //后退
    goBack() {
      this.$router.go(-1)
    },
    userKey() {
      // this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped>
#column-container {
  .main {
    position: relative;
    width: 1500px;
    height: 700px;
    margin: 0 auto;
    border: 1px solid #ffffff;
    .main-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1480px;
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
        line-height: 45px;
        padding: 20px;
        margin: 17px;
        text-align: center;
        border-radius: 10px;
        box-sizing: border-box;
        background: rgba(105, 99, 209, 0.8);
        color: #fff;
        font-size: 26px;
      }
    }
  }
}
</style>
