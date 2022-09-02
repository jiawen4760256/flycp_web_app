import React, { useEffect,useState } from 'react'

import { Routes, Route,useLocation} from "react-router-dom";
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import {Mask,DotLoading} from 'antd-mobile'
import {useDispatch,useSelector } from 'react-redux';
import Login from './page/login';
import Home from './page/home';
import Register from './page/register';
import User from './page/user';
import UserInfo from './page/user/info';
import UserEdit from './page/user/edit';
import UserVip from './page/user/vip';
import Bank from './page/user/bank';
import BankAdd from './page/user/bank/add';
import Withdraw from './page/withdraw';
import WithdrawHistory from './page/withdraw/history';
import WithdrawInfo from './page/withdraw/info';
import Activity from './page/activity';
import ActivityInfo from './page/activity/info';
import Recharge from './page/recharge';
import Notice from './page/notice';
import NoticeInfo from './page/notice/info';
import Hall from './page/hall/k3';
import Record from './page/record';
import RecordInfo from './page/record/info';
import Open from './page/open';
import OpenHistory from './page/open/history';
import Fuddetail from './page/fuddetail';
import RechargeHistory from './page/recharge/history';
import UserPassword from './page/user/password';
import Message from './page/message';
import MessageAdd from './page/message/add';
import MessageInfo from './page/message/info';
import CheckCode from './page/check/code';
import CheckLine from './page/check/line';
import Proxy from './page/proxy';
import ProxyTim from './page/proxy/tim';
import ProxyMember from './page/proxy/member';
import ProxyDay from './page/proxy/day';
import Mall from './page/mall';
import {getLoading} from './store';
import "./App.css"
import "./style.css"
import "./font.css"
import Api from './lib/Api';
import Auth from './lib/Auth';
import {useNavigate} from 'react-router-dom'

import { setLoading,setMsgCount,setBalance,getMsgCount } from './store';	
let intervalApp:any = 0

function App() {
  const dispatch = useDispatch();
	const loading = useSelector(getLoading);
  
	const msgCount = useSelector(getMsgCount)
  const navigate = useNavigate()
  // console.log('loading',loading)
  useEffect(() => {
    Api.homeList({},dispatch)
  },[])
	const getPingInfo = function(){
		if(localStorage.getItem("token")){
			Auth.ajax(navigate,'user/ping')
			.then(function (response:any) {
				if(msgCount != response.message){
					dispatch(setMsgCount(response.message))
				}
				let userInfo:any = JSON.parse(localStorage.getItem("userInfo")??'{"balance":0.00}')
				userInfo.balance = response.balance
				dispatch(setBalance(response.balance))
				localStorage.setItem("userInfo", JSON.stringify(userInfo))
			})

		}
	}
  useEffect(() => {
		
		getPingInfo()
		if(!intervalApp){
			console.log('启动定时器')
			window.clearInterval(intervalApp)
			intervalApp = window.setInterval(() => {
				getPingInfo()
			}, 10000);
		}
  },[])
  let location = useLocation();
  return (
    <div>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="slide" timeout={300}>
          <Routes>
            <Route path="/"       element={<Home />} />
            <Route path="/login/:name"  element={<Login />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/user"  element={<User />} />
            <Route path="/user/info"  element={<UserInfo />} />
            <Route path="/user/edit"  element={<UserEdit />} />
            <Route path="/user/vip"  element={<UserVip />} />
            <Route path="/bank"  element={<Bank />} />
            <Route path="/bank/add"  element={<BankAdd />} />
            <Route path="/withdraw"  element={<Withdraw />} />
            <Route path="/withdraw/history"  element={<WithdrawHistory />} />
            <Route path="/withdraw/info/:id" element={<WithdrawInfo />} />
            <Route path="/activity"  element={<Activity />} />
            <Route path="/activity/info/:id"  element={<ActivityInfo />} />
            <Route path="/recharge"  element={<Recharge />} />
            <Route path="/notice"  element={<Notice />} />
            <Route path="/notice/info/:id"  element={<NoticeInfo />} />
            <Route path="/hall/k3/:name"  element={<Hall />} />
            <Route path="/record"  element={<Record />} />
            <Route path="/record/info/:id"  element={<RecordInfo />} />
            <Route path="/open"  element={<Open />} />
            <Route path="/fuddetail"  element={<Fuddetail />} />
            <Route path="/recharge/history"  element={<RechargeHistory />} />
            <Route path="/user/password"  element={<UserPassword />} />
            <Route path="/message"  element={<Message />} />
            <Route path="/message/add"  element={<MessageAdd />} />
            <Route path="/message/info/:id"  element={<MessageInfo />} />
            <Route path="/check/code"  element={<CheckCode />} />
            <Route path="/check/line"  element={<CheckLine />} />
            <Route path="/open/history/:name"  element={<OpenHistory />} />
            <Route path="/proxy"  element={<Proxy />} />
            <Route path="/proxy/tim"  element={<ProxyTim />} />
            <Route path="/proxy/member"  element={<ProxyMember />} />
            <Route path="/proxy/day"  element={<ProxyDay />} />
            <Route path="/mall/:type"  element={<Mall />} />
            
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      	
      <Mask visible={loading} className='App-loading'>
        <DotLoading  />
      </Mask>
    
    </div>
  )
}

export default App;
