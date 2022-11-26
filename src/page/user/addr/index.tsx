import React, { useState,useEffect } from 'react'
import { NavBar, Tabs,Form,Button,Input,TextArea,Toast,DatePicker,Picker } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../../lib/Auth';
import './index.css'
export default () => {
	
	const [loading, setLoading] = useState(false)
	
	const [addr, setAddr] = useState<any>({name:'',mobile:'',addr:''})
	let navigate = useNavigate()
	Auth.page(navigate)
	useEffect(() => {
		Auth.ajax(navigate,'user/addrinfo',{})
		.then(function (response:any) {
			// console.log(response)
			setAddr(response)
		})
		.catch(function (error) {
			console.log(error)
		})
	},[])
  const back = () =>{
		navigate(-1);
	}

	const submitUser = function(values:any){
		setLoading(true)
		Auth.ajax(navigate,'user/addr',values)
		.then(function (response) {
			Toast.show({
				icon: 'success',
				content: '修改成功！',
			})
			setLoading(false)
			// setTimeout(()=>{
			// 	navigate(-1)
			// },1000)
		})
		.catch(function (error) {
			setLoading(false)
		})
	}
	
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>编辑收货地址</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				{addr.name == ''?<></>:<>
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
						name='name'
						label='收货人'
						rules={[{ required: true, message: '收货人不能为空' }]}
						initialValue={addr.name}
						
					>
						<Input   placeholder='请输入收货人' />
					</Form.Item>
					<Form.Item
						name='mobile'
						label='手机号码'
						rules={[{ required: true, message: '手机号码不能为空' }]}
						initialValue={addr.mobile}
					>
						<Input  placeholder='请输入手机号码' />
					</Form.Item>
					<Form.Item
						name='addr'
						label='详细地址'
						rules={[{ required: true, message: '详细地址不能为空' }]}
						initialValue={addr.addr}
					>
						<TextArea
							placeholder='请输入详细地址'
							maxLength={200}
							rows={3}
							showCount
						/>
					</Form.Item>
				</Form>
				
				</>}
			</div>
		</div>
	)
}