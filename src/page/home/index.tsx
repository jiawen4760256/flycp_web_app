import React, { useState, useEffect } from 'react'
import { NavBar,Swiper,Button,NoticeBar,Grid,Image,Tabs,TabBar,Badge,Divider} from 'antd-mobile'
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
	ShopbagOutline,
	GiftOutline,
	MovieOutline
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
import { setLoading,setMsgCount,setBalance } from '../../store';		
import {useDispatch } from 'react-redux';
let interval:any = 0
export default () => {
	const {notice,img,list,kefu,website_logo2,website_hot} = useSelector(getHomeList);
	const msgCount = useSelector(getMsgCount)
	const dispatch = useDispatch()
  const navigate = useNavigate()
	// console.log('msgCount',msgCount)
	// const onNavigate=(path:string)=>{
	// 	if(localStorage.getItem("token")){
	// 		navigate(path)
	// 	}else{
	// 		navigate('/login')
	// 	}
	// }
	
const title = 'CGS中国巨幕'
const content = '      CGS 中国巨幕是国际领先的高端巨幕品牌之一，拥有卓越的沉浸式观影体验解决方案。 CGS 中国巨幕系统拥有自主知识产权，以超大银幕、沉浸式多维还音系统和量身定制的影厅结构为观众提供观影体验。'

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
	const gameList1 = list.map((game:any, index:any) =>{
		if(index < 8){
			return (
				<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
					<div className='sc-itme'>
						<div className='sc-itme-img'>
							<div className='sc-badge'>
								<Badge content={website_hot==''?<></>:<Image src={website_hot} />} style={{
									'--right': '-25px','--top': '-20px',"--color":"none",width:30}}>
									<Image  src={game.img} />
								</Badge>
							</div>
						</div>
						<div className='sc-itme-title'>{game.title}</div>
						<div className='sc-itme-desc'>{game.desc}</div>
					</div>
				</Grid.Item>
			)
		}
	} )
	// console.log(website_hot)
	const gameList2 = list.map((game:any, index:any) =>{
		if(index>7){
			return (
				<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
					<div className='sc-itme'>
						<div className='sc-itme-img'>
							<div className='sc-badge'>
								<Badge content={website_hot==''?<></>:<Image src={website_hot} />} style={{
									'--right': '-25px','--top': '-20px',"--color":"none",width:30}}>
									<Image  src={game.img} />
								</Badge>
							</div>
						</div>
						<div className='sc-itme-title'>{game.title}</div>
						<div className='sc-itme-desc'>{game.desc}</div>
					</div>
				</Grid.Item>
			)
		}
	} )
	useEffect(() => {
		Check(navigate)
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
				dispatch(setBalance(response.balance))
				localStorage.setItem("userInfo", JSON.stringify(userInfo))
			})

		}
	}
  // useEffect(() => {
		
	// 	getPingInfo()
	// 	if(!interval){
	// 		console.log('启动定时器')
	// 		window.clearInterval(interval)
	// 		interval = window.setInterval(() => {
	// 			getPingInfo()
	// 		}, 10000);
	// 	}
  // },[])
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
			title: '首页',
			icon: <Image className='sc-m-img' src="/assets/m1.png" />,
		},
		// {
		//   key: '/withdraw',
		//   title: '兑换',
		//   icon: <ReceivePaymentOutline />,
		// },
		// {
		//   key: '/open',
		//   title: '历史记录',
		//   icon: <ContentOutline />,
		// },
		{
			key: '/mall/0',
			title: '购票中心',
			icon: <Image className='sc-m-img' src="/assets/m2.png" />,
		},
		{
			key: '/message',
			title: '消息',
			icon: <Image className='sc-m-img' src="/assets/m3.png" />,
			badge: msgCount,
		},
		{
			key: '/user',
			title: '个人中心',
			icon: <Image className='sc-m-img' src="/assets/m4.png" />,
		},
	]

	return (
		<div className='App-main'>
			<header className={"App-header"}  >
				<NavBar style={{
					'--height': '45px',
					background:'url(/assets/navBg.png) no-repeat 100% 100%'
				}} backArrow={false} left={website_logo2==''?<></>:<Image className='home-logo' fit='contain' src={website_logo2} />} right={left}>
					<div style={{ fontSize: 20 }}></div>
				</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95}}>
				<div className='img-content'>
					<Swiper autoplay loop indicatorProps={{
						style: {'--active-dot-color':'#ff0080','--dot-color':'#fff','--dot-border-radius':'50px','--dot-size':'8px','--active-dot-size':'8px'},
					}}>{items}</Swiper>
				</div>
					<div className='home-menu'>
						<Grid className='menu' columns={4} gap={0} style={{marginBottom:20}}>
							<Grid.Item className='sc-button'  onClick={()=>{navigate("/mall/0")}}>
								<Image className='sc-button-img' src="/assets/1.png" />
								<div>热门影区</div>
							</Grid.Item>
							<Grid.Item className='sc-button' onClick={()=>{Auth.navigate(navigate,"/activity")}}>
								<Image className='sc-button-img' src="/assets/2.png" />
								<div>本周特惠</div>
							</Grid.Item>
							<Grid.Item className='sc-button' onClick={()=>{Auth.navigate(navigate,"/record")}}>
								<Image className='sc-button-img' src="/assets/3.png" />
								<div>参加场次</div>
							</Grid.Item>
							<Grid.Item className='sc-button' onClick={()=>{window.location.href = kefu}}>
								<Image className='sc-button-img' src="/assets/4.png" />
								<div>在线客服</div>
							</Grid.Item>
						</Grid>
						<div style={{paddingLeft:20,paddingRight:20}} onClick={()=>{Auth.navigate(navigate,"/notice")}}>
							<NoticeBar
								icon={<div style={{width:'15px'}}><Image  src="/assets/icon.png" /></div>} style={{
								border:'unset',



								fontSize: 14,'--height':'32px','--background-color':'transparent'}}
								content={notice}  />
						</div>

					</div>


				<div className='home-game-body'>
					<Image className='sc-youhui' src="/assets/prev.png" />
					<div className='home-list' >
					<Grid columns={2} gap={5} className='sc-type-list' >
						<Grid.Item className='sc-type'  onClick={()=>{navigate("/mall/1")}}>
							<div className='sc-type-name' style={{ backgroundImage: 'url("/assets/bgBtnItem.png")'}}>
								<Image className='sc-hot' src="/assets/hot.png" />
								<div className='title'>电影专区</div>
								<Image className='sc-img' src="/assets/a1.png" />

							</div>
						</Grid.Item>
						<Grid.Item className='sc-type'   onClick={()=>{navigate("/mall/2")}}>
							<div className='sc-type-name' style={{ backgroundImage: 'url("/assets/bgBtnItem.png")'}}>
								<Image className='sc-hot' src="/assets/hot.png" />
								<div className='title'>线上影视</div>

								<Image className='sc-img' src="/assets/a2.png" />

							</div>
						</Grid.Item>
						<Grid.Item className='sc-type'   onClick={()=>{navigate("/mall/3")}}>
							<div className='sc-type-name' style={{ backgroundImage: 'url("/assets/bgBtnItem.png")'}}>
								<Image className='sc-hot' src="/assets/hot.png" />
								<div className='title'>腾讯视频</div>

								<Image className='sc-img' src="/assets/a3.png" />

							</div>
						</Grid.Item>
						<Grid.Item className='sc-type'  onClick={()=>{navigate("/mall/4")}}>
							<div className='sc-type-name' style={{ backgroundImage: 'url("/assets/bgBtnItem.png")'}}>
								<Image className='sc-hot' src="/assets/hot.png" />
								<div className='title'>直播专区</div>

								<Image className='sc-img' src="/assets/a4.png" />

							</div>
						</Grid.Item>
					</Grid>
					
					<div className='sc-prev' style={{backgroundImage:'url(/assets/prev2.png)'}} onClick={()=>{navigate("/mall/0")}} >
								<div className='title' style={{paddingTop:(content.length > 70)? 15:10}}>{title}</div>
								<div className='content' style={{paddingTop:(content.length > 70)? 60:50}}>{content}</div>
								</div>

					{/* <br/> */}
					{/* <Image className='sc-jxhw'  src="/sc/jxhw.png" /> */}
						<Divider className='dy-type' style={{padding:0}}>热门影区</Divider>
					<Grid columns={2} gap={10} style={{marginTop:10,padding:"0 5px"}}>
						{gameList1}
					</Grid>
					</div>

					{/* <Image className='sc-jxhw'  src="/sc/hdzq.png" /> */}

					<Divider className='dy-type'>正在热映</Divider>
					<Grid columns={2} gap={10} style={{marginTop:10,padding:"0 5px"}}>
						{gameList2}
					</Grid>
				</div>
			</div>
			<div className='App-footer'>
				<TabBar 			
					onChange={(key: string) => {
						if(key == '/'){
							return
						}
						if(key == '/kefu'){
							window.location.href = kefu
						}else{
							Auth.navigate(navigate,key);
						}
					}}  
				>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge} />
            // <TabBar.Item key={item.key} icon={item.icon} title={item.title}  />
          ))}
        </TabBar>
			</div>
		</div>
	)
}

