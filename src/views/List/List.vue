<template>
  <div class="details-container">
    <!-- 工具栏 -->
    <div class="util-bar" v-if="toolbarShow">
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
    <!-- 面包屑 -->
    <div :class="{isHide: showMask}" class="gov-wrap">
      <div class="border-inner">
        <div class="top-bar">
          <div class="addr-bar" v-if="show">
            <img src="@/assets/img/icon-1.png">
            <span>您所在的位置：</span>
            <span>{{ pidName }}</span>&nbsp;&gt;&nbsp;<span>{{ themeName }}</span>&nbsp;&gt;&nbsp;<span>{{
            fileName
          }}</span>
          </div>
          <div class="addr-bar" v-else>
            <img alt="" src="@/assets/img/icon-1.png">
            <span>搜索结果：</span>
            <span>服务内容</span>
          </div>
          <div class="tab-nav">
            <div :class="{active:columnId == 2}" @click="gotoTheme(2)" class="nav-item nav-item-out">
              <img src="@/assets/img/icon-2.png">
              <span>政策文件</span>
            </div>
            <div :class="{active:columnId == 1}" @click="gotoTheme(1)" class="nav-item nav-item-out">
              <img src="@/assets/img/icon-5.png">
              <span>政策图解</span>
            </div>
            <!--<div :class="{active:columnId == 3}" @click="gotoTheme(3)" class="nav-item nav-item-out">
                        <img alt="" src="@/assets/img/icon-3.png">
                        <span>相关服务</span>
                    </div>-->
          </div>
        </div>
        <!-- 政策文件政策解读切换 -->
        <div class="gov-tabs">
          <!-- 政策文件 -->
          <div :class="{active:columnId == 2}" class="tab-item tab-item-out">
            <div class="side-bar-new-add">
              <div :class="{ active: barItemActive === 1}" @click="changeType(1)" class="bar-item">国家政策
              </div>
              <div :class="{ active: barItemActive === 2}" @click="changeType(2)" class="bar-item">省级政策
              </div>
              <div :class="{ active: barItemActive === 3}" @click="changeType(3)" class="bar-item">市级政策
              </div>
              <div :class="{ active: barItemActive === 4}" @click="changeType(4)" class="bar-item">县级政策
              </div>
            </div>
            <ul class="gov-file-list scroll-style">
              <li @click="handleIntoDetails(item.id,2)" id="file-item" v-for=" item in policy" :key="item.id">
                <span>{{ item.title }}</span>
                <time>{{ item.releaseDate }}</time>
              </li>
            </ul>
          </div>
          <!-- 政策图解 -->
          <div :class="{active:columnId == 1}" class="tab-item tab-item-out">
            <div v-if="flag" class="swiper-wrap-details list1 scroll-style">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in policy" :key="item.id" @click="handleIntoDetails(item.id,1)">
                  <img :src="item.backImg" style="object-fit: cover;">
                  <p>{{ item.title }}</p>
                </div>
              </div>
            </div>
            <div v-else class="loading">加载中...</div>
          </div>
          <div :class="{active:columnId == 3}" class="tab-item tab-item-out">
            <ul class="service-list scroll-style">
              <li v-for="(item) in serviceData" :key="item.id">
                <span @click="gotoDetail(item.ssqdCode,item.type,item.ssqdName)" style="float: left;">{{ item.ssqdName }}</span>
                <span @click="gotoDetail(sub.ssqdCode,sub.type,sub.ssqdName)" v-for="sub in item.childData" :key="sub.id">{{ sub.ssqdName }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mask-wrap content-container" v-if="showMask">
      <div class="gov-wrap content-img" :class="{'out-bg':upIsActive===0||upIsActive===1}">
        <div class="border-inner" :class="{'inner-bg':upIsActive===0||upIsActive===1}">
          <div class="top-bar" style="position: relative;">
            <img @click="updateRecord" src="@/assets/img/close.png" style="position: absolute; width: 30px; right: -25px; top: -25px; cursor: pointer;">
            <div class="addr-bar">
              <img alt="" src="@/assets/img/icon-1.png">
              <span>搜索结果：</span>
              <span>{{ themeName }}</span>&nbsp;&gt;&nbsp;<span>{{ fileName }}</span>&nbsp;&gt;&nbsp;<span>正文内容</span>
            </div>
            <div class="tab-nav">
              <div :class="{active: upIsActive === 0}" @click="upIsActive = 0" class="nav-item nav-item-up">
                <img alt="" src="@/assets/img/icon-2.png">
                <span>政策内容</span>
              </div>
              <!-- <div :class="{active: upIsActive === 1}" @click="getReportData" class="nav-item nav-item-up">
                <img alt="" src="@/assets/img/icon-5.png">
                <span>相关文章</span>
              </div> -->
              <div class="nav-item disabled-event nav-item-up">
                <!--<img alt="" src="@/assets/img/icon-3.png">
                            <span>相关服务</span>-->
              </div>
            </div>
          </div>
          <div class="gov-tabs">
            <div :class="{active: upIsActive === 0}" class="tab-item tab-item-up">
              <div class="detail-content" v-for="item in imgData" :key="item.id">
                <h2>{{ item.title }}</h2>
                <div class="time-resource">
                  <time>{{ item.time }}</time>&nbsp;
                  <span>来源：{{ item.source }}</span>
                </div>
                <article class="scroll-style article" id="divCss" style="height: 650px;" v-html="item.content">
                </article>
              </div>
            </div>
            <div :class="{active: upIsActive === 1}" class="tab-item tab-item-up">
              <ul class="gov-file-list scroll-style">
                <li @click="trainDetail(item.id,item.columnId)" v-for="item in artData" :key="item.id">
                  <span>{{ item.title }}</span>
                  <time>{{ item.releaseDate }}</time>
                </li>
              </ul>
            </div>
            <!--<div class="tab-item">
                      <ul class="service-list scroll-style">
                        <li v-for="(item) in serviceData">
                          <span @click="gotoDetail(item.ssqdCode,item.type,item.ssqdName)"
                                style="float: left;">{{item.ssqdName}}</span>
                          <span @click="gotoDetail(item.ssqdCode,item.type,item.ssqdName)"
                                v-for="sub in item.childData">{{sub.ssqdName}}</span>
                        </li>
                      </ul>
                    </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from "swiper"
import { baseURL } from "../../api/baseURL"
import { mapState } from "vuex"
export default {
  name: 'detailList',
  data() {
    return {
      pidName: this.$route.query.pidName,
      themeName: this.$route.query.themeName,
      classifyId: this.$route.query.classifyId,
      fileName: "政策图解",
      fileList: [],
      title: this.$route.query.title,
      instructionsList: [],//政策图解
      serviceData: [],
      columnId: this.$route.query.columnId,
      showMask: false,   //   显示弹框
      show: true,
      fileData: [],
      artData: [],
      recordId: null,
      type: null,
      policyId: null,
      upIsActive: 0,
      imgData: [],//图解详情
      reportId: null,
      barItemActive: 1,
      childId: null,
      toolbarShow: true,
      falg: false//加载中
    }
  },
  created(bound) {
    if (this.columnId == null) {
      this.columnId = 1;
    }
    if (this.childId == null) {
      this.childId = 1;
    }
    if (this.title != '' && this.title != null) {
      this.show = false;
    }
    this.gotoTheme(this.columnId);
    if (bound) {
      this.toolbarShow = false
    }
  },
  mounted() {
    const _getDom = domStr => document.querySelectorAll(domStr);
    const navItem = _getDom('.nav-item-out');
    const tabitem = _getDom('.tab-item-out');

    navItem.forEach((nav, index, arr) => {
      nav.onclick = () => {
        arr.forEach(nav2 => nav2.classList.remove('active'));
        nav.classList.add('active');

        tabitem.forEach(tab => tab.classList.remove('active'));
        tabitem[index].classList.add('active');
      }
    })

  },
  methods: {
    //跳转第三方
    // toOtherNet() {
    //   window.location.href = "http://chuz.ahzwfw.gov.cn/?cityCode=341125000000&cityName=%25E5%25AE%259A%25E8%25BF%259C%25E5%258E%25BF"
    // },
    // initSwiper1() {
    //   const self = this;
    //   new Swiper('.list1', {
    //     slidesPerView: 'auto',
    //     spaceBetween: -150,
    //     grabCursor: true,
    //     centeredSlides: true,
    //     loop: true,
    //     on: {
    //       tap: function (e) {
    //         //console.log(e.target.className);
    //         if (e.target.className === 'mask-div') {
    //           //console.log(e.target.dataset.id);
    //           self.trainDetail(e.target.dataset.id, 1);
    //         }
    //       }
    //     }
    //   });
    // },

    //返回首页
    toHome() {
      this.$router.push({ path: '/home' })
    },
    //前进
    goto() {
      this.$router.go(1)
    },
    //后退
    goBack() {
      this.$router.go(-1)
    },
    //切换政策类型
    gotoTheme(columnId) {
      console.log(columnId);
      this.columnId = columnId;
      if (columnId == 2) {
        this.getPolicyData(columnId);
        this.fileName = "政策文件";
      } else if (columnId == 1) {
        this.flag = false
        this.getDirection(columnId);
        this.fileName = "政策图解";
      } else {
        this.getServiceData();
        this.fileName = "相关服务";
      }
    },
    //获取政策文件
    getPolicyData(columnId) {
      const params = {
        classifyId: this.$route.query.classifyId,
        columnId: columnId,
        title: this.$route.query.title,
        childId: this.childId
      };
      this.$store.dispatch("getPolicy", { params })
    },
    //获取政策图解
    getDirection(columnId) {
      const params = {
        classifyId: this.$route.query.classifyId,
        columnId: columnId,
        title: this.$route.query.title
      };
      this.$store.dispatch("getPolicy", {
        params,
        fn: () => {
          this.flag = true
          this.policy.forEach((item) => {
            item.backImg = baseURL + "/" + item.backImg
          })
        }
      })
    },
    //获取相关文章
    getServiceData() {
      var params = {
        classifyId: this.classifyId,
        title: this.$route.query.title
      }
      this.$ajax.post(
        '/trainPolicy/getServiceData', params)
        .then(res => {
          console.log(res);
          this.serviceData = res.data;
          console.log(this.serviceData)
        })

        .catch(err => {
          console.log(err);
        })
    },
    //跳转政策详情
    handleIntoDetails(id, type) {
      this.upIsActive = 0;
      this.policyId = id;
      if (type == 1) {
        this.showMask = true;
        var params = {
          policyId: id
        }
        this.$store.dispatch("getGraphicDetails", {
          params,
          fn: () => {
            this.imgData = this.graphicDetails
            console.log(this.imgData);
          }
        })
      } else {
        this.$router.push({
          path: '/details',
          query: {
            policyId: id,
            pidName: this.pidName,
            themeName: this.themeName,
            fileName: this.fileName,
            classifyId: this.classifyId
          }
        })
      }

    },
    gotoDetail(ssqdCode, type, ssqdName) {
      this.$router.push({
        name: 'service',
        query: {
          pidName: this.pidName,
          themeName: this.themeName,
          fileName: this.fileName,
          ssqdCode: ssqdCode,
          type: type,
          ssqdName: ssqdName,
          classifyId: this.classifyId,
          title: this.title
        }
      })
    },

    getReportData() {
      this.upIsActive = 1;
      var params = {
        policyId: this.policyId
      }

      this.$ajax.post(
        '/trainPolicy/getReportData', params)
        .then(res => {
          this.artData = res.data;
          //console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    },
    //关闭绑定事件
    updateRecord() {
      this.showMask = false;
      this.upIsActive = 0;
      var params = {
        recordId: this.recordId
      }
      if (this.recordId != null && this.recordId != '') {
        this.$ajax.post('/trainPolicy/updateTime', params)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    userKey(bound) {
      if (bound) {
        bound.showKeyBoard();
      }
    },
    //改变政策文件类别
    changeType(childId) {
      this.barItemActive = childId;
      this.childId = childId;
      this.getPolicyData(2);
    },
  },
  computed: {
    ...mapState({
      policy: state => state.policy,
      graphicDetails: state => state.graphicDetails
    })
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/baseCss/baseCss.less";
.details-container {
  .gov-wrap {
    @out-bg();
    width: 1600px;
    .border-inner {
      @inner-bg();
      width: 1580px;
    }
    .loading {
      width: 500px;
      height: 200px;
      text-align: center;
      margin: 100px auto;
      color: #fff;
      font-weight: 700;
      letter-spacing: 20px;
    }
  }
  .content-img {
    margin: 0;
    .addr-bar {
      margin: 0;
    }
  }
  .out-bg {
    height: 900px;
    .inner-bg {
      height: 880px;
    }
  }
  .list1 {
    height: 560px;
    // background-color: royalblue;
  }
  .article {
    text-align: center;
  }
  .swiper-wrap-details {
    .swiper-wrapper {
      display: flex;
      flex-wrap: wrap;
      .swiper-slide {
        width: 33.33%;
        p {
          color: #fff;
        }
      }
    }
  }
  .scroll-style {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .scroll-style::-webkit-scrollbar {
    width: 10px;
    height: 1px;
  }

  .scroll-style::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.3);
  }

  .scroll-style::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>

