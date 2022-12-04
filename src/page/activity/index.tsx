import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,List,Empty,Image} from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import {setLoading} from '../../store';		
import {useDispatch,useSelector} from 'react-redux';
import {getDictionary} from '../../store';
export default () => {
	const [htmlData, setHtmlData] = useState<{}[]>([])
	const dispatch = useDispatch()
	const navigate = useNavigate()
	Auth.page(navigate)
	const {
		language_app_home_button_2,
	} = useSelector(getDictionary);
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
			<Empty className='discount-empty' description='' />
		)
	}

  return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header' onBack={back}>{language_app_home_button_2}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				{html}	
			</div>
		</div>
  )
}