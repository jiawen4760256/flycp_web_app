import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Tag,Grid,InfiniteScroll,List,Empty,Space,Dialog,Calendar } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import moment from "moment";
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'

let now1 = new Date()
now1.setDate(now1.getDate()-2)
let now2 = new Date()
export default () => {
	
	const [date1, setDate1] = useState(now1)
	const [date2, setDate2] = useState(now2)
	const [page, setPage] = useState(1)
	const [dateformat1, setformatDate1] = useState(moment(now1).format('YYYY-MM-DD'))
	const [dateformat2, setformatDate2] = useState(moment(now2).format('YYYY-MM-DD'))
	const [historyData, setHistoryData] = useState<{}[]>([])
	const [hasMore, setHasMore] = useState(true)
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	let tmp1 = date1;
	let tmp2 = date2;
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
		let values = {page:tpage,date1:dateformat1,date2:dateformat2}
		
		dispatch(setLoading(true))
		let response:any = await Auth.ajax(navigate,"recharge/history",values)
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
			<List className='history-list'>
				{historyData.map((item:any, index) => (
					<List.Item key={index}>
						<Grid columns={3} gap={8}>
							<Grid.Item span={2} className="history-list-name">
								<div>{item["title"]}</div>
							</Grid.Item>
							<Grid.Item className="history-list-amount">
								<div>{item["amount"]}积分</div>
							</Grid.Item>
						</Grid>
						<Grid columns={3} gap={8}>
							<Grid.Item span={2} className="history-list-date">
								<div>{item["oddtime"]}</div>
							</Grid.Item>
							<Grid.Item className="history-list-state">
								<Tag color='success' fill='outline'>
									{item["state"]}
								</Tag>
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
	const selectDate=()=>{
		Dialog.show({
			content: (        
				<Calendar
					defaultValue={[date1,date2]}
					selectionMode='range'
					onChange={(val:any) => {
						console.log(val)
						tmp1 = val[0]
						tmp2 = val[1]
					}}
				/>
			),
			closeOnAction: true,
			actions: [
				[
					{
						key: 'cancel',
						text: '取消',
					},
					{
						key: 'confirm',
						text: '确认',
						bold: true,
						danger: true,
						onClick: () => {
							setDate1(tmp1)
							setDate2(tmp2)
							setformatDate1(moment(tmp1).format('YYYY-MM-DD'))
							setformatDate2(moment(tmp2).format('YYYY-MM-DD'))
							// console.log("confirm");
						},
					},
				],
			],
		})
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>预购记录</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
				<div className='history-day'>
					<Space wrap	>	
						<>
							<Button onClick={selectDate}>
								{dateformat1}
							</Button>
						</>
						<div className='history-limit'>
							至
						</div>
						<>
							<Button onClick={selectDate}>
								{dateformat2}
							</Button>
						</>
						<div >
							<Button color='danger' size='small' className='history-button' onClick={onSelect}>查询</Button>
						</div>
					</Space>
					{historyHtml}
					
					<InfiniteScroll loadMore={getHistory} hasMore={hasMore} />	
				</div>	
			</div>
		</div>
	)
}