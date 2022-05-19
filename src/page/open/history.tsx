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
import axios from 'axios';
import Qs from 'qs'
import Api from '../../lib/Api'
let now1 = new Date()
export default () => {
	
	const [date1, setDate1] = useState(now1)
	const [page, setPage] = useState(1)
	const [dateformat1, setformatDate1] = useState(moment(now1).format('YYYY-MM-DD'))
	const [historyData, setHistoryData] = useState<{}[]>([])
	const [hasMore, setHasMore] = useState(true)
	const [visible, setVisible] = useState(false)
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const recordTypeList = JSON.parse(localStorage.getItem("list")??"[]")
	const [recordType, setRecordType] = useState<string>(recordTypeList[0][0].label)
	let tmp1 = date1;
	let historyHtml
	let historyHeadHtml = <></>
	useEffect(() => {

	},[])
  const back = () =>{
		navigate(-1);
	}

	
	const getHistory = async function(init=false,dateformatTmp="",cptitel=""){
		let tpage 
		if(init){
			tpage = 1
		}else{
			tpage = page
		}
		if(!dateformatTmp){
			dateformatTmp = dateformat1
		}
		if(!cptitel){
			cptitel = recordType
		}
		let values = {
			page:tpage,
			date1:dateformatTmp,
			cptitel:cptitel,
		}
		dispatch(setLoading(true))
		// let response = await Auth.ajax(navigate,"home/history",values)


		let response = await axios.post(Api.address()+"home/history", Qs.stringify(values))

		
		dispatch(setLoading(false))
		if(init){
			setPage(2)
		}else{
			setPage(page+1)
		}
		setHistoryData(val => [...val, ...response.data.data])
		setHasMore(response.data.data.length == 20)
	}
	useEffect(() => {
		// getHistory();
  },[])
	const onSelect =(dateformatTmp:string,cptitle:string)=>{
		
		setHasMore(false)
		setPage(1)
		// console.log(page,"page");
		setHistoryData([])
		getHistory(true,dateformatTmp,cptitle)
	}
	if(historyData.length > 0){
		historyHtml = historyData.map((item:any,index:any)=>{return(
			<Grid columns={7} gap={15} className={"k3-kj-history-row-"+(index%2)} key={index}>
				<Grid.Item span={2} >
					{item.expect}
				</Grid.Item>
				<Grid.Item span={2}>
					<Grid columns={3} gap={5} className='k3-kj-history-img'>
						<Grid.Item>
							<Image  src={"/k3/"+item.opencode[0]+".png"} />
						</Grid.Item>
						<Grid.Item>
							<Image  src={"/k3/"+item.opencode[1]+".png"} />
						</Grid.Item>
						<Grid.Item>
							<Image  src={"/k3/"+item.opencode[2]+".png"} />
						</Grid.Item>
					</Grid>
				</Grid.Item>
				<Grid.Item >
					{item.hz}
				</Grid.Item>
				<Grid.Item >
					{item.dx}
				</Grid.Item>
				<Grid.Item>
					{item.ds}
				</Grid.Item>
			
			</Grid>
		)})
		historyHeadHtml = (<div className='ks-kj-history'>
			<Grid columns={7} gap={15}>
				<Grid.Item span={2} className='ks-kj-history-qs'>
					期数
				</Grid.Item>
				<Grid.Item span={2}>
					开奖号码
				</Grid.Item>
				<Grid.Item>
					和值
				</Grid.Item>
				<Grid.Item>
					大小
				</Grid.Item>
				<Grid.Item>
					单双
				</Grid.Item>
			</Grid>
		</div>)
	
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
							onSelect(moment(tmp1).format('YYYY-MM-DD'),'')
						},
					},
				],
			],
		})
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>开奖记录</NavBar>
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
				<div >
				{historyHeadHtml}
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
								onSelect('',item.label)
							}
						})
					}}
				/>
			</div>
		</div>
	)
}