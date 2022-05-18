import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,List,Avatar,Space,Grid,Divider } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import { 
	HandPayCircleOutline,
	GiftOutline,
	FileOutline,
	ContentOutline,
	ReceiptOutline,
	UnorderedListOutline,
	PayCircleOutline,
	UserOutline,
	TagOutline,
	GlobalOutline,
	UnlockOutline,
	MailOpenOutline,
} from 'antd-mobile-icons'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'

export default () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	const [userData, setUserData] = useState<any>("")
  const back = () =>{
		navigate(-1);
	}
	const userinfo = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'user/info')
		.then(function (response) {
			dispatch(setLoading(false))
			setUserData(response);
			localStorage.setItem("userInfo", JSON.stringify(response))
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	
	const logout = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'user/logout')
		.then(function (response) {
			dispatch(setLoading(false))
			Toast.show({
				icon: 'success',
				content: '您已退出登录',
			})
			localStorage.removeItem("userInfo")
			localStorage.removeItem("token")
			navigate(-1);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	useEffect(() => {
		userinfo()
  },[])


	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header' onBack={back}>个人中心</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				<List className='user-info'>
					<List.Item
						style={{background: "#e53333",color: "#fff"}} 
						prefix={<Avatar src={userData['face']} style={{ borderRadius: "50%",'--size': '60px', margin:"15px 0",border: "solid #fff"}} onClick={()=>{navigate("/user/edit")}} />}
					>
						<div className='user-name'>账号：{userData['username']}</div>
						<div className='user-name'>余额：{userData['balance']}</div>
					</List.Item>
				</List>
				
				<div>
					<Grid columns={2} gap={8} className="user-button">
						<Grid.Item onClick={()=>{Auth.navigate(navigate,"/recharge")}} className='user-button-left'>
							<Space wrap align='center'>
								<HandPayCircleOutline className='user-button-icon' />
								支付
							</Space>
						</Grid.Item>
						<Grid.Item onClick={()=>{Auth.navigate(navigate,"/withdraw")}}>
							<Space wrap align='center'>
								<GiftOutline className='user-button-icon' />
								兑换
							</Space>
						</Grid.Item>
					</Grid>
				</div>
				<div className='user-button-list'>
					<List header=''>
						<List.Item prefix={<FileOutline />} onClick={()=>{Auth.navigate(navigate,"/record")}}>
							任务记录
						</List.Item>
						<List.Item prefix={<ContentOutline />} onClick={() => {Auth.navigate(navigate,"/fuddetail")}}>
							账单明细
						</List.Item>
						{/* <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
							个人报表
						</List.Item> */}
						<List.Item prefix={<ReceiptOutline />} onClick={() => {Auth.navigate(navigate,"/recharge/history")}}>
							充值记录
						</List.Item>
						<List.Item prefix={<PayCircleOutline />} onClick={() => {Auth.navigate(navigate,"/withdraw/history")}}>
							兑换记录
						</List.Item>
					</List>
				</div>
				<div className='user-button-list'>
					<List header=''>
						<List.Item prefix={<UserOutline />} onClick={() => {Auth.navigate(navigate,"/user/info")}}>
							个人信息
						</List.Item>
						<List.Item prefix={<TagOutline />} onClick={() => {Auth.navigate(navigate,"/bank")}}>
							银行卡管理
						</List.Item>
						<List.Item prefix={<GlobalOutline />} onClick={() => {Auth.navigate(navigate,"/notice")}}>
							网站公告
						</List.Item>
						<List.Item prefix={<UnlockOutline />} onClick={() => {Auth.navigate(navigate,"/user/password")}}>
							密码设置
						</List.Item>
						<List.Item prefix={<MailOpenOutline />} onClick={() => {Auth.navigate(navigate,"/message")}}>
							站内信
						</List.Item>
					</List>
				</div>
				<div className='user-button-list user-button-logout'>
					<List>
						<List.Item onClick={logout}>退出登录</List.Item>
					</List>
				</div>
			</div>
		</div>
	)
}