import React, { useState , useEffect} from 'react'
import axios from 'axios';
import { NavBar, Image,Form,Button,Input,Checkbox,Toast } from 'antd-mobile'
import { ExclamationCircleOutline } from 'antd-mobile-icons'
import {
  useNavigate,useParams
} from 'react-router-dom'
import Qs from 'qs'
import './index.css'
import { useSelector } from 'react-redux';
import {
  getHomeList,
	getDictionary
} from '../../store';
import Api from '../../lib/Api';
import Auth from '../../lib/Auth';
export default () => {
	useEffect(() => {
	},[])
	let navigate = useNavigate()
	const params = useParams() 
	const {kefu,website_logo3} = useSelector(getHomeList);
	const {
		language_app_home_login_title,
		language_app_home_login_account,
		language_app_home_login_wpd,
		language_app_home_login_account_p,
		language_app_home_login_wpd_p,
		language_app_home_login_remember,
		language_app_home_login_login,
		language_app_home_login_register,
		language_app_home_login_issue,
		language_app_home_login_online,
		language_app_home_login_success,
		language_app_error
	} = useSelector(getDictionary);
	const [loading, setLoading] = useState(false)
	let nameAndPwd = {name:(params['name']=='null'?"":params['name']),pwd:''}
  const back = () =>{
		navigate(-1);
	}
	const demoSrc2 = '/app/logo_top.png'
	const demoSrc3 = '/app/logo_bottom.png'
	const submit = function(values:any){
		setLoading(true)
		axios.post(Api.address()+'home/login', Qs.stringify(values),Auth.verify(values))
		.then(function (response) {
			if(response.data.code == 0){
				localStorage.setItem("userInfo", JSON.stringify(response.data.data))
				localStorage.setItem("token",response.data.data.token)
				if(values.nameAndPwd == "1"){
					localStorage.setItem("nameAndPwd", JSON.stringify({name:values.name,pwd:values.pwd}))
				}else{
					localStorage.removeItem("nameAndPwd")
				}
				Toast.show({
					icon: 'success',
					content: language_app_home_login_success,
				})
				setTimeout(()=>{
					navigate('/')
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
	if(localStorage.getItem("nameAndPwd")){
		nameAndPwd = JSON.parse(localStorage.getItem("nameAndPwd")??"")
	}
	// console.log(website_logo3)
	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar onBack={back}>{language_app_home_login_title}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<div className='login-img'>
					{website_logo3==""?<></>:<Image lazy height={50} fit='scale-down'  src={website_logo3} />}
				</div>
				<div>
					<Form
						layout='horizontal'
						onFinish={submit}
						footer={
							<Button loading={loading} block type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
								{language_app_home_login_login}
							</Button>
						}
						className="login-form"
					>
						<Form.Item
							name='name'
							label={language_app_home_login_account}
							initialValue={nameAndPwd.name}
							rules={[{ required: false, message: language_app_home_login_account_p }]}
						>
							<Input  placeholder={language_app_home_login_account_p} />
						</Form.Item>
						<Form.Item
							name='pwd'
							label={language_app_home_login_wpd}
							initialValue={nameAndPwd.pwd}
							rules={[{ required: false, message: language_app_home_login_wpd_p }]}
						>
							<Input type="password"  placeholder={language_app_home_login_wpd_p} />
						</Form.Item>
						<Form.Item 
							name='nameAndPwd'
							initialValue={nameAndPwd.pwd==""?"":"1"}
						>
								<Checkbox defaultChecked={nameAndPwd.pwd==""?false:true}  value='1'>{language_app_home_login_remember}</Checkbox>
						</Form.Item>
					</Form>

				</div>
				
				<div style={{padding:"0 12px"}}>
					<Button block type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}
						onClick={()=>{
							navigate('/register')
						}}
					>
						{language_app_home_login_register}
					</Button>
				</div>
				<div className='kefu'>
					{language_app_home_login_issue}
					<a href={kefu}>{language_app_home_login_online}</a>
				</div>
				
				{/* <div className='login-img2'>
					<Image lazy src={demoSrc3} />
				</div> */}
			</div>
		</div>
	)
}