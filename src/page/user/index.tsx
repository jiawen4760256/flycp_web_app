import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,List,Avatar,Space,Grid,Tag } from 'antd-mobile'
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
	CloseCircleOutline,
	BankcardOutline,
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
	const demoSrc = '/app/vip.png';
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
				<div className='user-info' >
					<Avatar src={userData['face']} className='user-img' style={{ borderRadius: "50%",'--size': '60px'}} onClick={()=>{navigate("/user/edit")}} />
          <div className='user-account'>
						<div className='user-name'>
							{userData['username']}&nbsp;
							{/* <Tag color='#fff' fill='outline'>
								{userData['jinjijilu']}
							</Tag>	 */}
						</div>
						<div className='user-balance'>余额：{userData['balance']}</div>
						{/* <div className='user-balance'><BankcardOutline style={{fontSize:"20px"}} />  余额：{userData['balance']}</div> */}
					</div>
          <div className='user-vip'>
						<Image width={30} height={30} src={demoSrc} className='user-vip-img'/>
						<div className='user-vip-txt'>{userData['jinjijilu']}</div>
					</div>
        </div>
				{/* <List className='user-info'>
					<List.Item
						style={{background: "#e53333",color: "#fff"}} 
						prefix={<Avatar src={userData['face']} style={{ borderRadius: "50%",'--size': '60px', margin:"15px 0",border: "solid #fff"}} onClick={()=>{navigate("/user/edit")}} />}
					>
						<div className='user-name'>账号：{userData['username']}</div>
						<div className='user-name'>余额：{userData['balance']}</div>
					</List.Item>
				</List> */}
				
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
						<List.Item prefix={<Image fit='contain' src='/app/record.png' />} onClick={()=>{Auth.navigate(navigate,"/record")}}>
							项目记录
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/fuddetail.png' />} onClick={() => {Auth.navigate(navigate,"/fuddetail")}}>
							账单明细
						</List.Item>
						{/* <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
							个人报表
						</List.Item> */}
						<List.Item prefix={<Image fit='contain' src='/app/recharge.png' />} onClick={() => {Auth.navigate(navigate,"/recharge/history")}}>
							充值记录
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/withdraw.png' />} onClick={() => {Auth.navigate(navigate,"/withdraw/history")}}>
							兑换记录
						</List.Item>
					</List>
				</div>
				<div className='user-button-list'>
					<List header=''>
						<List.Item prefix={<Image fit='contain' src='/app/info.png' />} onClick={() => {Auth.navigate(navigate,"/user/info")}}>
							个人信息
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/bank.png' />} onClick={() => {Auth.navigate(navigate,"/bank")}}>
							银行卡管理
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/notice.png' />} onClick={() => {Auth.navigate(navigate,"/notice")}}>
							网站公告
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/password.png' />} onClick={() => {Auth.navigate(navigate,"/user/password")}}>
							密码设置
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/message.png' />} onClick={() => {Auth.navigate(navigate,"/message")}}>
							站内信
						</List.Item>
					</List>
				</div>
				<div className='user-button-list user-button-logout'>
					
					<Button block shape='rounded' color='primary' onClick={logout}>
						
						<Space>
							{/* <CloseCircleOutline /> */}
							<span>退 出 登 录</span>
						</Space>
					</Button>
				</div>
			</div>
		</div>
	)
}