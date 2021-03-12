<template>
  <div class="home-container">
    <!--<img class="mascot" src="@/assets/img/applet.jpg">-->
    <div class="logo">
      <img alt="" src="@/assets/img/fc-logo.png">

    </div>
    <!-- 搜索开始 -->
    <div class="search-container">
      <div class="search-bar">
        <input placeholder="请输入关键词搜索" ref="keyword" type="text">
        <button @click="toSearch">
          <img alt="" src="@/assets/img/search_icon.png">
          <span>搜索</span>
        </button>
      </div>
    </div>
    <!-- 搜索结束 -->
    <!-- 轮播图开始 -->
    <div class="swiper-container swiper-wrap-index">
      <div class="swiper-wrapper">
        <!-- 规范性政策库 -->
        <div class="swiper-slide">
          <div class="swiper-slide-bg">
            <div class="swiper-slide-title">规范性政策库</div>
            <ul class="l-box" id="cityLeft">
              <li v-for="item in policyNav.countryLeft" :key="item.id">
                <img :src="item.icon">
                <p>{{ item.name }}</p>
                <div :data-name="item.name" :data-pidName='"惠企政策"' :data-themeId="item.id" class="mask-div"></div>
              </li>
              <li v-for="item in cityLeft" :key="item.id">
                <img :src="item.icon">
                <p>{{ item.name }}</p>
                <div :data-name="item.name" :data-pidName='"惠企政策"' :data-themeId="item.id" class="mask-div"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 规范性政策库结束 -->

        <!-- 企业生命周期 -->
        <div class="swiper-slide">
          <div class="swiper-slide-bg">
            <div class="swiper-slide-title">企业生命周期</div>
            <ul class="policy-company-nav">
              <li @click="handleCompanySet">
                <img src="../assets/img/company_01.png">
              </li>
              <li @click="handleCompanySupport">
                <img src="../assets/img/company_02.png">
              </li>
              <li @click="handleCompanyManage">
                <img src="../assets/img/company_03.png">
              </li>
              <li @click="handleCompanyCancel">
                <img src="../assets/img/company_04.png">
              </li>
            </ul>
          </div>
        </div>
        <!-- 企业生命周期结束 -->
        <!-- 政务公开专题区域 -->
        <div class="swiper-slide">
          <div class="swiper-slide-bg">
            <div class="swiper-slide-title">两化专题</div>
            <div class="twoModer-title">
              <div class="title-top">
                <h1>全面推进基层政务公开</h1>
              </div>
              <div class="title-bottom">
                <h1>标准化</h1>
                <h1>规范化</h1>
                <h1>专题</h1>
              </div>
              <div class="click-into" @click="toPublic">点击进入</div>
            </div>
          </div>
        </div>

        <!-- 个人生命周期 -->
        <div class="swiper-slide">
          <div class="swiper-slide-bg">
            <div class="swiper-slide-title">个人生命周期</div>
            <ul class="l-box" id="countryLeft">
              <li v-for="item in policyNav.cityLeft" :key="item.id">
                <img :src="item.icon">
                <p>{{ item.name }}</p>
                <div :data-name="item.name" :data-pidName='"便民政策"' :data-themeId="item.id" class="mask-div"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 个人生命周期结束 -->
      </div>
    </div>
    <!-- 轮播图结束 -->
    <div class="click-into" @click="toPublic">点击进入</div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import { mapState } from "vuex"
