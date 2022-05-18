import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Grid,Divider,Space } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import { 
	RightOutline,
} from 'antd-mobile-icons'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'

export default () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [openData, setOpenData] = useState<any[]>([])
	let openHtml = (<></>)
	Auth.page(navigate)
  const back = () =>{
		navigate(-1);
	}
	const getOpenData = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'home/open')
		.then(function (response:any) {
			dispatch(setLoading(false))
			setOpenData(response);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	useEffect(() => {
		getOpenData()
  },[])

	if(openData.length > 0){
		openHtml = (<>{
			openData.map((item, index)=>{
				return (<div onClick={()=>{Auth.navigate(navigate,"/hall/"+item.typeid+"/"+item.name)}}  key={index}>
					<Grid columns={2} gap={8} className='open-itme' >
						<Grid.Item className='open-title'>
							{item['title']}
						</Grid.Item>
						<Grid.Item className='open-expect'>
							第{item['expect']}期
						</Grid.Item>
						<Grid.Item>
							<Space>
								{item['opencode'].map((item1:any,index1:number)=>{
									return(<div className='open-number' key={index1}>
										{item1}
									</div>)
								})}
							
							</Space>
						</Grid.Item>
						<Grid.Item className='open-expect'>
							<RightOutline />
						</Grid.Item>
					</Grid>
					{/* <Divider /> */}
				</div>)
			})
		}</>)
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header'  onBack={back}>开奖结果</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
					{openHtml}
			</div>
		</div>
	)
}