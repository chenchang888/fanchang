<template>
  <div class="content-container">
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

    <div :class="{isHide: showMask}" class="gov-wrap">
      <div class="border-inner">
        <div class="top-bar">
          <div class="addr-bar" v-if="show">
            <img src="@/assets/img/icon-1.png">
            <span>您所在的位置：</span>
            <span>{{ pidName }}</span>&nbsp;&gt;&nbsp;<span>{{ themeName }}</span>&nbsp;&gt;&nbsp;<span>{{ fileName }}</span>
          </div>
          <div class="addr-bar" v-else>
            <img src="@/assets/img/icon-1.png">
            <span>搜索结果：</span>&nbsp;<span>{{ themeName }}</span>&nbsp;&gt;<span>{{ fileName }}</span>&gt;&nbsp;<span>政策内容</span>
          </div>
          <div class="tab-nav">
            <!-- <div class="nav-item active">
              <img alt="" src="@/assets/img/icon-2.png">
              <span>政策内容</span>
            </div> -->
            <!-- <div @click="getReportData" class="nav-item">
              <img alt="" src="@/assets/img/icon-5.png">
              <span>相关文章</span>
            </div> -->
            <div class="nav-item disabled-event">
              <!--<img alt="" src="@/assets/img/icon-3.png">
                        <span>相关服务</span>-->
            </div>
          </div>
        </div>
        <div class="gov-tabs">
          <div class="tab-item active">
            <!-- 二维码 -->
            <!--<div class="qrcode">
                      <p>
                        扫码在手机上查看
                      </p>
                      <img class="mascot" src="@/assets/img/applet.jpg">
                    </div>
                    <div class="qrcode" style="margin-top: 133px;cursor: pointer;">
                      <img @click="toOtherNet" class="mascot" src="@/assets/img/dyzwfww.png">
                    </div>-->
            <!--<div class="qrcode" v-if="type==1">
                      <p>
                        扫码在手机上查看
                      </p>
                      <img :src="imgUrl">
                    </div>
                    <div class="qrcode"  v-else></div>-->
            <div class="detail-content" v-for="item in fileData" :key="item.id">
              <h2>{{ item.title }}</h2>
              <div class="time-resource">
                <time>{{ item.time }}</time>&nbsp;
                <span>来源：{{ item.source }}</span>
              </div>
              <article class="scroll-style" id="divCss" v-html="item.content">
              </article>
            </div>
          </div>
          <div class="tab-item">
            <ul class="gov-file-list scroll-style">
              <li @click="gotoTrain(item.id,item.columnId)" id="file-item" v-for="item in artData" :key="item.id">
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

    <div class="mask-wrap content-container" v-if="showMask">
      <div class="gov-wrap">
        <div class="border-inner">
          <div class="top-bar" style="position: relative;">
            <img @click="updateRecord" src="@/assets/img/close.png" style="position: absolute; width: 30px; right: 25px; top: 25px; cursor: pointer;">
            <div class="addr-bar">
              <img alt="" src="@/assets/img/icon-1.png">
              <span>您所在的位置：</span>
              <span>{{ pidName }}</span>&nbsp;&gt;&nbsp;<span>{{ themeName }}</span>&nbsp;&gt;&nbsp;<span>{{ fileName }}</span>&nbsp;&gt;&nbsp;<span>正文内容</span>
            </div>
            <div class="tab-nav">
              <div :class="{active: upIsActive === 0}" @click="upIsActive = 0" class="nav-item nav-item-up">
                <img alt="" src="@/assets/img/icon-2.png">
                <span>政策内容</span>
              </div>
              <!-- <div :class="{active: upIsActive === 1}" @click="getImgReportData" class="nav-item nav-item-up">
                <img alt="" src="@/assets/img/icon-5.png">
                <span>相关文章</span>
              </div> -->
              <!-- <div class="nav-item disabled-event nav-item-up"> -->
              <!--<img alt="" src="@/assets/img/icon-3.png">
                            <span>相关服务</span>-->
              <!-- </div> -->
            </div>
          </div>
          <div class="gov-tabs">
            <div :class="{active: upIsActive === 0}" class="tab-item tab-item-up">
              <!-- 二维码 -->
              <div class="qrcode">
                <p>
                  扫码在手机上查看
                </p>
                <!-- <img class="mascot" src="@/assets/img/applet.jpg"> -->
              </div>

              <!--<div class="qrcode" v-if="type==1">
                          <p>
                            扫码在手机上查看
                          </p>
                          <img :src="imgUrl">
                        </div>
                        <div class="qrcode" v-else></div>-->
              <div class="detail-content" v-for="item in imgData" :key="item.id">
                <h2>{{ item.title }}</h2>
                <div class="time-resource">
                  <time>{{ item.time }}</time>&nbsp;
                  <span>来源：{{ item.source }}</span>
                </div>
                <article class="scroll-style article" style="height: 640px;" v-html="item.content">
                </article>
              </div>
            </div>
            <div :class="{active: upIsActive === 1}" class="tab-item tab-item-up">
              <ul class="gov-file-list scroll-style">
                <li @click="imgDetail(item.id,item.columnId)" v-for="item in imgArtData" :key="item.id">
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
import { mapState } from 'vuex';
import { baseURL } from "../../api/baseURL"
export default {
  name: "Content",
  data() {
    return {
      policyId: this.$route.query.policyId,
      classifyId: this.$route.query.classifyId,
      pidName: this.$route.query.pidName,
      themeName: this.$route.query.themeName,
      fileName: this.$route.query.fileName,
      fileData: [],
      artData: [],
      //serviceData: [],
      recordId: null,
      show: true,
      type: null,
      imgUrl: "",
      title: this.$route.query.title,
      upIsActive: 0,
      showMask: false,   //   显示弹框
      imgData: [],
      imgPolicyId: null,
      imgArtData: [],
      toolbarShow: true
    }
  },
  mounted() {
    const _getDom = domStr => document.querySelectorAll(domStr);
    const navItem = _getDom('.nav-item');
    const tabitem = _getDom('.tab-item');
    navItem.forEach((nav, index, arr) => {
      nav.onclick = () => {
        arr.forEach(nav2 => nav2.classList.remove('active'));
        nav.classList.add('active');
        tabitem.forEach(tab => tab.classList.remove('active'));
        tabitem[index].classList.add('active');
      }
    })
  },
  created(bound) {
    if (this.title != '' && this.title != null) {
      this.show = false;
    }
    this.getTrainData(this.policyId);
    if (bound) {
      this.toolbarShow = false
    }
  },
  //离开事件
  destroyed: function () {
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
  methods: {
    //跳转第三方
    toOtherNet() {
      window.location.href = "http://chuz.ahzwfw.gov.cn/?cityCode=341125000000&cityName=%25E5%25AE%259A%25E8%25BF%259C%25E5%258E%25BF"
    },
    //返回首页
    toHome() {
      this.$router.push("/home")
    },
    //前进
    goto() {
      this.$router.go(1)
    },
    //后退
    goBack() {
      this.$router.go(-1)
    },
    // 详情
    getTrainData(policyId) {
      var params = {
        policyId: policyId
      }
      console.log(policyId);
      this.$store.dispatch("getPolicyDetails", {
        params, fn: () => {
          this.$nextTick(() => {
            this.policyDetails.forEach(val => {
              this.imgUrl = baseURL + "/" + val.images;
              this.type = val.type;
              //设置访问记录id
              this.recordId = val.recordId;
              this.themeName = val.themeName;
            });
            this.fileData = this.policyDetails
            console.log(this.policyDetails);
          })
        }
      })
      // this.$ajax.post(
      //   '/trainPolicy/getTrainData', params)
      //   .then(res => {
      //     this.fileData = res.data;
      //     console.log(res.data);
      //     this.fileData.forEach(val => {
      //       this.imgUrl = baseURL + "/" + val.images;
      //       this.type = val.type;
      //       //设置访问记录id
      //       this.recordId = val.recordId;

      //       this.themeName = val.themeName;
      //     });

      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },
    gotoTrain(id, type) {
      if (type == 1) {
        this.showMask = true;
        // var params = {
        //   policyId: id
        // }
        this.imgPolicyId = id;
        // this.$ajax.post(
        //   '/trainPolicy/getTrainData', params)
        //   .then(res => {
        //     this.imgData = res.data;
        //     console.log(res.data);
        //     this.imgData.forEach(val => {
        //       this.imgUrl = baseURL + "/" + val.images;
        //       this.type = val.type;
        //       //设置访问记录id
        //       this.recordId = val.recordId;
        //     });
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   })
      } else {
        this.$router.push({
          name: 'contentDetail',
          query: {
            policyId: id,
            pidName: this.pidName,
            themeName: this.themeName,
            fileName: this.fileName,
            classifyId: this.classifyId,
            title: this.title
          }
        });
      }
    },
    getReportData() {
      // var params = {
      //   policyId: this.policyId
      // }

      // this.$ajax.post(
      //   '/trainPolicy/getReportData', params)
      //   .then(res => {
      //     this.artData = res.data;
      //     this.artData.forEach(val => {
      //       val.releaseDate = val.releaseDate.substring(0, 10);
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },
    getImgReportData() {
      // var params = {
      //   policyId: this.imgPolicyId
      // }
      // this.upIsActive = 1;
      // this.$ajax.post(
      //   '/trainPolicy/getReportData', params)
      //   .then(res => {
      //     this.imgArtData = res.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },
    imgDetail(id, type) {
      if (type == 1) {
        this.showMask = true;
        this.upIsActive = 0;
        // var params = {
        //   policyId: id
        // }
        this.imgPolicyId = id;
        // this.$ajax.post(
        //   '/trainPolicy/getTrainData', params)
        //   .then(res => {
        //     this.imgData = res.data;
        //     console.log(res.data);
        //     this.imgData.forEach(val => {
        //       this.imgUrl = baseURL + "/" + val.images;
        //       this.type = val.type;
        //       //设置访问记录id
        //       this.recordId = val.recordId;
        //     });
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   })
      } else {
        this.$router.push({
          name: 'contentDetail',
          query: {
            policyId: id,
            pidName: this.pidName,
            themeName: this.themeName,
            fileName: this.fileName,
            classifyId: this.classifyId,
            title: this.title
          }
        });
      }
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
    }
  },
  computed: {
    ...mapState({
      policyDetails: state => state.policyDetails
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/baseCss/baseCss.less";
.gov-wrap {
  @out-bg();
  width: 1600px;
  height: 680px;
  .border-inner {
    @inner-bg();
    width: 1580px;
    height: 660px;
  }
  .scroll-style {
    height: 450px;
    text-align: center;
  }
}
p a {
  color: #fff !important;
}

#divCss > p > span {
  color: #fff !important;
  background: inherit !important;
}

.article img {
  max-width: 100% !important;
}
</style>
