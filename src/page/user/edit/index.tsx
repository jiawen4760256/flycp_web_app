import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,List,Avatar,Space,Grid,Dialog,Picker,Calendar } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import avatarList from './avatar'
import Auth from '../../../lib/Auth';
import moment from "moment";
import { setLoading,getDictionary } from '../../../store'
import {useDispatch,useSelector } from 'react-redux'
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
	
	const {
		language_app_userpassword_success,
		language_app_useredit_title,
		language_app_useredit_cancel,
		language_app_useredit_sex,
		language_app_useredit_sex_1,
		language_app_useredit_sex_2,
		language_app_useredit_sex_3,
		language_app_useredit_submit,
		language_app_useredit_face,
		language_app_useredit_nick,
		language_app_useredit_nick_pls,
		language_app_useredit_null,
		language_app_useredit_qq,
		language_app_useredit_qq_pls,
		language_app_useredit_phone,
		language_app_useredit_phone_pls,
	} = useSelector(getDictionary);
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
						text: language_app_useredit_cancel,
					}
				],
			],
		})
	}

	const sexList = [
		[
			{ label: language_app_useredit_sex_1, value: '1' },
			{ label: language_app_useredit_sex_2, value: '2' },
			{ label: language_app_useredit_sex_3, value: '3' },
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
				<NavBar onBack={back}>{language_app_useredit_title}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<Form
						onFinish = {submit}
						layout='horizontal'
						footer={
							<Button block loading={loading} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
								{language_app_useredit_submit}
							</Button>
						}
					>
					<Form.Item
						name='face'
						label={language_app_useredit_face}
						onClick={selectAvatar}
						clickable={false}
					>
						<Avatar src={userAvatar} style={{ '--size': '64px',"--border-radius":"50%" }} />
					</Form.Item>
					<Form.Item
						name='nickname'
						label={language_app_useredit_nick}
						initialValue={userInfo['nickname']}
					>
						<Input  placeholder={language_app_useredit_nick_pls}/>
					</Form.Item>
					<Form.Item
						name='sex'
						label={language_app_useredit_sex}
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
									return items.map(item => item?.label ?? language_app_useredit_null)
								}
							}}
						</Picker>
					</Form.Item>
					{/* <Form.Item
						name='birthday'
						label='生日'
						onClick={selectDate}
						
					>
						{userbirthday}
					</Form.Item> */}
					{/* <Form.Item
						name='qq'
						label={language_app_useredit_qq}
						
						initialValue={userInfo['qq']}
					>
						<Input placeholder={language_app_useredit_qq_pls} />
					</Form.Item> */}
					<Form.Item
						name='phone'
						label={language_app_useredit_phone}
						initialValue={userInfo['phone']}
					>
						<Input placeholder={language_app_useredit_phone_pls} />
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}