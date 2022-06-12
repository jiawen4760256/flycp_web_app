import React, { useState, useEffect } from 'react'
import { NavBar,Swiper,Button,NoticeBar,Grid,Image,Tabs,TabBar,Divider} from 'antd-mobile'
import { 
	AlipaySquareFill,
	EditSFill,
	HeartFill,
	MessageFill,
	FireFill,
	AppstoreOutline,
	ReceivePaymentOutline,
	ContentOutline,
	MessageOutline,
	UserOutline,
	CheckShieldFill,
	SoundOutline,
	RightOutline,
	GiftOutline
} from 'antd-mobile-icons'

import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
  getHomeList,getMsgCount
} from '../../store';
import "./index.css"
import Auth from '../../lib/Auth';
import Check from '../../lib/Check'
import About from '../about'
import { setLoading,setMsgCount } from '../../store';		
import {useDispatch } from 'react-redux';
let interval:any = 0
export default () => {
	const {notice,img,list,kefu} = useSelector(getHomeList);
	const msgCount = useSelector(getMsgCount)
	const dispatch = useDispatch()
  const navigate = useNavigate()
	Check(navigate)
	console.log('msgCount',msgCount)
	// const onNavigate=(path:string)=>{
	// 	if(localStorage.getItem("token")){
	// 		navigate(path)
	// 	}else{
	// 		navigate('/login')
	// 	}
	// }
	const items = img.map((imgUrl:string, index:any) => (
		<Swiper.Item key={index}>
			<Image className={"img-content"} lazy src={imgUrl} />
		</Swiper.Item>
	))
	const hotImg = (<Image lazy src="/app/hot.gif" width={15} fit='none' />)
	// const gameList = list.map((game:any, index:any) => (
	// 	<Badge content={hotImg} className='home-hot' style={{'--right':'20px','--top':'15px'}} key={index}>
	// 		<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
	// 				<div style={{margin:"10px",textAlign:"center"}}>
	// 					<Image className={"img-list"} lazy src={game.img} />
	// 					<div className='home-game-name'>{game.title}</div>
	// 				</div>

	// 		</Grid.Item>
	// 	</Badge>
	// ))
	const gameList = list.map((game:any, index:any) => (
		<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
			<Image  src={game.img} />
		</Grid.Item>
	))
	useEffect(() => {
		if(list.length == 0){
			dispatch(setLoading(true))
		}else{
			dispatch(setLoading(false))
		}
  },[list])
	// const gameList2 = list.map((game:any, index:any) => (
	// 	<Grid.Item key={index} onClick={()=>{navigate("/hall/k3/"+game.name)}}>
	// 		<div style={{margin:"10px",textAlign:"center"}}>
	// 			<Image className={"img-list"} lazy src={game.img} />
	// 			<div className='home-game-name'>{game.title}</div>
	// 		</div>

	// 	</Grid.Item>
	// ))
	const getPingInfo = function(){
		if(localStorage.getItem("token")){
			Auth.ajax(navigate,'user/ping')
			.then(function (response:any) {
				if(msgCount != response.message){
					dispatch(setMsgCount(response.message))
				}
				let userInfo:any = JSON.parse(localStorage.getItem("userInfo")??'{"balance":0.00}')
				userInfo.balance = response.balance
				localStorage.setItem("userInfo", JSON.stringify(userInfo))
			})

		}
	}
  useEffect(() => {
		
		getPingInfo()
		if(!interval){
			console.log('启动定时器')
			window.clearInterval(interval)
			interval = window.setInterval(() => {
				getPingInfo()
			}, 10000);
		}
  },[])
	let right = (
		<div 
			onClick={() => {
				navigate("/login/null");
			}} 
			style={{ fontSize: 16,marginRight:"10px" }}
		>
			登录
			
		</div>
	)
	let left = (
		<>
		<Button size='mini' color='primary' style={{"--border-color":"#eee",'--text-color':"#fff"}} fill='outline' onClick={() => {
				navigate("/login/null");
			}}  >
			登录
		</Button>
		&nbsp;&nbsp;
		<Button size='mini' color='primary' style={{"--border-color":"#eee",'--text-color':"#fff"}} fill='outline' onClick={() => {
				navigate("/register");
			}}   >
			注册
		</Button>
		</>
		
	)
	if(localStorage.getItem("token")){
		right = (<></>)
		// left = (<><UserOutline style={{fontSize:"20px"}} /></>)
		left = (<></>)
	}
	const tabs = [
    {
      key: '/',
      title: '项目大厅',
      icon: <AppstoreOutline />,
    },
    {
      key: '/withdraw',
      title: '兑换',
      icon: <ReceivePaymentOutline />,
    },
    {
      key: '/open',
      title: '历史记录',
      icon: <ContentOutline />,
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
			badge: msgCount,
    },
    {
      key: '/user',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ]

	return (
		<div className='App-main'>
			<header className={"App-header"}  >
				<NavBar backArrow={false} left={<Image className='home-logo' fit='contain' src={'/app/logo.png'} />} right={left}>
					<div style={{ fontSize: 20 }}></div>
				</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95}}>
				<div className='img-content'>
					<Swiper autoplay loop >{items}</Swiper>
				</div>
				<div onClick={()=>{Auth.navigate(navigate,"/notice")}}>
					<NoticeBar 
						icon={<div style={{ fontSize: 14}}><SoundOutline  /> 公告：</div>} style={{ fontSize: 14,'--height':'32px'}} 
						content={notice} 
						extra={<RightOutline />}
						color='alert' />
				</div>
				<div className='home-game-body'>
					<div style={{overflow:"hidden"}}>
						<div className='home-game-left'>
							<><FireFill />&nbsp;热门项目</>
						</div>
						<div className='home-game-right' onClick={()=>{window.location.href = kefu}}>
							<><MessageFill className='home-game-righ-icon' /> 在线客服</>
						</div>
						<div className='home-game-right'>
							<><Divider direction='vertical' style={{borderLeft:"1px solid #777"}} /></>
						</div>
						
						<div className='home-game-right' onClick={()=>{Auth.navigate(navigate,"/activity")}}>
							<><GiftOutline  className='home-game-righ-icon' /> 公益活动</>
						</div>
					</div>
					<Grid columns={2} gap={10} style={{marginTop:10}}>
						{gameList}
					</Grid>
					<About/>
				</div>
			</div>
			<div className='App-footer'>
				<TabBar 			
					onChange={(key: string) => {
						Auth.navigate(navigate,key);
					}}  
				>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge} />
          ))}
        </TabBar>
			</div>
		</div>
	)
}

