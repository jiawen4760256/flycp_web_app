import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,List,Empty,Image} from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import {setLoading} from '../../store';		
import {useDispatch} from 'react-redux';
export default () => {
	const [htmlData, setHtmlData] = useState<{}[]>([])
	const dispatch = useDispatch()
	const navigate = useNavigate()
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
		Auth.ajax(navigate,'activity/list')
		.then(function (response:any) {
			setHtmlData(response)
			dispatch(setLoading(false))
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
						onClick={()=>{Auth.navigate(navigate,"/activity/info/"+item['id'])}}
					>
						 <Image src={item['img']} style={{ borderRadius: 4 }} />
						 <Ellipsis className='discount-title' direction='end' content={item['title']} />
					</List.Item>
				))}
			</List>
			
		</>)

	}else{
		html = (
			<Empty className='discount-empty' description='暂无数据' />
		)
	}

  return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header' onBack={back}>爱空间简介</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				{html}	
			</div>
		</div>
  )
}