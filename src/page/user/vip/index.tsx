import React, { useState,useEffect } from 'react'
import { NavBar, Tabs,Form,Button,Input,TextArea,Toast,DatePicker,Picker,Grid,Collapse } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../../lib/Auth';
import './index.css'

import { setLoading,getDictionary } from '../../../store'
import {useDispatch ,useSelector} from 'react-redux'
export default () => {
	
	const {      
		language_app_user_vip,
		language_app_vip_name,
		language_app_vip_total,
	} = useSelector(getDictionary)
	const [loading, setLoading] = useState(false)
	
	const [vipData, setVipData] = useState<any>({my:[],vip:[]})
	let navigate = useNavigate()
	Auth.page(navigate)
	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}


	const getUserVip = function(){
		setLoading(true)
		Auth.ajax(navigate,'user/vip',{})
		.then(function (response) {
			setLoading(false)
			setVipData(response)
		})
		.catch(function (error) {
			setLoading(false)
		})
	}
	useEffect(() => {
		getUserVip()
  },[])
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>{language_app_user_vip}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
						
						<Grid columns={2} gap={8} className='vip-title'>
							<Grid.Item>
								 {language_app_vip_name}
							</Grid.Item>
							<Grid.Item>
								 {language_app_vip_total}
							</Grid.Item>
						</Grid>
						<Grid columns={2} gap={0} >
							{vipData['vip'].map((item:any,index:number)=>{
								return <>
									<Grid.Item className='vip-list'>
										{item.groupname}
									</Grid.Item>
									<Grid.Item className='vip-list'>
										{item.shengjiedu}
									</Grid.Item>
								</>
							})}
						</Grid>
			</div>
		</div>
	)

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>vip等级</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<Tabs>
					<Tabs.Tab title='我的成长值记录' key='1'>
						
						<Grid columns={10} gap={8} className='vip-title'>
							<Grid.Item span={3}>
								 新增成长值
							</Grid.Item>
							<Grid.Item span={3}>
								 全部成长值
							</Grid.Item>
							<Grid.Item span={3}>
								 时间
							</Grid.Item>
							<Grid.Item span={1}>
								 
							</Grid.Item>
						</Grid>
						<Collapse>
							{vipData['my'].map((item:any, index:number) => {
								return<>
								<Collapse.Panel key={item.id} title={<>
									<Grid columns={3} gap={0} >
										<Grid.Item className='vip-my'>
											{item.amount}
										</Grid.Item>
										<Grid.Item className='vip-my'>
											{item.total}
										</Grid.Item>
										<Grid.Item className='vip-my'>
											{item.oddtime}
										</Grid.Item>
									</Grid>
								</>}>
									
									<div  className='proxy-member-info'>
										<Grid columns={24} gap={0}>
											<Grid.Item span={8} className='proxy-key'>
												新增成长值
											</Grid.Item>
											<Grid.Item span={16} className='proxy-value'>
												{item.amount}
											</Grid.Item>
											<Grid.Item span={8} className='proxy-key'>
												全部成长值
											</Grid.Item>
											<Grid.Item span={16} className='proxy-value'>
												{item.total}
											</Grid.Item>
											
											<Grid.Item span={8} className='proxy-key'>
												时间
											</Grid.Item>
											<Grid.Item span={16} className='proxy-value'>
												{item.oddtime}
											</Grid.Item>
											<Grid.Item span={8} className='proxy-key'>
												详情
											</Grid.Item>
											<Grid.Item span={16} className='proxy-value'>
												{item.typename}，成长值{item.amount>0?'+':''}{item.amount}
											</Grid.Item>
										</Grid>
									</div>
								</Collapse.Panel>
								</>
							})}
						</Collapse>
					</Tabs.Tab>
					<Tabs.Tab title='等级头衔' key='2'>
						
						<Grid columns={2} gap={8} className='vip-title'>
							<Grid.Item>
								 等级名称
							</Grid.Item>
							<Grid.Item>
								 等级积分
							</Grid.Item>
						</Grid>
						<Grid columns={2} gap={0} >
							{vipData['vip'].map((item:any,index:number)=>{
								return <>
									<Grid.Item className='vip-list'>
										{item.groupname}
									</Grid.Item>
									<Grid.Item className='vip-list'>
										{item.shengjiedu}
									</Grid.Item>
								</>
							})}
						</Grid>
					</Tabs.Tab>
				</Tabs>
			</div>
		</div>
	)
}