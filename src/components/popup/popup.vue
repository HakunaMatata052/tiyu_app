<template>
  <div @touchmove="onTouchMove">
    <van-popup position="bottom" v-model="show" get-container="#shop">
      <div class="popup">
        <div class="head">
          <div>
            <span class="peo" v-if="list.userInfor">
              发单人：
              <span class="fa">{{list.userInfor.nickname || list.nickname}}</span>
            </span>
            <!-- <span class="com">红单一生一世</span> -->
          </div>
          <div>
            <!-- <span class="peo">投注方式</span>
            <span class="com">2串1</span>-->
          </div>
        </div>
        <div class="con">
          <div>
            <p class="money">{{list.buyWagers*list.times*2}}元</p>
            <p class="text">自购</p>
          </div>
          <div>
            <p class="money">{{list.buyWagers*2}}元</p>
            <p class="text">起跟金额</p>
          </div>
          <div>
            <p class="money">{{list.flowCount}}人</p>
            <p class="text">跟单人气</p>
          </div>
        </div>
        <div class="wrap">
          <div>
            <p class="mon">
              实付金额:
              <span>{{list.buyWagers*list.times*2*bei}}</span>
            </p>
            <p class="yong">
              佣金比例:
              <span>10%</span>
            </p>
          </div>
          <div>
            <div class="num">
              <p>投</p>
              <van-stepper v-model="bei" @change="onChange()" />
              <p>倍</p>
              <p />
            </div>
          </div>
        </div>
        <div class="btn">
          <van-button type="default" size="large" @click="quxiao()">取消</van-button>
          <van-button type="danger" @click="postFootBallFollowOrder()" size="large">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    //是否显示
  },
  created() {},
  watch: {},
  data() {
    return {
      // 传进来的值
      currentValue: false,
      show: false,
      list: {},
      bei: 10
    };
  },
  methods: {
    onTouchMove: function(event) {
      !this.scroll && event.preventDefault();
    },
    Onshow() {
      this.show = true;
    },
    onChange(value) {},
    quxiao() {
      this.show = false;
    },
    postFootBallFollowOrder() {
      if (this.list.type == 1) {
        this.$SERVER
          .footBallFollowOrder({
            userId: this.$store.state.userInfo.userId,
            id: this.list.id,
            times: this.bei * this.list.times
          })
          .then(res => {
            if (res.code == 200) {
              this.$toast.success(res.data);
            }
          })
          .catch(res => {
            this.$toast.fail(res.message);
          });
      }
      if (this.list.type == 2) {
        this.$SERVER
          .basketBallFollowOrder({
            userId: this.$store.state.userInfo.userId,
            id: this.list.id,
            times: this.bei * this.list.times
          })
          .then(res => {
            if (res.code == 200) {
              this.$toast.success(res.data);
            }
          })
          .catch(res => {
            this.$toast.fail("您未登录");
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/*遮罩层*/
.popup {
  .head {
    .peo {
      font-size: 14px;
      display: block;
      text-align: center;
      padding: 10px;
      .fa {
        color: #777;
      }
    }
    .com {
      font-size: 14px;
    }
  }
  .con {
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      width: 33%;
      text-align: center;
      border: 1px solid #eeeeee;
      border-top: none;
      padding: 5px 0;
      .money {
        font-size: 14px;
        color: #777;
      }
      .text {
        font-size: 12px;
        margin-top: 8px;
      }
    }
  }
  .wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 0;
    div {
      font-size: 14px;
      .yong {
        margin-top: 8px;
        span {
          color: #777;
        }
      }
      .mon {
        span {
          color: #f24a44;
        }
      }
    }
    .num {
      display: flex;
      align-items: center;
    }
  }
  .btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
