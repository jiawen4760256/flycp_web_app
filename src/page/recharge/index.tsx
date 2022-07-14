import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,List,Empty,Image} from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../lib/Auth'
import './index.css'
export default () => {
	
	const [htmlData, setHtmlData] = useState<{}[]>([])
	let navigate = useNavigate()
	Auth.page(navigate)
	let html


	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}



	if(htmlData.length > 0){
		html = (<>
			<List>
				{htmlData.map((item:any, index) => (
					<List.Item 
						key={index} 
						clickable={false}
						onClick={()=>{navigate("/discount/info/"+item['id'])}}
					>
						 <Image src={item['img']} style={{ borderRadius: 4 }} />
						 <Ellipsis className='discount-title' direction='end' content={item['title']} />
					</List.Item>
				))}
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
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
				{html}	
			</div>
		</div>
	)
}