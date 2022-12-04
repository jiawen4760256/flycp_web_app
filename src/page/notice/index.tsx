import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,List,Empty,Image} from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading,getDictionary } from '../../store'
import {useDispatch ,useSelector} from 'react-redux'

export default () => {
	const [htmlData, setHtmlData] = useState<{}[]>([])
	const dispatch = useDispatch()
	
	const {      
		language_app_notice_title,
	} = useSelector(getDictionary)
	let navigate = useNavigate()
	let html
	Auth.page(navigate)

	useEffect(() => {
		getHtmlData()
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getHtmlData = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'notice/list')
		.then(function (response:any) {
			dispatch(setLoading(false))
			setHtmlData(response)
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}

	if(htmlData.length > 0){
		html = (<>
			<List>
				{htmlData.map((item:any, index) => (
					<List.Item 
						key={index} 
						clickable={false}
						onClick={()=>{Auth.navigate(navigate,"/notice/info/"+item['id'])}}
					>
						<Ellipsis className='notice-title' direction='end' content={item['title']} />
						<div className='notice-time' >{item['oddtime']}</div>
					</List.Item>
				))}
			</List>
			
		</>)

	}else{
		html = (
			<Empty className='notice-empty' description='' />
		)
	}

	
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>{language_app_notice_title}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				{html}	
			</div>
		</div>
	)
}