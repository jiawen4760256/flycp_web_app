import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast } from 'antd-mobile'
import { ExclamationCircleOutline} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import axios from 'axios';
import Qs from 'qs'

import { useSelector } from 'react-redux';
import {
  getHomeList,
} from '../../store';
import './index.css'
import Api from '../../lib/Api';
import Auth from '../../lib/Auth';
export default () => {
	
	const [loading, setLoading] = useState(false)
	const {kefu} = useSelector(getHomeList);
	let navigate = useNavigate()
	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}
	const demoSrc2 = '/app/logo_top.png'
	const submit = function(values:any){
		setLoading(true)
		console.log(values);
		axios.post(Api.address()+'home/register', Qs.stringify(values),Auth.verify(values))
		.then(function (response) {
			if(response.data.code == 0){
				Toast.show({
					icon: 'success',
					content: '创建成功！',
				})
				localStorage.removeItem("nameAndPwd")
				setTimeout(()=>{
					navigate('/login/'+values.name)
				},1000)
			}else{
				
				Toast.show({
					icon: <ExclamationCircleOutline />,
					content: response.data.msg,
				})
				setLoading(false)
			}
		})
		.catch(function (error) {
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: '服务繁忙，稍后再试！',
			})
			setLoading(false)
		})
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>欢迎注册使用</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<div className='login-img'>
					<Image lazy height={50} fit='scale-down' src={demoSrc2} />
				</div>
				<div>
					<Form
						onFinish = {submit}
						layout='horizontal'
						footer={
							<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
								创建账户
							</Button>
						}
					>
						<Form.Item
							name='pid'
							label='邀请码'
							rules={[{ required: true, message: '邀请码不能为空' }]}
						>
							<Input placeholder='请输入邀请码' />
						</Form.Item>
						<Form.Item
							name='name'
							label='账号'
							rules={[{ required: true, message: '账号不能为空' }]}
						>
							<Input  placeholder='请输入6到10位字母和数字' />
						</Form.Item>
						<Form.Item
							name='pwd'
							label='密码'
							rules={[{ required: true, message: '密码不能为空' }]}
						>
							<Input type='password' placeholder='请输入密码' />
						</Form.Item>
						<Form.Item
							name='pwd2'
							label='确认密码'
							rules={[{ required: true, message: '确认密码不能为空' }]}
						>
							<Input type='password' placeholder='请输入确认密码' />
						</Form.Item>
					</Form>

				</div>
				<div className='kefu'>
					有问题请联系
					<a href={kefu}>在线客服</a>
				</div>
			</div>
		</div>
	)
}