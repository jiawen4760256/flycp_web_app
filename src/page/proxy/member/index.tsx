import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,SearchBar,Tag,Collapse,InfiniteScroll,List,Empty,Space,Dialog,Grid } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import moment from "moment";
import './index.css'
import Auth from '../../../lib/Auth';
import { setLoading } from '../../../store'
import {useDispatch } from 'react-redux'


export default () => {
	
	const [page, setPage] = useState(1)
	const [historyData, setHistoryData] = useState<{}[]>([])
	const [hasMore, setHasMore] = useState(true)
	const [username, setUsername] = useState('')
	
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	let historyHtml


	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getHistory = async function(init=false){
		let tpage 
		if(init){
			tpage = 1
		}else{
			tpage = page
		}
		let values = {page:tpage,username:username}
		
		dispatch(setLoading(true))
		let response:any = await Auth.ajax(navigate,"proxy/member",values)
		dispatch(setLoading(false))
		if(init){
			setPage(2)
		}else{
			setPage(page+1)
		}
		setHistoryData(val => [...val, ...response])
		setHasMore(response.length == 20)
	}
	useEffect(() => {
		// getHistory();
  },[])
	const onSelect =()=>{
		setPage(1)
		console.log(page,"page");
		setHistoryData([])
		getHistory(true)
	}
	if(historyData.length > 0){
		historyHtml = (<>
			<Collapse  defaultActiveKey={['1']}>
				{historyData.map((item:any, index) => (
					<Collapse.Panel key={item.username} title={<>
						
						<List.Item
							prefix={
								<Image
									src={item.face}
									style={{ borderRadius: 20 }}
									fit='cover'
									width={40}
									height={40}
								/>
							}
							description={"注册："+item.regtime+" 充值："+(item.totalin?item.totalin:0)}
						>
							{item.username}
						</List.Item>
					</>}>
					<div  className='proxy-member-info'>
						<Grid columns={24} gap={0}>
							<Grid.Item span={5} className='proxy-key'>
								充提盈亏
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.totalout-item.totalin}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								余额
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.balance}
							</Grid.Item>

							<Grid.Item span={5} className='proxy-key'>
								今日充值
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.todayin}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								总充值
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.totalin}
							</Grid.Item>

							<Grid.Item span={5} className='proxy-key'>
								今日提现
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.todayout}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								总提现
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.totalout}
							</Grid.Item>
						</Grid>
					</div>
					<br/>
					<div  className='proxy-member-info'>
						<Grid columns={24} gap={0}>
							<Grid.Item span={5} className='proxy-key'>
								投注盈亏
							</Grid.Item>
							<Grid.Item span={19} className='proxy-value'>
								{(item.okamount-item.touzhu).toFixed(2)}
							</Grid.Item>

							<Grid.Item span={5} className='proxy-key'>
								投注金额
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.touzhu}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								中奖金额
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.okamount}
							</Grid.Item>
						</Grid>
					</div>
					<br/>
					<div  className='proxy-member-info'>
						<Grid columns={24} gap={0}>
							<Grid.Item span={5} className='proxy-key'>
								总彩金
							</Grid.Item>
							<Grid.Item span={19} className='proxy-value'>
								{(item.addAmount-item.reduceAmount).toFixed(2)}
							</Grid.Item>

							<Grid.Item span={5} className='proxy-key'>
								加彩金
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.addAmount}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								减金额
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{item.reduceAmount}
							</Grid.Item>
						</Grid>
					</div>
					</Collapse.Panel>
				))}
			</Collapse>
			
		</>)

	}else{
		historyHtml = (
			<Empty className='history-empty' description='' />
		)
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>下级报表</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95,background:"#fff"}}>
				<div className='history-day'>
					<Space wrap	>	
						<SearchBar placeholder='请输入会员账号' style={{marginTop:5}} onChange={setUsername}/>
						<Button color='danger' size='small' className='history-button' onClick={onSelect}>查询</Button>
					</Space>
					<br/>
					<br/>
					<div className='proxy-member-list'>
					{historyHtml}

					</div>
					
					<InfiniteScroll loadMore={getHistory} hasMore={hasMore} />	
				</div>	
			</div>
		</div>
	)
}