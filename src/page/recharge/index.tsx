import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,List,Empty,Image,Tag} from 'antd-mobile'
import { 
	SoundOutline,EditSFill,SystemQRcodeOutline,BankcardOutline
} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../lib/Auth'
import './index.css'
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'
export default () => {
	
	const dispatch = useDispatch()
	const [htmlData, setHtmlData] = useState<{}[]>([])
	let navigate = useNavigate()
	Auth.page(navigate)
	let html


	useEffect(() => {
		getData()
	},[])
  const back = () =>{
		navigate(-1);
	}

	const getData = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'recharge/collection')
		.then(function (response:any) {
			dispatch(setLoading(false))
			setHtmlData(response);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}


	if(htmlData.length > 0){
		html = (<>
			<List header=''>
				{htmlData.map((item:any,index) =>{
					let prefix
					if(item.img){
						prefix = (
							<SystemQRcodeOutline 
								style={{ padding: 5 }}
								width={35}
								height={35}
								color={'#fff'}
							/>)
					}else{
						prefix = (
							<BankcardOutline 
								style={{ padding: 5 }}
								width={35}
								height={35}
								color={'#fff'}
							/>)

					}
					return (
						<List.Item
							onClick={()=>{Auth.navigate(navigate,"/recharge/info/"+item['id'])}}
							key={index}
							prefix={prefix}
							description={item.desc}
							style={{color:'#fff'}}
						>
							{item.title}
						</List.Item>
					)
				})}
			</List>
		</>)

	}else{
		html = (
			<Empty className='recharge-empty' description='请联系客服预购' />
		)
	}
	
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>预购选择</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				{html}
			</div>
		</div>
	)
}