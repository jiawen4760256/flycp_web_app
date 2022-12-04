import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,List,Empty,Image} from 'antd-mobile'
import {
  useNavigate,
	useParams,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import {setLoading} from '../../store';		
import {useDispatch,useSelector} from 'react-redux';
import {getDictionary} from '../../store';
export default () => {
	const params = useParams() 
	const [htmlData, setHtmlData] = useState<any>({})
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const {
		language_app_home_button_2,
	} = useSelector(getDictionary);
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
		Auth.ajax(navigate,'activity/info',{id:params['id']})
		.then(function (response) {
			dispatch(setLoading(false))
			setHtmlData(response)
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}


	if(htmlData){
		html = (<div style={{margin:10}}
			dangerouslySetInnerHTML={{__html:htmlData['text']}}
		>
		</div>)

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
		<div className='App-content' style={{height:window.innerHeight-45,background:'#fff'}}>	
			<div className='activity-body'>
				{html}	
			</div>
		</div>
	</div>
  )
}