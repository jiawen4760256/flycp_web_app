import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,List,Avatar,Space,Grid,Dialog,Picker,Calendar } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import avatarList from './avatar'
import Auth from '../../../lib/Auth';
import moment from "moment";
export default () => {
	let navigate = useNavigate()
	Auth.page(navigate)
	const userInfo:any = JSON.parse(localStorage.getItem("userInfo")??"")
	const [loading, setLoading] = useState(false)
	const [userAvatar, setUserAvatar] = useState<string>(userInfo['face'])
	const [userbirthday, setUserBirthday] = useState<string>(userInfo['birthday'])
	const [visible, setVisible] = useState(false)
	const [sexValue, setSexValue] = useState<(string | null)[]>([userInfo['sex']])
  const back = () =>{
		navigate(-1);
	}
	const submit = function(values:any){
		setLoading(true)
		values.birthday = userbirthday
		values.face = userAvatar
		values.sex = sexValue
		
		console.log(values);
		Auth.ajax(navigate,'user/edit',values)
		.then(function (response) {
			Toast.show({
				icon: 'success',
				content: '修改成功',
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

	const onSelectAvatar=(avatar:string)=>{
		setUserAvatar(avatar)
		Dialog.clear()
	}
	let avatarListHtml = avatarList.map((item,index)=>{
		return( <Avatar lazy  className='user-edit-avatar' src={item} style={{ '--size': '60px',"--border-radius":"50%" }} onClick={()=>{onSelectAvatar(item)}}/> )
	})
	const selectAvatar=()=>{
		Dialog.show({
			content:(<Grid columns={4}>{avatarListHtml}</Grid>) ,
			closeOnAction: true,
			actions: [
				[
					{
						key: 'cancel',
						text: '取消',
					}
				],
			],
		})
	}

	const sexList = [
		[
			{ label: '保密', value: '1' },
			{ label: '男', value: '2' },
			{ label: '女', value: '3' },
		]
	]
	let tmpDate:string
	const selectDate=()=>{
		Dialog.show({
			content: (        
				<Calendar
					// defaultValue={[date1,date2]}
					selectionMode='single'
					onChange={(val:any) => {
						console.log(val)
						tmpDate = val
						
					}}
				/>
			),
			closeOnAction: true,
			actions: [
				[
					{
						key: 'cancel',
						text: '取消',
					},
					{
						key: 'confirm',
						text: '确认',
						bold: true,
						danger: true,
						onClick: () => {
							setUserBirthday(tmpDate);
							setUserBirthday(moment(tmpDate).format('YYYY-MM-DD'))
						},
					},
				],
			],
		})
	}


	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar onBack={back}>编辑信息</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<Form
						onFinish = {submit}
						layout='horizontal'
						footer={
							<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
								提交
							</Button>
						}
					>
					<Form.Item
						name='face'
						label='头像'
						onClick={selectAvatar}
						clickable={false}
					>
						<Avatar src={userAvatar} style={{ '--size': '64px',"--border-radius":"50%" }} />
					</Form.Item>
					<Form.Item
						name='nickname'
						label='昵称'
						initialValue={userInfo['nickname']}
					>
						<Input  placeholder='请输入昵称'/>
					</Form.Item>
					<Form.Item
						name='sex'
						label='性别'
						onClick={() => {
							setVisible(true)
						}}
					>
						<Picker
							columns={sexList}
							visible={visible}
							onClose={() => {
								setVisible(false)
							}}
							value={sexValue}
							onConfirm={setSexValue}
							// defaultValue={[userInfo['sex']]}    
						>
							{items => {
								if (items.every(item => item === null)) {
									return userInfo['sexShow']
								} else {
									return items.map(item => item?.label ?? '未选择')
								}
							}}
						</Picker>
					</Form.Item>
					<Form.Item
						name='birthday'
						label='生日'
						onClick={selectDate}
						
					>
						{userbirthday}
					</Form.Item>
					<Form.Item
						name='qq'
						label='联系QQ'
						
						initialValue={userInfo['qq']}
					>
						<Input placeholder='请输入联系QQ' />
					</Form.Item>
					<Form.Item
						name='phone'
						label='联系电话'
						initialValue={userInfo['phone']}
					>
						<Input placeholder='请输入联系电话' />
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}