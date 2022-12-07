import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    homeList: {notice:"",list:[],img:[],kefu:"",checkCode:"",appUrl:[],about:[],website_logo2:'',website_logo3:'',website_name:'',website_hot:'',website_touzhu:'',language:[]},
    k3Wanfa: [],
    k3Touzhu: {},
    loading:false,
    msgCount:'',
    balance:"-",
    dictionary:{

      language_app_error:"服务繁忙，请稍后再试！",
      language_app_login_pls:"你尚未登陆！",

      language_app_home_login:"登录",
      language_app_home_notice:"公告",
      language_app_home_button_1:"热销商家",
      language_app_home_button_2:"本周特惠",
      language_app_home_button_3:"我的订单",
      language_app_home_button_4:"在线客服",
      language_app_home_type_1:"公益专区",
      language_app_home_type_2:"品牌专区",
      language_app_home_type_3:"海外专区",
      language_app_home_type_4:"直播专区",
      language_app_home_img_1:"",
      language_app_home_img_2:"",
      language_app_home_bat_1:"首页",
      language_app_home_bat_2:"商城",
      language_app_home_bat_3:"消息",
      language_app_home_bat_4:"个人中心",
      language_app_home_text_1:"精选好物",
      language_app_home_text_2:"活动专区",
      language_app_home_login_title:"欢迎登录使用",
      language_app_home_login_account:"账号",
      language_app_home_login_wpd:"密码",
      language_app_home_login_account_p:"请输入账号",
      language_app_home_login_wpd_p:"请输入密码",
      language_app_home_login_remember:"记住密码",
      language_app_home_login_login:"登录",
      language_app_home_login_register:"马上注册",
      language_app_home_login_issue:"有问题请联系",
      language_app_home_login_online:"在线客服",
      language_app_home_login_success:"登录成功",
      language_app_home_register_title:"欢迎注册使用",
      language_app_home_register_code:"邀请码",
      language_app_home_register_code_p:"请输入邀请码",
      language_app_home_register_account:"账号",
      language_app_home_register_account_p:"请输入账号",
      language_app_home_register_wpd:"密码",
      language_app_home_register_wpd_p:"请输入密码",
      language_app_home_register_wpd1:"确认密码",
      language_app_home_register_wpd1_p:"请输入确认密码",
      language_app_home_register_register:"创建账号",
      language_app_home_register_success:"创建成功",

      language_app_record_status_0:"全部订单",
      language_app_record_status_1:"匹配中",
      language_app_record_status_2:"已匹配",
      language_app_record_info_text_1:"订单状态",
      language_app_record_info_text_2:"奖励积分",
      language_app_record_info_text_3:"订单详情",
      language_app_record_info_text_4:"匹配结果",
      language_app_record_info_text_5:"订单时间",
      language_app_record_info_text_6:"订单积分",
      language_app_record_info_status_1:"奖励",
      language_app_record_info_status_2:"匹配中",
      language_app_record_info_status_3:"已匹配",
      language_app_record_info_status_4:"取消",

      language_app_message_status_0:"全部",
      language_app_message_status_1:"已读",
      language_app_message_status_2:"未读",
      language_app_message_status_3:"已发送",
      
      language_app_hall_stop:"暂停中，无法操作",
      language_app_hall_number_pls:"请选择号码！",
      language_app_hall_amount_pls:"请输入积分！",
      language_app_hall_confirm_1:"购单确认",
      language_app_hall_confirm_2:"购单活动",
      language_app_hall_confirm_3:"购单总额",
      language_app_hall_confirm_4:"购单内容",
      language_app_hall_success:"完成购单",
      language_app_hall_update:"当前单号已更新，请重新操作！",
      language_app_hall_alert_1:"距",
      language_app_hall_alert_2:"项目截至",
      language_app_hall_alert_3:"提交时请注意当前单号",
      language_app_hall_alert_4:"知道了",
      language_app_hall_result:"结果",
      language_app_hall_order:"单号",
      language_app_hall_select:"当前选择",
      language_app_hall_amount:"购票金额",
      language_app_hall_dollar:"元",
      language_app_hall_rand:"随机",
      language_app_hall_del:"删除",
      language_app_hall_total:"共",
      language_app_hall_item:"件",
      language_app_hall_balance:"余额",
      language_app_hall_submit:"立即购单",
      language_app_hall_match:"订单匹配",
      language_app_hall_record:"订单匹配",
      language_app_hall_history:"品牌记录",
      language_app_hall_double:"倍",

      language_app_user_account:"账号",
      language_app_user_amount:"积分",
      language_app_user_buy:"预购",
      language_app_user_exchange:"兑换",
      language_app_user_record:"购单记录",
      language_app_user_fuddetail:"积分明细",
      language_app_user_recharge:"预购记录",
      language_app_user_withdraw:"兑换记录",
      language_app_user_info:"个人信息",
      language_app_user_vip:"vip等级",
      language_app_user_bank:"银行卡管理",
      language_app_user_notice:"网站公告",
      language_app_user_password:"密码设置",
      language_app_user_message:"站内信",
      language_app_user_logout:"退 出 登 录",
      language_app_user_logout1:"您已退出登录",

      language_app_recharge_text:"请联系客服预购",

      language_app_withdraw_bank_pls:"请选择兑换银行卡",
      language_app_withdraw_amount_pls:"请输入兑换积分",
      language_app_withdraw_ok:"申请兑换成功！",
      language_app_withdraw_bank:"兑换银行",
      language_app_withdraw_user:"收款人",
      language_app_withdraw_user_pls:"请选择收款人",
      language_app_withdraw_number:"银行卡号",
      language_app_withdraw_number_pls:"请选择银行卡号",
      language_app_withdraw_amount:"兑换积分",
      language_app_withdraw_submit:"立即兑换",
      language_app_withdraw_info:"温馨提示",

      language_app_withdraw_history:"兑换记录",
      language_app_withdraw_history_state_1:"兑换成功",
      language_app_withdraw_history_state_2:"正在审核",
      language_app_withdraw_history_state_3:"兑换失败",

      
      language_app_withdraw_info_number:"兑换编号",
      language_app_withdraw_info_amount:"兑换金额",
      language_app_withdraw_info_state:"兑换状态",
      language_app_withdraw_info_state_1:"正在审核",
      language_app_withdraw_info_state_2:"兑换成功",
      language_app_withdraw_info_state_3:"兑换失败",
      language_app_withdraw_info_name:"银行卡姓名",
      language_app_withdraw_info_bank:"银行卡名称",
      language_app_withdraw_info_addr:"银行卡支行",
      language_app_withdraw_info_bank_number:"银行卡号",
      language_app_withdraw_info_time:"兑换时间",
      language_app_withdraw_info_info:"兑换详情",

      language_app_duddetail_type_0:"全部",
      language_app_duddetail_type_1:"收入",
      language_app_duddetail_type_2:"支出",

      language_app_userinfo_name:"真实姓名",
      language_app_userinfo_account:"会员账号",
      language_app_userinfo_nick:"昵称",
      language_app_userinfo_sex:"性别",
      language_app_userinfo_day:"生日",
      language_app_userinfo_qq:"联系QQ",
      language_app_userinfo_mobile:"手机号",
      language_app_userinfo_vip:"用户等级",

      language_app_vip_name:"等级名称",
      language_app_vip_total:"等级积分",

      language_app_bank_null:"暂未绑定银行卡，请点击右上角 ‘+’ 添加",
      language_app_bank_state_0:"正在审核",
      language_app_bank_state_2:"审核失败",
      language_app_bank_bank:"兑换银行",
      language_app_bank_name:"开户姓名",
      language_app_bank_number:"银行卡号",

      language_app_bankadd:"绑定银行卡",
      language_app_bankadd_pwd2:"确认资密",
      language_app_bankadd_pwd2_pls:"请输入确认资密",
      language_app_bankadd_bank_pls:"请输入选择兑换银行",
      language_app_bankadd_success:"绑定成功！",
      language_app_bankadd_subimt:"确认绑定",
      language_app_bankadd_bank:"兑换银行",
      language_app_bankadd_name:"开户姓名",
      language_app_bankadd_name_pls:"请输入开户姓名",
      language_app_bankadd_number:"卡号",
      language_app_bankadd_number_pls:"请输入卡号",
      language_app_bankadd_pwd:"资密",
      language_app_bankadd_pwd_pls:"请输入资密",
      language_app_bankadd_input_pls:"请输入银行名称",

      language_app_notice_title:"网站公告",

      language_app_userpassword_title:"密码设置",
      language_app_userpassword_pwd:"旧密码",
      language_app_userpassword_pwd_pls:"请输入原密码",
      language_app_userpassword_success:"修改成功",
      language_app_userpassword_login:"登录密码",
      language_app_userpassword_save:"保存修改",
      language_app_userpassword_pwd2:"新密码",
      language_app_userpassword_pwd2_pls:"请输入新密码",
      language_app_userpassword_pwd3:"确认密码",
      language_app_userpassword_pwd3_pls:"请输入确认密码",
      language_app_userpassword_a_title:"资金密码",

      language_app_useredit_title:"编辑信息",
      language_app_useredit_cancel:"取消",
      language_app_useredit_sex:"性别",
      language_app_useredit_sex_1:"保密",
      language_app_useredit_sex_2:"男",
      language_app_useredit_sex_3:"女",
      language_app_useredit_submit:"提交",
      language_app_useredit_face:"头像",
      language_app_useredit_nick:"昵称",
      language_app_useredit_nick_pls:"请输入昵称",
      language_app_useredit_null:"未选择",
      language_app_useredit_qq:"联系QQ",
      language_app_useredit_qq_pls:"请输入联系QQ",
      language_app_useredit_phone:"联系电话",
      language_app_useredit_phone_pls:"请输入联系电话",


      a:1
    },
  },
  reducers: {
    setHomeList: (state, action) => {
      state.homeList = action.payload
    },
    setKsWanfa: (state, action) => {
      state.k3Wanfa = action.payload
    },
    setKsTouzhu: (state, action) => {
      state.k3Touzhu = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setMsgCount: (state, action) => {
      state.msgCount = action.payload
    },
    setBalance: (state, action) => {
      state.balance = action.payload
    },
    setDictionary: (state, action) => {
      state.dictionary = action.payload
    },
  },
})

export const { setHomeList,setKsWanfa, setKsTouzhu,setLoading,setMsgCount,setBalance,setDictionary} = counterSlice.actions
export const getHomeList = (state:any) => state.counter.homeList
export const getK3Wanfa = (state:any) => state.counter.k3Wanfa
export const getk3Touzhu = (state:any) => state.counter.k3Touzhu
export const getLoading = (state:any) => state.counter.loading
export const getMsgCount = (state:any) => state.counter.msgCount
export const getBalance = (state:any) => state.counter.balance
export const getDictionary = (state:any) => state.counter.dictionary

export default counterSlice.reducer