import { baseURL } from "../api/baseURL"
export default {
  name: 'home',
  data() {
    return {
      policyNavList: [],
      policyId: [],
      countryLeft: [],
      countryRight: [],
      cityLeft: [],
      cityRight: [],
      parkLeft: [],
      parkRight: [],
    }
  },
  created() {
    this.setCode()
  },
  mounted() {
    this.getData();
    const _getDom = domStr => document.querySelectorAll(domStr);

    const _addClass = lists => {
      return _className => {
        lists.forEach(ele => ele.classList.add(_className));
      }
    };

    const _slide = _getDom('.swiper-slide');

    setTimeout(() => _addClass(_slide)('animate'), 500)

  },
  methods: {
    //设置设备code
    setCode(bound) {
      console.log(bound);
      if (bound) {
        var deviceCode = bound.machineCode
        this.$store.commit('setCode', deviceCode)
      }

    },
    initSwiper() {
      const self = this;
      new Swiper('.swiper-wrap-index', {
        slidesPerView: 'auto',
        spaceBetween: -500,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        on: {
          tap: function (e) {
            console.log(e);
            //console.log(e.target.className);
            //alert("检测到触摸事件")
            if (e.target.className === 'mask-div') {
              //alert("触摸结束,执行跳转页面")
              self.theme(e.target.dataset.pidname, e.target.dataset.name, e.target.dataset.themeid);
            }
          },
        }
      });
    },

    // 跳转政务公开专题
    toPublic() {
      console.log(6);
      window.location.href = "http://www.wuhu.gov.cn/site/tpl/6782291"
    },
    async getData() {
      await this.$store.dispatch("getPolicyNav", () => {
        console.log(this.policyNav);
        this.policyNav.countryLeft.forEach((item) => {
          item.icon = `${baseURL}/${item.icon}`
        })
        this.policyNav.cityLeft.forEach((item) => {
          item.icon = `${baseURL}/${item.icon}`
        })
        setTimeout(() => {
          this.initSwiper();
        })
      })
    },
    // 触摸跳转函数
    theme(pidName, themeName, themeId) {
      this.$router.push({
        name: 'details', query: { pidName: pidName, classifyId: themeId, themeName: themeName }
      })

    },
    toSearch() {
      var title = this.$refs.keyword.value;
      this.$router.push({ name: 'searchPage', query: { title: title } })
    },
    // 企业分类跳转
    handleCompanySet() {
      console.log(1);
      this.$router.push({ path: 'companyColumn', query: { id: 0 } })
    },
    handleCompanySupport() {
      console.log(1);
      this.$router.push({ path: 'companyColumn', query: { id: 1 } })
    },
    handleCompanyManage() {
      console.log(1);
      this.$router.push({ path: 'companyColumn', query: { id: 2 } })
    },
    handleCompanyCancel() {
      console.log(1);
      this.$router.push({ path: 'companyColumn', query: { id: 3 } })
    }

  },
  computed: {
    ...mapState({
      policyNav: state => state.policyNav
    })
  }
}
</script>
<style lang="less" scoped>
.home-container {
  // 搜索框
  .search-container {
    padding: 30px 0;
    .search-bar {
      width: 560px;
      height: 45px;
      margin: 0 auto;
      display: flex;
      background: #0984e4;
      color: #fff;
      button {
        width: 115px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
        &:active {
          box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.1);
        }
      }
      input {
        display: block;
        height: 100%;
        flex: 1;
        border: 2px solid #0984e4;
        background: #d4e6f1;
        font-size: 18px;
        padding: 0 10px;
      }
      img {
        height: 28px;
        margin-right: 12px;
      }
    }
  }
  //
  .swiper-wrap-index {
    margin-top: 22px;
    .swiper-wrapper {
      .swiper-slide {
        position: relative;
        z-index: 99;
        display: flex;
        width: 1142px;
        height: 668px;
        border: 1px solid #ffffff;
        .swiper-slide-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1120px;
          height: 646px;
          box-shadow: 0px 14px 43px 14px rgba(3, 3, 110, 0.47);
          background-color: rgba(255, 255, 255, 0.2);
          .swiper-slide-title {
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
          .twoModer-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 60px;
            text-align: center;
            letter-spacing: 10px;
            h1 {
              color: #fff;
            }
            .title-bottom {
              display: flex;
              justify-content: space-around;
              padding: 0 20px;
              h1 {
                display: inline-block;
                &:nth-child(-n + 2) {
                  color: #ffcc00;
                  font-weight: 700;
                }
              }
            }
            .click-into {
              width: 200px;
              line-height: 52px;
              text-align: center;
              margin: 20px auto;
              padding-left: 15px;
              border-radius: 10px;
              letter-spacing: 4px;
              color: #fff;
              font-size: 26px;
              background-color: #8567f5;
            }
          }
          //   企业
          .policy-company-nav {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            column-count: 2;
            -webkit-column-count: 2;
            -moz-column-count: 2;
            li {
              padding: 15px;
            }
          }
        }
        .animate {
          transition: all 0.5s linear;
        }
        .swiper-slide-active {
          z-index: 9;
        }
        &:not(.swiper-slide-active) {
          opacity: 0.3;
          transform: scale(0.5);
        }
        .l-box {
          padding: 0 100px;
          img {
            width: 74px;
            height: 74px;
          }
          p {
            margin-top: 26px;
            font-size: 22px;
            color: #fff;
          }
        }
        .l-box > li {
          width: 20%;
          height: 180px;
          float: left;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }
    }
  }
}

.mascot {
  position: fixed;
  z-index: 999;
  right: 20px;
  margin-top: 20px;
  /*bottom: 20px;*/
  cursor: grab;
  user-select: none;
  width: 160px;
}
</style>
