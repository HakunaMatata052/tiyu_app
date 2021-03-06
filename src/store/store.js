import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    tabActiveIndex: 0, //当前一级导航
    systemType: "", //系统类型 ios/Android
    color: "#ffc21c", //全局颜色
    navAn: "slide-left",
    userInfo: {
      userid: "",
      nickname: "",
      mobile: "",
      sex: "",
      avatar: ""
    },
    isActive: false,
    isMember: false, //是否是会员
    position: {
      //默认定位
      lng: 34.222,
      lat: 108.222
    }, //用户定位
    qiniuaddr: "http://95youhe.com/", //七牛地址
    register: {
      newpassword: ""
    },
    message: null,
    recharge: null,
    qq: 10000,
    todos: [
      {
        id: 1,
        done: true,
        text: "我是码农"
      },

      {
        id: 2,
        done: false,
        text: "我是码农202号"
      },

      {
        id: 3,
        done: true,
        text: "我是码农202号"
      }
    ],
    //足球

    //当前比赛
    listData: {},
    //确认选中的比赛
    replayData: [],
    //比赛选中的索引
    activeData: [],
    //比赛选中的赔率

    arrData: [[], [], [], [], []],
    //倍数

    addData: [],
    otherData: [],
    sumData: [],
    //篮球

    bListData: {},
    bReplayData: [],
    bArrData: [[], [], [], []],
    bActiveData: [],
    bBetData: [],

    //足球
    value: 1,
    betArr: [],
    result: [],
    selectResult: [],
    selectValue: [],
    wagers: [],
    footId: [],
    sumcount: 0,
    money: 0,
    flag: false,
    gate: [],
    bool: true,
    arr: [],
    //蓝球
    basketResult: [],
    basketSelectResult: [],
    basketSelectValue: [],
    basketBetArr: [],
    basketWagers: [],
    basketFootId: [],
    basketValue: 1,
    basketSumcount: 0,
    basketMoney: 0,
    basketGate: [],
    sumMoney: 0,
    bFlag: false,
    boolBask: true
  },
  //方法
  mutations: {
    clickTotal(state) {
      state.qq++;
    },
    //存值
    setValue(state, xxx) {
      state.listData = xxx;
      console.log(state.listData);
      // this.$router.push({
      //   path: "/allplay"
      // });
    }
  },
  actions: {},
  //计算属性
  getters: {
    getToDo(state) {
      return state.todos.filter(item => item.done === true);
      // filter 迭代过滤器 将每个item的值 item.done == true 挑出来， 返回的是一个数组
    }
  }
});
