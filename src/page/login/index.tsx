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
} from '../../store';
import Api from '../../lib/Api';
import Auth from '../../lib/Auth';
export default () => {
	useEffect(() => {
	},[])
	let navigate = useNavigate()
	const params = useParams() 
	const {kefu,website_logo3} = useSelector(getHomeList);
	
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
					content: '登录成功！',
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
				content: '服务繁忙，稍后再试！',
			})
			setLoading(false)
		})
	}
	if(localStorage.getItem("nameAndPwd")){
		nameAndPwd = JSON.parse(localStorage.getItem("nameAndPwd")??"")
	}
	console.log(website_logo3)
	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar onBack={back}>欢迎登录使用</NavBar>
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
								登录
							</Button>
						}
						className="login-form"
					>
						<Form.Item
							name='name'
							label='账号'
							initialValue={nameAndPwd.name}
							rules={[{ required: false, message: '账号不能为空' }]}
						>
							<Input  placeholder='请输入账号' />
						</Form.Item>
						<Form.Item
							name='pwd'
							label='密码'
							initialValue={nameAndPwd.pwd}
							rules={[{ required: false, message: '密码不能为空' }]}
						>
							<Input type="password"  placeholder='请输入密码' />
						</Form.Item>
						<Form.Item 
							name='nameAndPwd'
							initialValue={nameAndPwd.pwd==""?"":"1"}
						>
								<Checkbox defaultChecked={nameAndPwd.pwd==""?false:true}  value='1'>记住密码</Checkbox>
						</Form.Item>
					</Form>

				</div>
				
				<div style={{padding:"0 12px"}}>
					<Button block type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}
						onClick={()=>{
							navigate('/register')
						}}
					>
						马上注册
					</Button>
				</div>
				<div className='kefu'>
					有问题请联系
					<a href={kefu}>在线客服</a>
				</div>
				
				{/* <div className='login-img2'>
					<Image lazy src={demoSrc3} />
				</div> */}
			</div>
		</div>
	)
}