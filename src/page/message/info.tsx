import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,Space,Empty,Divider} from 'antd-mobile'
import {
  useNavigate,
	useParams,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'
export default () => {
	const params = useParams() 
	const [htmlData, setHtmlData] = useState<any>({})
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	let html

	useEffect(() => {
		getHtmlData()
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getHtmlData = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'message/info',{id:params['id']})
		.then(function (response) {
			dispatch(setLoading(false))
			setHtmlData(response)
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}

	
	if(htmlData){
		html = (<div className='message-info'>
			<div className='message-info-name'>
				{htmlData.sendname}
			</div>
			<div className='message-info-time'>
				{htmlData.PDate}
			</div><Divider />
			<div className='message-info-txt'>
				<div 
					dangerouslySetInnerHTML={{__html:htmlData['text']}}
				>
				</div>
			</div>
		</div>)

	}else{
		html = (
			<Empty className='discount-empty' description='暂无数据' />
		)
	}

	
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar  onBack={back}>站内信</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff !important"}}>
				{html}
			</div>
		</div>
	)
}