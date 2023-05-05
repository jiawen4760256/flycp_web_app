import React, { useState,useEffect,useCallback } from 'react'
import { NavBar,Toast,Mask,Divider,Image,Popup,Button,Grid,Dialog,Space,Input,DotLoading,Popover,Picker} from 'antd-mobile'
import {
  useNavigate,useParams
} from 'react-router-dom'
import axios from 'axios';
import Qs from 'qs'
import './index.css'
import { 
	DownOutline,DownFill,MoreOutline
} from 'antd-mobile-icons'
// import UserList from "./userList"
import Api from '../../../lib/Api';
import Auth from '../../../lib/Auth';
import { Action } from 'antd-mobile/es/components/popover'
import { ExclamationCircleOutline} from 'antd-mobile-icons'

import { useSelector } from 'react-redux';
import {
  getHomeList,getMsgCount,getBalance,setBalance
} from '../../../store';
import {useDispatch } from 'react-redux';

export default () => {
	const params = useParams() 
	const balance = useSelector(getBalance)
	const dispatch = useDispatch()
	
	const {website_touzhu,wanfaName} = useSelector(getHomeList);
	const [gameList, setGameList] = useState<{}[]>([])
	const [k3Wanfa, setK3Wanfa] = useState<any[]>([])
	const [gameData, setGameData] = useState<any>({})
  const [visible2, setVisible2] = useState(false)
	const [visibleSheet, setVisibleSheet] = useState(false)
	const [visibleNum, setVisibleNum] = useState(false)
	const [visibleNumSelect, setVisibleNumSelect] = useState(1)
  const [countdownTime, setCountdownTime] = useState<number>(0)
  const [countdownTimeEnd, setCountdownTimeEnd] = useState<number>(0)
  const [showTime, setShowTime] = useState("-- : --")
  const [showHistory, setShowHistory] = useState("none")
  const [historyList, setHistoryList] = useState<any[]>([])
  const [alertNumber, setAlertNumber] = useState(5)
  const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [gameName, setGameName] = useState(params['name'])
  let [timer, setTimer] = useState(0);
	let [touzhu, setTouzhu] = useState<any>({})
	const [k3hzsmall, setK3hzsmall] = useState(false)
	const [value, setValue] = useState('')
	const userInfo:any = JSON.parse(localStorage.getItem("userInfo")??'{"balance":0.00}')
	let navigate = useNavigate()
	let gameListHtml = (<></>)
	let selectGameHtml = (<></>)
	let kjHistoryHtml = (<></>)
	let kjHistoryList = (<></>)
	let alertHtml = (<></>)
	let cardHtml = (<></>)
	let HzHtml = (<></>)
	let touzhuHtml = (<></>)
	let loadingHtml = (<></>)
	let previousOpen = (<></>)
	let rightHtml = (<></>)
  // 使用 useEffect 监听 countDown 变化
  useEffect(() => {
		if(!visibleSheet){
			setVisibleSheet(true)
		}
    if (countdownTime > 0) {
      const newTimer = window.setInterval(() => {
				let t = countdownTimeEnd-Date.parse(new Date().toString())/1000
				// console.log(t);
				// console.log(countdownTimeEnd);
				// console.log(Date.parse(new Date().toString())/1000);
				// let t = countdownTime-1;
				let i:any = ~~(t/60)
				let s:any = t%60
				let ss = s
				if(i<10){
					i = "0"+i
				}
				if(s<10){
					s = "0"+s
				}
				setShowTime(i+":"+s);
				setCountdownTime(t)
				
				if(t <= 5 ){
					setAlertNumber(ss)
					if(!visible && t==5){
						setVisible(true)
					}
				}
        if (t <= 1) {
					setVisible(false)
					Dialog.clear()
					console.log('倒计时介绍')
					getHtmlData(gameName,false)
          window.clearInterval(newTimer);
        } 
      }, 1000);

      setTimer(newTimer);
    }
  }, [countdownTime]);

  // 组件销毁清除倒计时
  useEffect(() => {
    return () => window.clearInterval(timer);
  }, [timer]);


	useEffect(() => {
		if(localStorage.getItem("token")){
				let userInfo:any = JSON.parse(localStorage.getItem("userInfo")??'{"balance":0.00}')
				dispatch(setBalance(userInfo.balance))
		}else{
			dispatch(setBalance("-"))
		}
		getHtmlData(gameName)
	},[])


  const back = () =>{
		
		navigate("/")
		// navigate(-1);
	}

	// 号码html
	if( k3Wanfa.length != 0){
		cardHtml = (<>
			<Grid columns={2} gap={8} className='hz-card-body'>
				{k3Wanfa.map((item:any, index:any) => (
					<Grid.Item key={index} onClick={()=>{selectNumber(item.playid,item.title)}}>
						<div className={touzhu[item.playid]?"hz-card-activity":"hz-card"}>
							{item.title}
							{/* <div className={touzhu[item.playid]?"hz-card-number-activity":"hz-card-number"}>{item.rate}</div> */}
						</div>
					</Grid.Item>
				))}
			</Grid>
		</>)
	}

	// 选择号码
	const selectNumber = (typeid:string,value:string)=>{
		k3hzsmall?setK3hzsmall(false):setK3hzsmall(true)
		// console.log(typeid,value)
		let tmp = {...touzhu}
		if(tmp[typeid]){
			delete tmp[typeid]
		}else{
			tmp[typeid] = value
		}
		// console.log(tmp)
		setTouzhu(tmp)
	}


	// 游戏数据
	const getHtmlData = function(name:any,showLoading:boolean=true){
		window.clearInterval(timer)
		setCountdownTime(0)
		setShowTime("--:--");
		let values = {
			name:name
		}
		if(showLoading){
			setLoading(true)
		}
		axios.post(Api.address()+'home/hall', Qs.stringify(values),Auth.verify(values))
		.then(function (response) {
			setLoading(false)
			if(response.data.code == 0){
				setGameList(response.data.data.hall)
				setGameData(response.data.data.game)
				setHistoryList(response.data.data.game.history)
				setCountdownTime(response.data.data.game.countdown)
				setCountdownTimeEnd(Date.parse(new Date().toString())/1000+response.data.data.game.countdown)
				setK3Wanfa(response.data.data.game.wanfa)
				setTimeout(()=>{
					updateOpenData()
				},20000)
			}else{
				Toast.show({
					icon: <ExclamationCircleOutline />,
					content: response.data.msg,
				})
			}
		})
		.catch(function (error) {
			setLoading(false)	
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: '服务繁忙，稍后再试！',
			})
		})
	}
	const updateOpenData = ()=>{
		const values={
			"page": 1,
			"cptitel": gameName,
			"limit": 10
		}
		axios.post(Api.address()+'home/history', Qs.stringify(values),Auth.verify(values))
		.then(function (response) {
			setLoading(false)
			if(response.data.code == 0){
				setHistoryList(response.data.data)
			}else{
				Toast.show({
					icon: <ExclamationCircleOutline />,
					content: response.data.msg,
				})
			}
		})
	}


	const showSubmit=()=>{
		if(gameData.qishu == '0'){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "暂停中，无法操作",
			})
			return
			
		}
		let amount = Number(value)*visibleNumSelect

		// console.log(values)
		if(Object.keys(touzhu).length == 0){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "请选择号码！",
			})
			return
		}
		if(!localStorage.getItem("token")){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "您尚未登陆！",
			})
			return
		}
		
		if(!amount){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "请输入积分！",
			})
			return
		}
		
		Dialog.confirm({
			content: <>
				<div className='k3-confirm-title'>购票确认</div>
				<Divider />
				<div className='k3-confirm-text'>购票活动：{gameData.qishu}</div>
				<div className='k3-confirm-text'>购票总额：{amount*Object.keys(touzhu).length}元</div>
				<div className='k3-confirm-text'>购票内容：
					{k3Wanfa.map((item:any,index:number)=>{
						if(touzhu[item.playid]){
							return  item.title+" "
						}
					})}
				</div>
			</>,
			onConfirm: submit
		})
	}

	//投注提交
	const submit =async()=>{
		if(gameData.qishu == '0'){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "暂停中，无法操作",
			})
			return
			
		}
		let amount = Number(value)*visibleNumSelect
		let values = {
			token:localStorage.getItem("token"),
			touzhu:touzhu,
			amount:amount,
			qishu:gameData.qishu,
			name:gameData.name,
			typeid:'k3'
		}
		// console.log(values)
		if(Object.keys(touzhu).length == 0){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "请选择号码！",
			})
			return
		}
		if(!values.token){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "您尚未登陆！",
			})
			return
		}
		
		if(!amount){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "请输入积分！",
			})
			return
		}

		
		setLoading(true)
		await	axios.post(Api.address()+'user/touzhu', Qs.stringify(values),Auth.verify(values))
		.then(function (response) {
			setLoading(false)
			if(response.data.code == 0){
				userInfo.balance = response.data.data.balance
				dispatch(setBalance(userInfo.balance))
				localStorage.setItem("userInfo", JSON.stringify(userInfo))
				setTouzhu({})
				Toast.show({

					content: <Image src='/assets/success.png'></Image>,
				})
			}else{
				if(212 == response.data.code){
					getHtmlData(gameName)
					Toast.show({
						icon: <ExclamationCircleOutline />,
						content: "当前票单号已更新，请重新操作！",
					})
				}else{
					Toast.show({
						icon: <ExclamationCircleOutline />,
						content: response.data.msg,
					})
				}
			}
		})
		.catch(function (error) {
			setLoading(false)
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: '服务繁忙，稍后再试！',
			})
		})
	}

	// 清空、机选
	const clearTouzhu = ()=>{
		if(Object.keys(touzhu).length == 0){
			// 机选
			let item = k3Wanfa[Math.floor(Math.random()*k3Wanfa.length)];
			let playid = item["playid"]
			setTouzhu({[playid]:item['title']})
		}else{
			setTouzhu({})
		}
	}

	const howPlay=() =>
		Dialog.alert({
			content: (<>
				<div className='k3-howplay-title'>&diams;	项目提示</div>
				<div className='k3-howplay-txt'>至少选择1个和值（3个号码之和）参与项目。</div>
				<Divider />
				<div className='k3-howplay-title'>&diams;	奖励说明</div>
				<div className='k3-howplay-txt'>所选和值与公益号的3个号码的和值相同即可获得奖励。</div>
				<Divider />
				<div className='k3-howplay-title'>&diams;	范例</div>
				<div className='k3-howplay-txt'>
					选号：和大 <br/>
					公益号码数字相加在11－18的范围内即可获得奖励。 <br/>
					公益号码：3 4 6 <br/>
					和值为13 <br/>
					----------------<br/>
					选号：和小 <br/>
					公益号码数字相加在3－10的范围内即可获得奖励。 <br/>
					公益号码：1 2 4<br/>
					和值为7 <br/>
				</div>
			</>),
			onConfirm: () => {
			},
		})
	

	// 投注倒计时
	alertHtml = (<>
		<div className='ks-alert-body'>
			<div className='ks-alert-qs1'>
				距 {gameData.qishu}
			</div>
			<div className='ks-alert-qs1'>
				项目截至
			</div>
			<div className='ks-alert-number'>
				{alertNumber}
			</div>
			<div className='ks-alert-qs2'>
				提交时请注意当前单号
			</div>
			<Button  size='small' color='danger' onClick={()=>setVisible(false)}>知道了</Button>
		</div>
	</>)
	
	// 选择彩种
	if(gameList.length > 0){
		gameListHtml = (<>
			 <Grid columns={3} gap={8} className='k3-name-list-body'>
				{gameList.map((item:any, index) => (
					<Grid.Item className="k3-name-list" key={index}>
						<Button 
							onClick={(p)=>{
								setVisible2(false)
								// getHtmlData(item.name)
								// setGameName(item.name)
								navigate("/hall/k3/"+item.name)
							}}
							color='primary' 
							fill='outline' 
							className={gameData.title == item.title?"k3-name-list-button-active":"k3-name-list-button"}
						>
							{item.title}
						</Button>
					</Grid.Item>
				))}

			 </Grid>
			
		</>)

	}
	

	if( Object.keys(gameData).length != 0){
		selectGameHtml = (				
			<Button
				className='k3-name-button'
				onClick={() => {
					setVisible2(true)
				}}
				style={{'--background-color':'transparent','--border-style':'unset'}}
			>
				{gameData.title}<DownOutline />
			</Button>
		)
		if(historyList.length > 0){
			let item = historyList[0]
			previousOpen = (<>
				<div className='k3-kj-qs' 
					onClick={()=>{
						showHistory=="none"?setShowHistory("block"):setShowHistory("none")
					}}
				>
					{item.expect.slice(4,6)
						+"月"
						+item.expect.slice(6,8)
						+"日" 
						+item.expect.slice(8,12)
						+"结果"}&nbsp;<DownOutline style={{transform : showHistory=="none"?"rotate(0deg)":"rotate(180deg)"}}/></div>
				<div>
					<div className='k3-kj-img'>
							{item.dx}，{item.ds}
					</div>
				</div>
			</>)

		}
		// 历史开奖
		kjHistoryList =(<>{
			historyList.map((item:any,index:any)=>{return(
				<Grid columns={3} gap={15} className={"k3-kj-history-row-"+(index%2)} key={index}>
					<Grid.Item>
						{item.expect}
					</Grid.Item>
					<Grid.Item >
						{item.dx}
					</Grid.Item>
					<Grid.Item>
						{item.ds}
					</Grid.Item>
				</Grid>
			)})
		}</>) 
		kjHistoryHtml = (<div className='ks-kj-history'>
			<Grid columns={3} gap={15}>
				<Grid.Item className='ks-kj-history-qs'>
					票单号
				</Grid.Item>
				<Grid.Item>
					{wanfaName?.k3hzbig}/{wanfaName?.k3hzsmall}
				</Grid.Item>
				<Grid.Item>
					{wanfaName?.k3hzodd}/{wanfaName?.k3hzeven}
				</Grid.Item>
			</Grid>
		</div>)
	}
	
	// 和值html
	HzHtml = (<>
		<div style={{overflow: "hidden"}}>
			{/* <div className='hz-playinfo' onClick={howPlay}>
				<QuestionCircleOutline />&nbsp;项目说明
			</div> */}
		</div>
		{cardHtml}
	</>)

	// 投注html
	touzhuHtml = (<>
	
		<div className='touzhu-number' style={{'display':Object.keys(touzhu).length==0?"none":"block"}}> 
			<div>
				<Space wrap className='touzhu-number-row'>
					<div>当前选择</div>
					{k3Wanfa.map((item:any,index:number)=>{
						if(touzhu[item.playid]){
							return  (
								<div key={index} className='touzhu-number-select'>{item.title}</div>
							)
						}
					})}
				</Space>
			</div>
			<Divider style={{margin: "5px 0"}} />
			<div>
				<div  className='touzhu-number-row'  >
					<div style={{float:"left"}}>购票金额</div>
					<div style={{float:"left",width: "150px",paddingLeft: "8px"}}>
						<Input
							placeholder='请输购票金额'
							value={value}
							type="number"       
							onBlur={()=>{
								// alert(window.screen.availHeight)
							}}
							onFocus={()=>{
								// alert(window.screen.availHeight)
							}}

							onChange={val => {
								// if(Number(val) > 1000000){
								// 	setValue('')
								// 	Toast.show({
								// 		content: '最高投注积分100万',
								// 		afterClose: () => {
								// 			console.log('after')
								// 		},
								// 	})
								// }
								setValue(val)
							}}
						/>

					</div>
					
					<div style={{float:"right"}} >  元&nbsp;&nbsp;</div>
					{/* <div style={{float:"right"}} onClick={()=>{setVisibleNum(true)}}><Divider direction='vertical' /> {visibleNumSelect} 倍<DownOutline />&nbsp;</div> */}
				</div>
			</div>
		</div>
		<div className='touzhu-footer'>
			<Grid columns={9} gap={8}>
				<Grid.Item className='touzhu-button-left' span={2}>
					<Button color='primary' fill='outline' size='small' onClick={clearTouzhu}>
						{/* {
							Object.keys(touzhu).length==0?'随机':"删除"
						} */}
					刷新余额
            
          </Button>
				</Grid.Item>
				<Grid.Item span={4}>
					<div>
						<Space wrap className='touzhu-button-glod'>
							共<div className='touzhu-button-number'>{ Object.keys(touzhu).length}</div><div>件</div>
							{/* <div className='touzhu-button-number'>{ visibleNumSelect}</div><div>倍</div> */}
							<div className='touzhu-button-number'>{ Number(value)*Object.keys(touzhu).length*visibleNumSelect}</div><div>元</div>
						</Space>
					</div>
					<div>
						<Space wrap className='touzhu-button-glod' onClick={()=>{

						}}>
							<div>余额：</div>
							<div className='touzhu-button-number'>{balance}</div>
						</Space>
					</div>
				</Grid.Item>
				<Grid.Item  className='touzhu-button-right' span={3}>
					<Button color='danger'  size='small' onClick={showSubmit} loading={loading}>确认购票</Button>
				</Grid.Item>
			</Grid>
		</div>
	</>)

	// 加载中
	loadingHtml = (<>
		<Mask visible={loading} className='App-loading'>
			<DotLoading style={{color:"#f00"}} />
		</Mask>
	</>)
	let qishu = '';
	if(gameData.qishu == '0'){
		qishu=""
	}else if(Object.keys(gameData).length){
		// qishu = gameData.qishu+" 距匹配"
		qishu = gameData.qishu.slice(4,6)
		+"月"
		+gameData.qishu.slice(6,8)
		+"日" 
		+gameData.qishu.slice(8,12)
		+"票单匹配"
	}
	
	const actions: Action[] = [
		{ key: '/record', icon:  <></>, text: '购票记录' },
		{ key: '/open/history', icon: <></>, text: '品牌记录' }
	]
	//报错？？？ 需要后加载组件
	if(visibleSheet){
		rightHtml = (				
		<Popover.Menu
			actions={actions}
			placement='bottom-start'
			onAction={node =>{ 
				// Toast.show(`选择了 ${node.text}`)
				if(node.key == '/record' ){
					if(!localStorage.getItem('token')){
						Toast.show({
							icon: <ExclamationCircleOutline />,
							content: '您尚未登录',
						})
						return
					}
					navigate('/record')
				}
				if(node.key == '/open/history'){
					navigate('/open/history/'+gameName)
				}
			}}
			trigger='click'
		>
			<div style={{ fontSize: 35 }} onClick={()=>setVisibleSheet(true)}>
				<MoreOutline />
			</div>
		</Popover.Menu>
		)
	}
  return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header' onBack={back} right={rightHtml}>
					{selectGameHtml}
				</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95,background:"#fff"}}>
				
				<>
					<Mask visible={visible} 
						// onMaskClick={() => setVisible(false)}
					>
						{alertHtml}
					</Mask>
					{loadingHtml}
					<Popup
						className='k3-popup'
						visible={visible2}
						onMaskClick={() => {
							setVisible2(false)
						}}
						// position='top'
						// bodyStyle={{ height: '40vh' }}
					>
						{gameListHtml}
					</Popup>
				</>
				
				<Grid columns={2} gap={8} className='k3-kj'>
          <Grid.Item>
						<div className='k3-kj-qs'>{qishu}</div>
						<div className='k3-kj-time'>{showTime}</div>
          </Grid.Item>
          <Grid.Item>
						{previousOpen}
          </Grid.Item>
        </Grid>
				<div style={{display:showHistory}}>
					{kjHistoryHtml}
					{kjHistoryList}
				</div>
				<Divider className='k3-name-list-head' />
				
				{/* <div className='k3-title'>品种</div> */}
				{HzHtml}
				{/* {website_touzhu==""?(<>
					<Divider/>
					<div className='k3-title'>赞助商</div>
					<Grid columns={4} gap={8} className='k3-kj'>
						{[
						"/sc/361d.png",
						"/sc/at.png",
						"/sc/bskl.png",
						"/sc/gmdq.png",
						"/sc/hw.png",
						"/sc/mdkt.png",
						"/sc/sfkd.png",
						"/sc/tb.png",
						"/sc/whhjt.png",
						"/sc/xm.png",
						"/sc/yynf.png",
						"/sc/zrt.png",
						].map((item,index:number)=>{
						return <Grid.Item>
							<Image className='k3-mall-img' src={item} />
						</Grid.Item>
						})}
					</Grid>
					</>
				):(<> */}
					<br/>
					<Divider style={{marginBottom:"0px",boxShadow: "0 0 0.2rem rgb(0 0 0 / 20%)"}}/>
					<Image  src={website_touzhu} />
				{/* </>)} */}
				{/* <UserList/> */}
			</div>
			<div className='App-footer'>
				{touzhuHtml}
			</div>
			<Picker
        columns={[
					[
						{ label: '1 倍', value: '1' },
						{ label: '2 倍', value: '2' },
						{ label: '4 倍', value: '4' },
						{ label: '5 倍', value: '5' },
						{ label: '10 倍', value: '10' },
					]
				]}
        visible={visibleNum}
        onClose={() => {
          setVisibleNum(false)
        }}
        onConfirm={v => {
					const select = Number(v[0]) 
					setVisibleNumSelect(select)
        }}
      />
		</div>
  )
}