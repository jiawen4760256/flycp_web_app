import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,Picker,Toast,Grid,InfiniteScroll,List,Empty,Tabs,Tag,Badge } from 'antd-mobile'
import { 
	SoundOutline,EditSFill
} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading,getDictionary } from '../../store'
import {useDispatch,useSelector } from 'react-redux'
export default () => {
	
	const [page, setPage] = useState(1)
	const [historyData, setHistoryData] = useState<{}[]>([])
	const [hasMore, setHasMore] = useState(true)
	const [status, setStatus] = useState('0')
	const dispatch = useDispatch()
	const {
		language_app_home_bot_3,
		language_app_message_status_0,
		language_app_message_status_1,
		language_app_message_status_2,
		language_app_message_status_3,
	} = useSelector(getDictionary);
	let navigate = useNavigate()
	Auth.page(navigate)
	let historyHtml

	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}

	const getHistory = async function(init=false,statusTmp=''){
		let tpage 
		if(init){
			tpage = 1
		}else{
			tpage = page
		}

		if(statusTmp == ''){
			statusTmp = status
		}
		let values = {
			page:tpage,
			status:statusTmp,
		}
		dispatch(setLoading(true))
		let response:any = await Auth.ajax(navigate,"message/list",values)
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
	const onSelect =(statusTmp:string)=>{
		setHasMore(false)
		setPage(1)
		setHistoryData([])
		getHistory(true,statusTmp)
	}
	if(historyData.length > 0){
		historyHtml = (<>
			<List header=''>
				{historyData.map((item:any,index) =>{
					let newTag = (<></>)
					if(item.read == '0'){
						newTag = (<Tag round  color='danger'>new</Tag>)
					}
					let prefix
					if(item.face){
						prefix = (
							<Image
								src={item.face}
								style={{ borderRadius: 20 }}
								fit='cover'
								width={40}
								height={40}
							/>)

					}else{
						prefix = (
							<SoundOutline 
								style={{ padding: 5 }}
								width={30}
								height={30}
							/>)

					}
					return (
						<List.Item
							onClick={()=>{Auth.navigate(navigate,"/message/info/"+item['id'])}}
							key={index}
							prefix={prefix}
							description={item.PDate}
							extra={newTag}

						>
							{item.username}
						</List.Item>
					)
				})}
			</List>
		</>)

	}else{
		historyHtml = (
			<Empty className='history-empty' description='' />
		)
	}
	const right = (
		<></>
    // <div style={{ fontSize: 24 }} onClick={()=>{Auth.navigate(navigate, "/message/add")}}>
		// 	<EditSFill />
    // </div>
  )

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' right={right} onBack={back}>{language_app_home_bot_3}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>				
				<Tabs className='record-type' 
					onChange={(key)=>{
						setHistoryData([])
						setStatus(key)
						onSelect(key)
					}}
				>
          <Tabs.Tab title={language_app_message_status_0} key='0' />
          <Tabs.Tab title={language_app_message_status_1} key='1' />
          <Tabs.Tab title={language_app_message_status_2} key='2' />
          <Tabs.Tab title={language_app_message_status_3} key='3' />
        </Tabs>
				<div >
					{historyHtml}
					<InfiniteScroll loadMore={getHistory} hasMore={hasMore} />	
				</div>		
			</div>
		</div>
	)
}