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
	getDictionary
} from '../../store';
import './index.css'
import Api from '../../lib/Api';
import Auth from '../../lib/Auth';
export default () => {
	
	const [loading, setLoading] = useState(false)
	const {kefu,website_logo3} = useSelector(getHomeList);
	const {
		language_app_error,
		language_app_home_register_title,
		language_app_home_register_code,
		language_app_home_register_code_p,
		language_app_home_register_account,
		language_app_home_register_account_p,
		language_app_home_register_wpd,
		language_app_home_register_wpd_p,
		language_app_home_register_wpd1,
		language_app_home_register_wpd1_p,
		language_app_home_register_register,
		language_app_home_register_success,
		language_app_home_login_issue,
		language_app_home_login_online,
	} = useSelector(getDictionary);
	const [parentid, setParentid] = useState(localStorage.getItem('p')?.toString())
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
		if(parentid){
			values.parentid = parentid
		}
		values.name = values.name.split(" ").join("")
		axios.post(Api.address()+'home/register', Qs.stringify(values),Auth.verify(values))
		.then(function (response) {
			if(response.data.code == 0){
				Toast.show({
					icon: 'success',
					content: language_app_home_register_success,
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
				content: language_app_error,
			})
			setLoading(false)
		})
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>{language_app_home_register_title}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<div className='login-img'>
					{website_logo3==""?<></>:<Image lazy height={50} fit='scale-down'  src={website_logo3} />}
				</div>
				<div>
					<Form
						onFinish = {submit}
						layout='horizontal'
						// layout='vertical'
						footer={
							<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
								{language_app_home_register_register}
							</Button>
						}
					>
						{(!parentid || parentid=="0")?<>
						<Form.Item
							name='pid'
							label={language_app_home_register_code}
							rules={[{ required: true, message: language_app_home_register_code_p }]}
						>
							<Input placeholder={language_app_home_register_code_p} />
						</Form.Item>
						</>:<></>}
						<Form.Item
							name='name'
							label={language_app_home_register_account}
							rules={[{ required: true, message: language_app_home_register_account_p }]}
						>
							<Input  placeholder={language_app_home_register_account_p} />
						</Form.Item>
						<Form.Item
							name='pwd'
							label={language_app_home_register_wpd}
							rules={[{ required: true, message: language_app_home_register_wpd }]}
						>
							<Input type='password' placeholder={language_app_home_register_wpd_p} />
						</Form.Item>
						<Form.Item
							name='pwd2'
							label={language_app_home_register_wpd1}
							rules={[{ required: true, message: language_app_home_register_wpd1_p }]}
						>
							<Input type='password' placeholder={language_app_home_register_wpd1_p} />
						</Form.Item>
					</Form>

				</div>
				<div className='kefu'>
					{language_app_home_login_issue}
					<a href={kefu}>{language_app_home_login_online}</a>
				</div>
			</div>
		</div>
	)
}