import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,Picker,Toast,Grid,InfiniteScroll,List,Empty,Tabs,Dialog,Calendar } from 'antd-mobile'
import { 
	DownOutline,BankcardOutline
} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import moment from "moment";
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'

let now1 = new Date()
export default () => {
	
	const [date1, setDate1] = useState(now1)
	const [recordType, setRecordType] = useState<string>('全部订单')
	const [recordTypeList, setRecordTypeList] = useState<(any | null)[]>([])
	const [page, setPage] = useState(1)
	const [dateformat1, setformatDate1] = useState(moment(now1).format('YYYY-MM-DD'))
	const [historyData, setHistoryData] = useState<{}[]>([])
	const [hasMore, setHasMore] = useState(true)
	const [visible, setVisible] = useState(false)
	const [status, setStatus] = useState('0')
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	let tmp1 = date1;
	let historyHtml

	useEffect(() => {
		getRecordType()
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getRecordType = function(){
		Auth.ajax(navigate,'record/type')
		.then(function (response) {
			setRecordTypeList(response)
		})
	}
	const getHistory = async function(init=false,dateformatTmp="",cptitle="",statusTmp=''){
		let tpage 
		if(init){
			tpage = 1
		}else{
			tpage = page
		}
		if(!dateformatTmp){
			dateformatTmp = dateformat1
		}
		if(!cptitle){
			cptitle = recordType
		}
		if(statusTmp == ''){
			statusTmp = status
		}
		let values = {
			page:tpage,
			date1:dateformatTmp,
			cptitle:cptitle,
			status:statusTmp,
		}
		dispatch(setLoading(true))
		let response = await Auth.ajax(navigate,"record/list",values)
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
	const onSelect =(dateformatTmp:string,cptitle:string,statusTmp:string)=>{
		
		setHasMore(false)
		setPage(1)
		// console.log(page,"page");
		setHistoryData([])
		getHistory(true,dateformatTmp,cptitle,statusTmp)
	}
	if(historyData.length > 0){
		historyHtml = (<>
			<List className='record-list'>
				{historyData.map((item:any, index) => (
					<List.Item key={index}>
						<Grid columns={2} gap={8}>
							<Grid.Item className="record-cptitle">
								<div>{item["cptitle"]}</div>
							</Grid.Item>
							<Grid.Item className={"record-status-str"+(item["isdraw"]=="1"?" record-status-str1":"")+(item["isdraw"]=="-1"?" record-status-str2":"")}>
								<div>{item["statusStr"]}</div>
							</Grid.Item>
						</Grid>
						<Grid columns={2} gap={8}>
							<Grid.Item  className="record-expect">
								<div>{item["expect"]}</div>
							</Grid.Item>
							<Grid.Item className="record-amount">
								<div>{item["amount"]}</div>
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
					defaultValue={date1}
					selectionMode='single'
					onChange={(val:any) => {
						// console.log(val)
						if(val){
							tmp1 = val
						}
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
							setformatDate1(moment(tmp1).format('YYYY-MM-DD'))
							onSelect(moment(tmp1).format('YYYY-MM-DD'),'','')
						},
					},
				],
			],
		})
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>任务记录</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>				
				<Grid columns={2} gap={0} className='record-date'>
					<Grid.Item className='record-date-left' onClick={selectDate}>							
						{dateformat1}&nbsp;&nbsp;&nbsp;<BankcardOutline />
					</Grid.Item>
					<Grid.Item onClick={()=>{setVisible(true)}}>
						{recordType}&nbsp;&nbsp;&nbsp;<DownOutline />
					</Grid.Item>
				</Grid>
				<Tabs className='record-type' 
					onChange={(key)=>{
						setHistoryData([])
						setStatus(key)
						onSelect('','',key)
					}}
				>
          <Tabs.Tab title='全部订单' key='0' />
          <Tabs.Tab title='已开奖' key='1' />
          <Tabs.Tab title='待开奖' key='2' />
          <Tabs.Tab title='已撤单' key='3' />
        </Tabs>
				<div >
					{historyHtml}
					
					<InfiniteScroll loadMore={getHistory} hasMore={hasMore} />	
				</div>		
				<Picker
					columns={recordTypeList}
					visible={visible}
					onClose={() => {
						setVisible(false)
					}}
					onConfirm={v => {
						recordTypeList[0].map((item:any,index:any)=>{
							// console.log(v[0],item)
							if(v[0] == item.value){
								setRecordType(item.label)
								onSelect('',item.label,'')
							}
						})
					}}
				/>
			</div>
		</div>
	)
}