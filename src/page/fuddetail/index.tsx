import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Space,Picker,Toast,Grid,InfiniteScroll,List,Empty,Tabs,Dialog,Calendar } from 'antd-mobile'
import { 
	DownOutline,BankcardOutline
} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store';		
import {useDispatch } from 'react-redux';
export default () => {
	const [day, setDay] = useState<string>('今天')
	const [page, setPage] = useState(1)
	const [historyData, setHistoryData] = useState<{}[]>([])
	const [hasMore, setHasMore] = useState(true)
	const [visible, setVisible] = useState(false)
	const [type, setType] = useState('')
	const dispatch = useDispatch();
	let navigate = useNavigate()
	Auth.page(navigate)
	let historyHtml
	const dayList = [[
		{label: "今天", value: "1"},
		{label: "三天", value: "2"},
		{label: "半个月", value: "3"},
	]]
	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}

	const getHistory = async function(init=false,dayTmp="",typeTmp=''){
		let tpage 
		if(init){
			tpage = 1
		}else{
			tpage = page
		}
		if(!dayTmp){
			dayTmp = day
		}
		if(typeTmp == ''){
			typeTmp = type
		}
		let values = {
			page:tpage,
			day:dayTmp,
			class:typeTmp,
		}
		
		dispatch(setLoading(true))
		let response:any = await Auth.ajax(navigate,'record/fuddetail',values)
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
	const onSelect =(dayTmp:string,classTmp:string)=>{
		
		setHasMore(false)
		setPage(1)
		// console.log(page,"page");
		setHistoryData([])
		getHistory(true,dayTmp,classTmp)
	}
	if(historyData.length > 0){
		historyHtml = (<>
			<List className='fuddetail-list'>
				{historyData.map((item:any, index) => (
					<List.Item key={index}>
						<Grid columns={2} gap={8}>
							<Grid.Item className="fuddetail-typename">
								<div>{item["typename"]}</div>
							</Grid.Item>
							<Grid.Item className={"fuddetail-amount-str"+(item["change"]=="1"?" fuddetail-amount-str1":"")+(item["change"]=="2"?" fuddetail-amount-str2":"")}>
								<div>{(item["change"]=="1"?"+":"-")+item["amount"]}</div>
							</Grid.Item>
						</Grid>
						<Grid columns={2} gap={8}>
							<Grid.Item  className="fuddetail-oddtime">
								<div>{item["oddtime"]}</div>
							</Grid.Item>
							<Grid.Item className="fuddetail-amountafter">
								<div>积分：{item["amountafter"]}</div>
							</Grid.Item>
						</Grid>
					</List.Item>
				))}
			</List>
		</>)

	}else{
		historyHtml = (
			<Empty className='history-empty' description='' />
		)
	}

  return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>积分明细</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				<Grid columns={5} gap={0}>
					<Grid.Item span={4}>
						<Tabs className='fuddetail-type'
							onChange={(key)=>{
								setHistoryData([])
								setType(key)
								onSelect('',key)
							}}
						>
							<Tabs.Tab title='全部' key='0' />
							<Tabs.Tab title='收入' key='1' />
							<Tabs.Tab title='支出' key='2' />
						</Tabs>	
          </Grid.Item>
					<Grid.Item span={1} className='adm-tabs fuddetail-type'>
						<div className='adm-tabs-tab' onClick={()=>{setVisible(true)}} >{day}<DownOutline /></div>
						
					</Grid.Item>
				</Grid>
				<div className='fuddetail-body'>
					{historyHtml}
					
					<InfiniteScroll loadMore={getHistory} hasMore={hasMore} />	
				</div>		
				<Picker
					columns={dayList}
					visible={visible}
					onClose={() => {
						setVisible(false)
					}}
					onConfirm={v => {
						dayList[0].map((item:any,index:any)=>{
							// console.log(v[0],item)
							if(v[0] == item.value){
								setDay(item.label)
								onSelect(item.label,'')
							}
						})
					}}
				/>
			</div>
		</div>
  )
}