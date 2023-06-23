import React, { useState,useEffect } from 'react'
import { NavBar, Tabs,Form,Button,Input,TextArea,Toast,DatePicker,Picker } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../../lib/Auth';
import './index.css'
export default () => {
	
	const [loading, setLoading] = useState(false)
	
	const userInfo:any = JSON.parse(localStorage.getItem("userInfo")??'{"tradepassword":false}')
	let navigate = useNavigate()
	Auth.page(navigate)
	let tradepasswordHtml = (<></>)
	{if(userInfo.tradepassword){
		tradepasswordHtml = (<Form.Item
			name='pwd'
			label='旧密码'
			rules={[{ required: true, message: '旧密码不能为空' }]}
		>
			<Input type='password' placeholder='请输入原密码' />
		</Form.Item>)
		
	}}
	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}

	const submitUser = function(values:any){
		setLoading(true)
		Auth.ajax(navigate,'user/password',values)
		.then(function (response) {
			Toast.show({
				icon: 'success',
				content: '修改成功！',
			})
			setTimeout(()=>{
				navigate(-1)
			},1000)
		})
		.catch(function (error) {
			setLoading(false)
		})
	}
	const submitAmount = function(values:any){
		setLoading(true)
		Auth.ajax(navigate,'user/password-amount',values)
		.then(function (response) {
			Toast.show({
				icon: 'success',
				content: '修改成功！',
			})
			setTimeout(()=>{
				navigate(-1)
			},1000)
		})
		.catch(function (error) {
			setLoading(false)
		})
	}
	useEffect(() => {
  },[])

	return (
		<div className='App-main'>
			<header className="App-header"   style={{color:'#000'}}>
      	<NavBar className='app-header' onBack={back}>密码设置</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<Tabs>
					<Tabs.Tab title='登录密码' key='1'>
						<Form
							onFinish = {submitUser}
							layout='vertical'
							className='password-from'
							footer={
								<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
									保存修改
								</Button>
							}
						>
							<Form.Item
								name='pwd'
								label='原密码'
								rules={[{ required: true, message: '原密码不能为空' }]}
							>
								<Input type='password' placeholder='请输入原密码' />
							</Form.Item>
							<Form.Item
								name='pwd2'
								label='新密码'
								rules={[{ required: true, message: '新密码不能为空' }]}
							>
								<Input type='password' placeholder='请输入新密码' />
							</Form.Item>
							<Form.Item
								name='pwd3'
								label='确认密码'
								rules={[{ required: true, message: '确认密码不能为空' }]}
							>
								<Input type='password' placeholder='请输入确认密码' />
							</Form.Item>
						</Form>
						
					</Tabs.Tab>
					<Tabs.Tab title='资金密码' key='2'>
					<Form
							onFinish = {submitAmount}
							layout='vertical'
							className='password-from'
							footer={
								<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
									保存修改
								</Button>
							}
						>
							{tradepasswordHtml}
							<Form.Item
								name='pwd2'
								label='新密码'
								rules={[{ required: true, message: '新密码不能为空' }]}
							>
								<Input type='password' placeholder='请输入新密码' />
							</Form.Item>
							<Form.Item
								name='pwd3'
								label='确认密码'
								rules={[{ required: true, message: '确认密码不能为空' }]}
							>
								<Input type='password' placeholder='请输入确认密码' />
							</Form.Item>
						</Form>
					</Tabs.Tab>
				</Tabs>
			</div>
		</div>
	)
}