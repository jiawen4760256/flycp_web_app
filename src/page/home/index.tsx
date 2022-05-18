import React, { useState, useEffect } from 'react'
import { NavBar,Swiper,Badge,NoticeBar,Grid,Image,Tabs,TabBar} from 'antd-mobile'
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
	CheckShieldFill
} from 'antd-mobile-icons'

import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
  getHomeList,
} from '../../store';
import "./index.css"
import Auth from '../../lib/Auth';
import Check from '../../lib/Check'
import { setLoading } from '../../store';		
import {useDispatch } from 'react-redux';
let interval:any = 0
export default () => {
	const {notice,img,list,kefu} = useSelector(getHomeList);
	const [pingInfo, setPingInfo] = useState<any>({})
	const dispatch = useDispatch()
  const navigate = useNavigate()
	Check(navigate)
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
	const gameList = list.map((game:any, index:any) => (
		<Badge content={hotImg} className='home-hot' style={{'--right':'20px','--top':'15px'}} key={index}>
			<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
					<div style={{margin:"10px",textAlign:"center"}}>
						<Image className={"img-list"} lazy src={game.img} />
						<div className='home-game-name'>{game.title}</div>
					</div>

			</Grid.Item>
			</Badge>
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
				setPingInfo(response);
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
		<div 
			onClick={() => {
				navigate("/register");
			}} style={{ fontSize: 16 }}
		>
			注册
		</div>
	)
	if(localStorage.getItem("token")){
		right = (<></>)
		left = (<></>)
	}
	const tabs = [
    {
      key: '/',
      title: '任务大厅',
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
			badge: pingInfo.message,
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
				<NavBar backArrow={false} right={right} left={left}>
					<div style={{ fontSize: 20 }}>彩虹公益社</div>
				</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95}}>
			
				<div className='img-content'>
					<Swiper autoplay loop >{items}</Swiper>
				</div>
				<div onClick={()=>{Auth.navigate(navigate,"/notice")}}>
					<NoticeBar style={{ fontSize: 14,'--height':'32px'}} content={notice} color='alert' />
				</div>
				< >
					<Grid columns={4} gap={2} >
						<Grid.Item className={"button-list"} onClick={()=>{Auth.navigate(navigate,"/withdraw")}}>
							<CheckShieldFill  className={"button"} style={{color:"#ff6700"}}/>
							<div className={"button-txt"}>兑换</div>
						</Grid.Item>
						<Grid.Item className={"button-list"} onClick={()=>{Auth.navigate(navigate,"/record")}}>
							<EditSFill className={"button"} style={{color:"#5abec3"}} />
							<div className={"button-txt"}>任务记录</div>
						</Grid.Item>
						<Grid.Item className={"button-list"} onClick={()=>{Auth.navigate(navigate,"/activity")}}> 
							<HeartFill className={"button"} style={{color:"#ff0000"}}/>
							<div className={"button-txt"}>公益活动</div>
						</Grid.Item>
						<Grid.Item className={"button-list"} onClick={()=>{window.location.href = kefu}}>
							<MessageFill className={"button"} style={{color:"#005aff"}}/>
							<div className={"button-txt"}>在线客服</div>
						</Grid.Item>
					</Grid>
				</>
				<div>
					<Tabs>
						<Tabs.Tab style={{ fontSize: 16 }} title={<><FireFill />&nbsp;热门任务</>} key='1'>
							<div style={{background: "#fff",paddingTop:12}}>
								<Grid columns={3} gap={8}>
									{gameList}
								</Grid>
							</div>
						</Tabs.Tab>
						<Tabs.Tab style={{ fontSize: 16 }} title={<><AppstoreOutline />&nbsp;任务大厅</>} key='2'>
							<div style={{background: "#fff",paddingTop:12}}>
								<Grid columns={3} gap={8}>
									{gameList}
								</Grid>
							</div>
						</Tabs.Tab>
					</Tabs>
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

