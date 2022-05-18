import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,DatePicker,Picker } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../../lib/Auth';
export default () => {
	
	const [loading, setLoading] = useState(false)
	const [basicColumns, setBasicColumns] = useState([])
	const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<(string | null)[]>([])
	const userInfo:any = JSON.parse(localStorage.getItem("userInfo")??'{"tradepassword":false}')
	let navigate = useNavigate()
	Auth.page(navigate)
	let tradepasswordHtml = (<></>)
	{if(!userInfo.tradepassword){
		tradepasswordHtml = (
			<Form.Item
				name='pwd2'
				label='确认资密'
				rules={[{ required: true, message: '确认资密不能为空' }]}
			>
				<Input type='password' placeholder='请输入确认资密' />
			</Form.Item>)
		
	}}
	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}
	const sysbank = function(){
		Auth.ajax(navigate,'user/sysbank')
		.then(function (response:any) {
				setBasicColumns(response)
		})
	}
	const submit = function(values:any){
		setLoading(true)
		Auth.ajax(navigate,"user/bankadd",values)
		.then(function (response) {
			if(localStorage.getItem("userInfo")){
				let userinfo = JSON.parse(localStorage.getItem("userInfo")??"")
				userinfo.tradepassword = response.tradepassword
				localStorage.setItem("userInfo", JSON.stringify(userinfo))
			}

			Toast.show({
				icon: 'success',
				content: '绑定成功！',
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
		sysbank();
  },[])

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>绑定银行卡</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
			<Form
					onFinish = {submit}
					layout='horizontal'
					footer={
						<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
							确认绑定
						</Button>
					}
				>
					<Form.Item
						name='bankcode'
						label='兑换银行'
						trigger='onConfirm'
						
						rules={[{ required: true, message: '兑换银行不能为空' }]}
						onClick={() => {
							setVisible(true)
						}}
					>
						<Picker
							columns={basicColumns}
							visible={visible}
							onClose={() => {
								setVisible(false)
							}}
							value={value}
							onConfirm={setValue}
							onSelect={(val, extend) => {
								console.log('onSelect', val, extend.items)
							}}
						>
							{items => {
								if (items.every(item => item === null)) {
									return (<span className='withdraw-span'>请选择兑换银行</span>)
								} else {
									return items.map(item => item?.label ?? '请选择兑换银行').join(' - ')
								}
							}}
						</Picker>
					</Form.Item>
					<Form.Item
						name='bankaddress'
						label='开户地点'
						rules={[{ required: true, message: '开户地点不能为空' }]}
					>
						<Input placeholder='请输入开户地点' />
					</Form.Item>
					<Form.Item
						name='accountname'
						label='姓名'
						rules={[{ required: true, message: '姓名不能为空' }]}
					>
						<Input  placeholder='请输入姓名' />
					</Form.Item>
					<Form.Item
						name='banknumber'
						label='卡号'
						rules={[{ required: true, message: '卡号不能为空' }]}
					>
						<Input placeholder='请输入卡号' />
					</Form.Item>
					<Form.Item
						name='banknumber2'
						label='确认卡号'
						rules={[{ required: true, message: '确认卡号不能为空' }]}
					>
						<Input placeholder='请输入确认卡号' />
					</Form.Item>
					<Form.Item
						name='pwd'
						label='资密'
						rules={[{ required: true, message: '资密不能为空' }]}
					>
						<Input type='password' placeholder='请输入资密' />
					</Form.Item>
					{tradepasswordHtml}
				</Form>
			</div>
		</div>
	)
}