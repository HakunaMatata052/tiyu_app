<template>
  <div class="container" id="shop">
    <navBar :goback="true" title="竞彩篮球">
      <!-- <div class="right" slot="right">
        <span class="shai">筛</span>
        <span>
          <img src="../../assets/images/shuaxin.png" alt />
        </span>
      </div>-->
      <!-- <van-dropdown-menu class="menu" slot="title">
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>-->
    </navBar>
    <div class="main">
      <div class="wrap" v-for="(item1,index) in $store.state.basketResult" :key="index">
        <div class="title">
          <span>{{item1.date}}</span>
          <span>{{item1.num}}</span>
          <span class="fen" :style="{color:item1.fen>0?'#f00':'green'}">{{item1.fen}}</span>
        </div>
        <div class="test">
          <div class="left">
            <p class="first">{{item1.num}}</p>
            <p>{{item1.lcnAbbr}}</p>
            <p>{{item1.time}}截止</p>
          </div>
          <div class="right">
            <div class="div1">
              <span>{{item1.acn}}(客)</span>
              <span>VS</span>
              <span>{{item1.hcn}}(主)</span>
            </div>
            <div class="tab">
              <div class="left1">
                <p class="p1">
                  <span class="p1-first">0</span>
                </p>
                <p class="p2">
                  <span class="p2-first">让</span>
                </p>
              </div>
              <div class="center">
                <ul>
                  <li
                    v-for="(item,i) in item1.basketBallBet"
                    :key="i"
                    v-if="i<4"
                    :class="addColor(index,i)"
                    @click="push(index,i,item)"
                  >
                    <span v-if="i==0 || i==2">客胜</span>
                    <span v-else-if="i==1 || i==3">主胜</span>

                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
              <div class="right1" :class="item1.single==1&&$store.state.boolBask==true?'bor':''">
                <span
                  :class="bgc(index)"
                  @click="$router.push('/allplayBasket/'+index)"
                >{{coun(index)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div class="bot-btn">
        <div class="check">
          <van-checkbox
            v-model="checked"
            shape="square"
            checked-color="#FFA500"
            @change="chek"
          >显示固定单关(橙色框内)</van-checkbox>
        </div>
        <!-- <div class="text">
          <p v-if="$store.state.basketSumcount==0">至少选择2场比赛</p>
          <p v-if="$store.state.basketSumcount>=1">已选择{{$store.state.basketSumcount}}场比赛</p>
          <p class="pei">[页面赔率仅供参考,请以实体票为准]</p>
        </div>-->
        <div class="btn">
          <div class="delete" @click="del">
            <p>
              <van-icon name="delete" size="19px" />
            </p>
            <p>清空</p>
          </div>
          <div>
            <p v-if="$store.state.basketSumcount==0">至少选择2场比赛</p>
            <p v-if="$store.state.basketSumcount>=1">已选择{{$store.state.basketSumcount}}场比赛</p>
          </div>
          <div>
            <!-- <van-button type="danger" size="large" @click="confirm">确定</van-button> -->
            <van-button round type="danger" @click="confirm" size="small">确定</van-button>
          </div>

          <!-- <van-button type="default" size="large">清空</van-button>
          <van-button type="danger" size="large">确定</van-button>-->
        </div>
        <!-- <van-button type="default" size="large">取消</van-button>
        <van-button type="danger" size="large" @click="$router.push('/bConfirmPlan')">确定</van-button>-->
      </div>
    </div>
    <!-- 下拉菜单 -->
    <van-action-sheet v-model="show" :actions="actions">
      <div class="content">
        <div class="head">
          <h3>赛事筛选</h3>
          <span>清空</span>
        </div>
        <div class="wrapper">
          <ul>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
            <li>西甲(8)</li>
          </ul>
        </div>
        <div class="senf">
          <h3>赔率筛选</h3>
        </div>
        <div class="bottom">
          <div class="radio">
            <van-checkbox v-model="checked">赔率小于:</van-checkbox>
            <input type="text" value="1.5" />
          </div>
          <div class="con">
            <div>
              <p>赔率筛选范围：</p>
            </div>
            <div>
              <p>足球 胜平负/让球胜平负</p>
              <p>篮球 胜负/让分胜负</p>
            </div>
          </div>
        </div>
        <div class="btn">
          <van-button type="default" size="large">取消</van-button>
          <van-button type="danger" size="large">确定</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "racefootball",
  components: {
    navBar
  },
  props: {},
  data() {
    return {
      value1: 4,
      option1: [
        { text: "胜负", value: 0 },
        { text: "让分胜负", value: 1 },
        { text: "胜分差", value: 2 },
        { text: "大小分", value: 3 },
        { text: "混合过关", value: 4 },
        { text: "单关", value: 5 }
      ],
      show: false,
      actions: [],
      checked: true,
      activeNames: ["1"],
      changeColor: false,
      list: [
        { score: "胜1.54" },
        { score: "胜1.53" },
        { score: "胜1.52" },
        { score: "胜1.50" }
      ],
      basketList: [],
      a: [],
      count: 0,
      flag: false
    };
  },
  computed: {},
  watch: {},
  updated() {},
  methods: {
    chek() {
      if (this.checked == true) {
        this.$store.state.boolBask = true;
      } else {
        this.$store.state.boolBask = false;
      }
    },
    confirm() {
      if (this.$store.state.basketSumcount >= 2) {
        this.$router.push("/bConfirmPlan");
      } else {
        this.$toast({
          message: "非单关至少选择两场比赛"
        });
      }
      if (this.$store.state.basketSumcount == 1) {
        var num = 0;
        var arr = this.$store.state.basketSelectResult;
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] != undefined && arr[i][j] != "") {
              num = i;
            }
          }
        }

        var arrs = arr[num].slice(6, 18);
        for (var i = 0; i < arrs.length; i++) {
          if (!arrs[i]) {
            arrs.splice(i, 1);
            i--;
          }
        }
        var arr1 = arr[num].slice(0, 6);
        for (var i = 0; i < arr1.length; i++) {
          if (!arr1[i]) {
            arr1.splice(i, 1);
            i--;
          }
        }
        for (let j = 0; j < 6; j++) {
          if (arr[num][j] != undefined && arr[num][j] != "") {
            this.flag = true;

            break;
          }
        }
        if (
          this.$store.state.basketResult[num].single == 0 &&
          arrs.length > 0
        ) {
          for (let j = 6; j < 18; j++) {
            if (arr[num][j] != undefined && arr[num][j] != "") {
              this.flag = true;

              break;
            }
          }
        }
        if (!this.flag) {
          if (
            arrs.length > 0 &&
            this.$store.state.basketResult[num].single == 1
          ) {
            this.flag = false;
          }
        }

        this.$store.state.bFlag = this.flag;

        if (!this.$store.state.bFlag) {
          this.$router.push("/bConfirmPlan");
          this.$toast({
            message: "进入单关模式"
          });
        }
        this.flag = false;
      }
    },
    del() {
      for (var i = 0; i < this.$store.state.basketSelectResult.length; i++) {
        for (
          let j = 0;
          j < this.$store.state.basketSelectResult[i].length;
          j++
        ) {
          this.$store.state.basketSelectResult[i][j] = "";
        }
      }
      this.$store.state.basketSumcount = 0;
      this.getList();
    },
    bgc(index) {
      if (this.coun(index) == "更多") {
        return "";
      } else {
        return "bgColor1";
      }
    },
    coun(index) {
      var arr = JSON.parse(
        JSON.stringify(this.$store.state.basketSelectResult[index])
      );
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
          arr.splice(i, 1);
          i--;
        }
      }

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == null) {
          arr.splice(i, 1);
          i--;
        }
      }
      if (arr.length == 0) {
        return "更多";
      }
      return "已选" + arr.length + "项";
    },
    alertMenu() {
      this.show = true;
    },
    addColor(i, i2) {
      if (
        this.$store.state.basketSelectResult[i][i2] == undefined ||
        this.$store.state.basketSelectResult[i][i2] == ""
      ) {
        return "";
      } else {
        return "bgColor";
      }
    },
    push(index, i, val) {
      if (
        this.$store.state.basketSelectResult[index][i] == undefined ||
        this.$store.state.basketSelectResult[index][i] == ""
      ) {
        this.$set(this.$store.state.basketSelectResult[index], i, val);
      } else {
        this.$set(this.$store.state.basketSelectResult[index], i, "");
      }
      var arr = JSON.parse(
        JSON.stringify(this.$store.state.basketSelectResult)
      );
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
          if (arr[i][j] == "" || arr[i][j] == undefined) {
            arr[i].splice(j, 1);
            j--;
          }
        }
      }

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].length == 0) {
          arr.splice(i, 1);
          i--;
        }
      }

      this.$store.state.basketSumcount = arr.length;
    },
    getList() {
      this.$SERVER
        .getBasketBallMatch({
          pagenum: 1,
          pagesize: 50
        })
        .then(res => {
          if (res.code == 200) {
            var arr = [];
            for (var i = 0; i < res.data.list.length; i++) {
              this.$store.state.basketSelectResult.push([]);
              this.$store.state.basketSelectValue.push([]);
            }
            res.data.list.forEach((e, i) => {
              var a;
              var b;
              var f;
              if (!e.basketBallBet.odds_list.mnl) {
                a = "";
                b = "";
              } else {
                a =
                  e.basketBallBet.odds_list.mnl[
                    e.basketBallBet.odds_list.mnl.length - 1
                  ].a;
                b =
                  e.basketBallBet.odds_list.mnl[
                    e.basketBallBet.odds_list.mnl.length - 1
                  ].h;
              }

              f =
                e.basketBallBet.odds_list.wnm[
                  e.basketBallBet.odds_list.wnm.length - 1
                ].single;

              arr[i] = {
                id: e.id,
                date: e.date,
                num: e.num,
                lcnAbbr: e.lcnAbbr,
                time: e.time,
                hcn: e.hcnAbbr,
                acn: e.acnAbbr,
                fen:
                  e.basketBallBet.odds_list.hdc[
                    e.basketBallBet.odds_list.hdc.length - 1
                  ].fixedodds,
                sum:
                  e.basketBallBet.odds_list.hilo[
                    e.basketBallBet.odds_list.hilo.length - 1
                  ].fixedodds,
                // goalline: e.basketBallBet.odds_list.hhad.goalline,
                single: f,
                basketBallBet: [
                  a,
                  b,
                  e.basketBallBet.odds_list.hdc[
                    e.basketBallBet.odds_list.hdc.length - 1
                  ].a,
                  e.basketBallBet.odds_list.hdc[
                    e.basketBallBet.odds_list.hdc.length - 1
                  ].h,
                  e.basketBallBet.odds_list.hilo[
                    e.basketBallBet.odds_list.hilo.length - 1
                  ].h,
                  e.basketBallBet.odds_list.hilo[
                    e.basketBallBet.odds_list.hilo.length - 1
                  ].l,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].l1,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].l2,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].l3,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].l4,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].l5,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].l6,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].w1,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].w2,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].w3,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].w4,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].w5,
                  e.basketBallBet.odds_list.wnm[
                    e.basketBallBet.odds_list.wnm.length - 1
                  ].w6
                ]
              };
            });
            this.$store.state.basketResult = arr;
          }
        });
    }
  },
  mounted() {},
  created() {
    this.getList();
    var arr = JSON.parse(JSON.stringify(this.$store.state.basketSelectResult));
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == "" || arr[i][j] == undefined) {
          arr[i].splice(j, 1);
          j--;
        }
      }
    }

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length == 0) {
        arr.splice(i, 1);
        i--;
      }
    }
    this.$store.state.basketSumcount = arr.length;
  }
};
</script>
<style lang="less" scoped>
.bor {
  border: 1px solid orange !important;
}
.bgColor1 {
  background-color: red;
  color: white !important;
  text-align: center !important;
  height: 1.24rem !important;
  line-height: 32px !important;
}
.main {
  padding-bottom: 120px;
}
// 修改vant ui内置样式
.menu {
  background: none;
  /deep/ .van-dropdown-menu__title {
    color: white;
  }
  /deep/ .van-dropdown-item__content {
    padding: 0 5px 5px 3px;
    margin: 0 auto;
    .van-cell {
      width: 31%;
      float: left;
      display: flex;
      justify-content: space-between;
      border: 1px solid #cccccc;
      text-align: center;
      padding: 0.2rem 0;
      margin-left: 5px;
      margin-top: 5px;
    }
  }
  /deep/ .van-cell__value {
    display: none;
  }
  /deep/ .van-dropdown-item__option--active {
    border: 1px solid red !important;
    color: red;
  }
}
.title {
  color: #4b4949;
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
  .fen {
    float: right;
    margin-right: 20px;
  }
}
.test {
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  .right {
    width: 80%;
    font-size: 14px;
    .div1 {
      display: flex;
      justify-content: space-around;
      padding-bottom: 15px;
      font-size: 14px;
      color: #4b4949;
      .name {
        display: inline-block;
        width: 111px;
      }
    }
    .tab {
      display: flex;
      .left1 {
        float: left;
        color: #4b4949;
        .p1 {
          span {
            display: inline-block;
            height: 30px;
            width: 70px;
            border: 1px solid #eeeeee;
            float: left;
            text-align: center;
            line-height: 30px;
          }
          .p1-first {
            width: 20px;
            background-color: rgb(204, 204, 204);
            color: white;
          }
        }
        .p2 {
          span {
            display: inline-block;
            height: 30px;
            width: 70px;
            border: 1px solid #eeeeee;
            float: left;
            text-align: center;
            line-height: 30px;
          }
          .p2-first {
            width: 20px;
            background-color: rgb(100, 160, 240);
            color: white;
          }
          .p2-red {
            width: 20px;
            background-color: #f00;
            color: white;
          }
          .p2-blue {
            width: 20px;
            background-color: green;
            color: white;
          }
        }
      }
      .center {
        font-size: 12px;
        width: 215px;
        ul {
          li {
            display: inline-block;
            height: 30px;
            width: 105px;
            border: 1px solid #eeeeee;
            float: left;
            text-align: center;
            line-height: 30px;
            color: #4b4949;
            & span:nth-child(2) {
              color: #777;
            }
          }
        }
      }
      .right1 {
        color: #4b4949;
        span {
          display: inline-block;
          height: 1.24rem;
          width: 0.62rem;
          border: 0.02rem solid #eeeeee;
          line-height: 1.24rem;
          font-size: 0.24rem;
          color: #777;
          text-align: center;
        }
      }
    }
  }
  .left {
    text-align: center;
    font-size: 12px;
    .first {
      padding-bottom: 20px;

      color: #4b4949;
    }
  }
}
.right .shai {
  display: inline-block;
  text-align: center;
  line-height: 20px;
  border: 1px solid #ffffff;
  background-color: #f24a44;
  color: #ffffff;
  width: 20px;
  height: 20px;
  font-size: 14px;
  border-radius: 5px;
}
.content {
  background-color: #eeeeee;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    h3 {
      font-size: 14px;
    }
    span {
      font-size: 14px;
      color: #f24a44;
    }
  }
  .wrapper {
    background-color: #fff;
    padding: 10px 5px;
    ul {
      display: flex;
      flex-flow: wrap;
      justify-content: space-around;
      li {
        display: inline-block;
        width: 100px;
        height: 35px;
        border: 1px solid #d6d6d6;
        text-align: center;
        line-height: 35px;
        margin-top: 10px;
      }
    }
  }
  .senf {
    padding: 8px 10px;
    h3 {
      font-size: 14px;
    }
  }
  .bottom {
    background-color: #fff;
    padding: 8px 10px;
    .radio {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 50%;
      input {
        display: inline-block;
        width: 50px;
        border: 1px solid #d6d6d6;
        border-radius: 3px;
      }
    }
    .con {
      width: 75%;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding-top: 10px;
      color: #4b4949;
    }
  }
  .btn {
    display: flex;
    justify-content: space-between;
  }
}
.bot-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #ccc;
  .check {
    width: 100%;
    background-color: #fff;
    text-align: center;
    padding: 8px 25%;

    /deep/ .van-checkbox__label {
      font-size: 14px;
      color: orange;
    }
  }
  .text {
    width: 100%;
    background-color: rgb(250, 235, 275);
    text-align: center;
    padding: 5px 0px;
    font-size: 14px;

    .pei {
      color: rgb(158, 150, 145);
      padding-top: 5px;
    }
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #4b4949;
    font-size: 13px;
    padding-bottom: 8px;

    .delete {
      text-align: center;
      p {
        color: #777;
      }
    }
  }
}
.bgColor {
  background-color: red;
  color: white !important;
  text-align: center !important;
}
</style>