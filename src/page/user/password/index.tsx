import React, { useState,useEffect } from 'react'
import { NavBar, Tabs,Form,Button,Input,TextArea,Toast,DatePicker,Picker } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../../lib/Auth';
import './index.css'
import { setLoading,getDictionary } from '../../../store'
import {useDispatch ,useSelector} from 'react-redux'
export default () => {
	
	const [loading, setLoading] = useState(false)
	
	const {      
		language_app_userpassword_title,
		language_app_userpassword_pwd,
		language_app_userpassword_pwd_pls,
		language_app_userpassword_success,
		language_app_userpassword_login,
		language_app_userpassword_save,
		language_app_userpassword_pwd2,
		language_app_userpassword_pwd2_pls,
		language_app_userpassword_pwd3,
		language_app_userpassword_pwd3_pls,
		language_app_userpassword_a_title,
	} = useSelector(getDictionary)
	const userInfo:any = JSON.parse(localStorage.getItem("userInfo")??'{"tradepassword":false}')
	let navigate = useNavigate()
	Auth.page(navigate)
	let tradepasswordHtml = (<></>)
	{if(userInfo.tradepassword){
		tradepasswordHtml = (<Form.Item
			name='pwd'
			label={language_app_userpassword_pwd}
			rules={[{ required: true, message: language_app_userpassword_pwd_pls }]}
		>
			<Input type='password' placeholder={language_app_userpassword_pwd_pls} />
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
				content: language_app_userpassword_success,
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
				content: language_app_userpassword_success,
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
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>{language_app_userpassword_title}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<Tabs>
					<Tabs.Tab title={language_app_userpassword_login} key='1'>
						<Form
							onFinish = {submitUser}
							layout='vertical'
							className='password-from'
							footer={
								<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
									{language_app_userpassword_save}
								</Button>
							}
						>
							<Form.Item
								name='pwd'
								label={language_app_userpassword_pwd}
								rules={[{ required: true, message: language_app_userpassword_pwd }]}
							>
								<Input type='password' placeholder={language_app_userpassword_pwd} />
							</Form.Item>
							<Form.Item
								name='pwd2'
								label={language_app_userpassword_pwd2}
								rules={[{ required: true, message: language_app_userpassword_pwd2_pls }]}
							>
								<Input type='password' placeholder={language_app_userpassword_pwd2_pls} />
							</Form.Item>
							<Form.Item
								name='pwd3'
								label={language_app_userpassword_pwd3}
								rules={[{ required: true, message: language_app_userpassword_pwd3_pls }]}
							>
								<Input type='password' placeholder={language_app_userpassword_pwd3_pls} />
							</Form.Item>
						</Form>
						
					</Tabs.Tab>
					<Tabs.Tab title={language_app_userpassword_a_title} key='2'>
					<Form
							onFinish = {submitAmount}
							layout='vertical'
							className='password-from'
							footer={
								<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
									{language_app_userpassword_save}
								</Button>
							}
						>
							{tradepasswordHtml}
							<Form.Item
								name='pwd2'
								label={language_app_userpassword_pwd2}
								rules={[{ required: true, message: language_app_userpassword_pwd2_pls }]}
							>
								<Input type='password' placeholder={language_app_userpassword_pwd2_pls} />
							</Form.Item>
							<Form.Item
								name='pwd3'
								label={language_app_userpassword_pwd3}
								rules={[{ required: true, message: language_app_userpassword_pwd3_pls }]}
							>
								<Input type='password' placeholder={language_app_userpassword_pwd3_pls} />
							</Form.Item>
						</Form>
					</Tabs.Tab>
				</Tabs>
			</div>
		</div>
	)
}