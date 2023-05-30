import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,DatePicker,Picker,Popup,List, Space,Divider } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import { 
	SearchOutline,
	ExclamationCircleOutline,
} from 'antd-mobile-icons'
import Auth from '../../../lib/Auth';
export default () => {
	
	const [loading, setLoading] = useState(false)
	const [basicColumns, setBasicColumns] = useState([[]])
	const [basicColumns1, setBasicColumns1] = useState([[]])
	const [visible, setVisible] = useState(false)
  const [visible6, setVisible6] = useState(false)
  const [value, setValue] = useState<any>({})
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
				setBasicColumns1(response)
		})
	}
	const submit = function(values:any){
		if(!value.value){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: '请选择银行！',
			})
			return;
		}
		setLoading(true)
		values.bankcode = value.value
		Auth.ajax(navigate,"user/bankadd",values)
		.then(function (response:any) {
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
      	<NavBar className='app-header' onBack={back}>添加银行卡</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
			<Form
					onFinish = {submit}
					layout='horizontal'
					footer={
						<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
							确认添加
						</Button>
					}
					className='prefix-width'
				>
					<Form.Item
						name='bankcode'
						label='兑换银行'
						// trigger='onConfirm'
						
						rules={[{ message: '兑换银行不能为空' }]}
						onClick={() => {
							setVisible6(true)
						}}
						
					>
						
						{value.value?value.label:(<div style={{color:"#ccc"}}>
							请选择兑换银行
						</div>)}
						{/* <Picker
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
						</Picker> */}
					</Form.Item>
					{/* <Form.Item
						name='bankaddress'
						label='开户地点'
						rules={[{ required: true, message: '开户地点不能为空' }]}
					>
						<Input placeholder='请输入开户地点' />
					</Form.Item> */}
					<Form.Item
						name='accountname'
						label='开户姓名'
						rules={[{ required: true, message: '开户姓名不能为空' }]}
					>
						<Input  placeholder='请输入开户姓名' autoComplete="off" />
					</Form.Item>
					<Form.Item
						name='banknumber'
						label='卡号'
						rules={[{ required: true, message: '卡号不能为空' }]}
					>
						<Input placeholder='请输入卡号'  autoComplete="off" />
					</Form.Item>
					<Form.Item
						name='pwd'
						label='资密'
						rules={[{ required: true, message: '资密不能为空' }]}
					>
						<Input type='password' placeholder='请输入资密'  autoComplete="off" />
					</Form.Item>
					{tradepasswordHtml}
				</Form>
				<Popup
					visible={visible6}
					onMaskClick={() => {
						setVisible6(false)
					}}
					position='right'
          bodyStyle={{ width: '100vw' }}
				>
					<header className="App-header" style={{position: "unset"}} >
						<NavBar className='app-header' onBack={()=>{
							setVisible6(false)
						}}>选择银行</NavBar>
					</header>
					{/* <Form layout='horizontal'>
						<Form.Item label='搜索' name='username'>
							<Input placeholder='请输入银行名称' clearable />
						</Form.Item>
					</Form> */}
					<Space className='search-input'>
						<SearchOutline style={{fontSize:20}}/>
						<Input placeholder='请输入银行名称'  onChange={(value:string)=>{
							let newList = [[]];
							for(let i=0;i<basicColumns1[0].length;i++){
								let str:string = basicColumns1[0][i]['label']
								if(str.indexOf(value) != -1){
									newList[0].push(basicColumns1[0][i])
								}
							}
							setBasicColumns(newList)
						}}/>
					</Space>
					{/* <Divider /> */}
					<div
						style={{ height: '100vh', overflowY: 'scroll' }}
					>
						

						<List >
						{basicColumns[0].map((item:any,index)=>{
							return <>
								<List.Item  onClick={()=>{
									setValue(item)
									setVisible6(false)
								}}>{item.label}</List.Item>
							</>
						})}

						</List>
					</div>
				</Popup>
			</div>
		</div>
	)
}