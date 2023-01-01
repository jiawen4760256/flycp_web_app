import React, { useState, useEffect } from 'react'
import { NavBar,Swiper,Button,NoticeBar,Grid,Image,Tabs,TabBar,Badge,Divider,Popup,Dialog} from 'antd-mobile'
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
	MovieOutline,
	GlobalOutline,
	DownOutline
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
import { setLoading,setMsgCount,setBalance,getDictionary } from '../../store';		
import {useDispatch } from 'react-redux';
let interval:any = 0
export default () => {
	const {notice,img,list,kefu,website_logo2,website_hot,language,website_app_img_1,website_app_img_2,languageNow} = useSelector(getHomeList);
	const {
		language_app_home_login,
		language_app_home_notice,
		language_app_home_button_1,
		language_app_home_button_2,
		language_app_home_button_3,
		language_app_home_button_4,
		language_app_home_type_1,
		language_app_home_type_2,
		language_app_home_type_3,
		language_app_home_type_4,
		language_app_home_img_1,
		language_app_home_img_2,
		language_app_home_bat_1,
		language_app_home_bat_2,
		language_app_home_bat_3,
		language_app_home_bat_4,
		language_app_home_text_1,
		language_app_home_text_2,
		language_app_home_login_pls_1,
		language_app_home_login_pls_2,
		language_app_home_login_pls_3,
	} = useSelector(getDictionary);
	
	const msgCount = useSelector(getMsgCount)
	const dispatch = useDispatch()
  const navigate = useNavigate()
	
	const [visiblePopup, setVisiblePopup] = useState(false)
	// console.log('msgCount',msgCount)
	// const onNavigate=(path:string)=>{
	// 	if(localStorage.getItem("token")){
	// 		navigate(path)
	// 	}else{
	// 		navigate('/login')
	// 	}
	// }

	const checkLogin=()=>{
		if(localStorage.getItem("token")){
			return true;
		}else{
			Dialog.alert({
				content: <div className='check-login'>
					<h3>{language_app_home_login_pls_1}</h3>
					<div>{language_app_home_login_pls_2}</div>
				</div>,
				confirmText:<>{language_app_home_login_pls_3}</>,
				onConfirm: () => {
					// console.log('Confirmed')
				},
			})
		}
	}
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
				<Grid.Item  onClick={()=>{if(checkLogin())navigate("/hall/k3/"+game.name)}}>
					<div className='sc-itme'>
						<div className='sc-itme-img'>
							<div className='sc-badge'>
								<Badge content={website_hot==''?<></>:<Image src={website_hot} />} bordered style={{"--color":"none"}}>
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
				<Grid.Item  onClick={()=>{if(checkLogin())navigate("/hall/k3/"+game.name)}}>
					<div className='sc-itme'>
						<div className='sc-itme-img'>
							<div className='sc-badge'>
								<Badge content={website_hot==''?<></>:<Image src={website_hot} />} bordered style={{"--color":"none"}}>
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
			{language_app_home_login}
		</Button>
		&nbsp;&nbsp;
		{/* <Button size='mini' color='primary' style={{"--border-color":"#eee",'--text-color':"#fff"}} fill='outline' onClick={() => {
				navigate("/register");
			}}   >
			注册
		</Button> */}
		<Button size='mini' color='primary' style={{"--border-color":"#eee",'--text-color':"#fff"}} fill='outline' onClick={() => {
				// navigate("/register");
				setVisiblePopup(true)
			}}>
			{languageNow}<DownOutline />
		</Button>
		</>
		
	)
	if(localStorage.getItem("token")){
		right = (<></>)
		// left = (<><UserOutline style={{fontSize:"20px"}} /></>)
		left = (<>
			<Button size='mini' color='primary' style={{"--border-color":"#eee",'--text-color':"#fff"}} fill='outline' onClick={() => {
					// navigate("/register");
					setVisiblePopup(true)
				}}>
				{languageNow}<DownOutline />
			</Button></>)
	}
	const tabs = [
    {
      key: '/',
      title: language_app_home_bat_1,
      icon: <AppstoreOutline />,
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
      title: language_app_home_bat_2,
      icon: <ShopbagOutline />,
    },
    {
			key: '/message',
      title: language_app_home_bat_3,
      icon: <MessageOutline />,
			badge: msgCount,
    },
    {
      key: '/user',
      title: language_app_home_bat_4,
      icon: <UserOutline />,
    },
  ]
	const onSelectLanguage = (language:string)=>{
		localStorage.setItem('language',language)
		window.location.reload();
	}
	return (
		<div className='App-main'>
			<header className={"App-header App-home"}  >
				<NavBar backArrow={false} left={website_logo2==''?<></>:<Image className='home-logo' fit='contain' src={website_logo2} />} right={left}>
					<div style={{ fontSize: 20 }}></div>
				</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95}}>
				<div className='img-content'>
					<Swiper autoplay loop >{items}</Swiper>
				</div>
				<div onClick={()=>{Auth.navigate(navigate,"/notice")}}>
					<NoticeBar 
						icon={<div style={{ fontSize: 14}}><SoundOutline  /> {language_app_home_notice}：</div>} style={{ fontSize: 14,'--height':'32px'}} 
						content={notice} 
						extra={<RightOutline />}
						color='alert' />
				</div>
				<div className='home-game-body'>
					<Grid columns={4} gap={10} style={{marginTop:10}}>
						<Grid.Item className='sc-button'  onClick={()=>{if(checkLogin())navigate("/mall/0")}}>
							<Image className='sc-button-img' src="/sc/button1.png" />
							<div>{language_app_home_button_1}</div>
						</Grid.Item>
						<Grid.Item className='sc-button' onClick={()=>{if(checkLogin())Auth.navigate(navigate,"/activity")}}>
							<Image className='sc-button-img' src="/sc/button2.png" />
							<div>{language_app_home_button_2}</div>
						</Grid.Item>
						<Grid.Item className='sc-button' onClick={()=>{if(checkLogin())Auth.navigate(navigate,"/record")}}>
							<Image className='sc-button-img' src="/sc/button4.png" />
							<div>{language_app_home_button_3}</div>
						</Grid.Item>
						<Grid.Item className='sc-button' onClick={()=>{window.location.href = kefu}}>
							<Image className='sc-button-img' src="/sc/button3.png" />
							<div>{language_app_home_button_4}</div>
						</Grid.Item>
					</Grid>
				
					<Image className='sc-youhui'  src={website_app_img_1} style={{ borderRadius: 4 }}/>
					<Grid columns={4} gap={10} className='sc-type-list'>
						<Grid.Item className='sc-type'  onClick={()=>{if(checkLogin())navigate("/mall/1")}}>
							{/* <Image className='sc-type-img' src="/sc/type1.png" /> */}
							<div className='sc-type-name' style={{ backgroundImage: 'url("/sc/type1.png")'}}>{language_app_home_type_1}</div>
						</Grid.Item>
						<Grid.Item className='sc-type'   onClick={()=>{if(checkLogin())navigate("/mall/2")}}>
							<div className='sc-type-name' style={{ backgroundImage: 'url("/sc/type2.png")'}}>{language_app_home_type_2}</div>
						</Grid.Item>
						<Grid.Item className='sc-type'   onClick={()=>{if(checkLogin())navigate("/mall/3")}}>
							<div className='sc-type-name' style={{ backgroundImage: 'url("/sc/type3.png")'}}>{language_app_home_type_3}</div>
						</Grid.Item>
						<Grid.Item className='sc-type'  onClick={()=>{if(checkLogin())navigate("/mall/4")}}>
							<div className='sc-type-name' style={{ backgroundImage: 'url("/sc/type4.png")'}}>{language_app_home_type_4}</div>
						</Grid.Item>
					</Grid>
					<Image className='sc-youhui'  src={website_app_img_2} onClick={()=>{if(checkLogin())navigate("/mall/0")}} style={{ borderRadius: 4 }} />
					{/* <br/> */}
					{/* <Image className='sc-jxhw'  src="/sc/jxhw.png" /> */}
					<Divider className='dy-type'>{language_app_home_text_1}</Divider>
					<Grid columns={2} gap={10} style={{marginTop:10,padding:"0 5px"}}>
						{gameList1}
					</Grid>
					{/* <Image className='sc-jxhw'  src="/sc/hdzq.png" /> */}
					
					<Divider className='dy-type'>{language_app_home_text_2}</Divider>
					<Grid columns={2} gap={10} style={{marginTop:10,padding:"0 5px"}}>
						{gameList2}
					</Grid>
				</div>
			</div>
			<Popup
				visible={visiblePopup}
				onMaskClick={() => {
					setVisiblePopup(false)
				}}
				bodyStyle={{ height: '40vh' }}
				
			>
				<div className='home-language-select'>
					{language.map((item:any,index:number)=>{
						return (<>
							<Button style={{width:"80%"}} onClick={()=>{onSelectLanguage(item.language)}}>
								{item.name}
							</Button>
							<br/>
						</>)
					})}
				</div>
			</Popup>
			<div className='App-footer'>
				<TabBar 			
					onChange={(key: string) => {
						if(key == '/'){
							return
						}
						if(key == '/kefu'){
							window.location.href = kefu
						}else{
							if(checkLogin())Auth.navigate(navigate,key);
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

