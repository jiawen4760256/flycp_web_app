import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,List,Avatar,Space,Grid,Divider } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../../lib/Auth';
import { setLoading,getDictionary } from '../../../store'
import {useDispatch ,useSelector} from 'react-redux'

export default () => {
	const dispatch = useDispatch()
	const {      
		language_app_user_info,
		language_app_userinfo_name,
		language_app_userinfo_account,
		language_app_userinfo_nick,
		language_app_userinfo_sex,
		language_app_userinfo_day,
		language_app_userinfo_qq,
		language_app_userinfo_mobile,
		language_app_userinfo_vip,
	} = useSelector(getDictionary)
	let navigate = useNavigate()
	Auth.page(navigate)
	const [userInfo, setUserInfo] = useState<any>({})
  const back = () =>{
		navigate(-1);
	}
	const userinfo = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'user/info')
		.then(function (response) {
			dispatch(setLoading(false))
			setUserInfo(response);
			localStorage.setItem("userInfo", JSON.stringify(response))
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	useEffect(() => {
		userinfo()
  },[])
	const onEdit=()=>{
		Auth.navigate(navigate,'/user/edit')
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar  onBack={back}>{language_app_user_info}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				
				<List header='' >
					<List.Item className='user-info-name' extra={userInfo["realname"]} clickable={false}>
						{language_app_userinfo_name}
					</List.Item>
					<List.Item className='user-info-name' extra={userInfo["username"]} clickable={false}>
						{language_app_userinfo_account}
					</List.Item>
				</List>

				<br></br>
				<List header=''>
					<List.Item extra={userInfo["nickname"]} onClick={onEdit}>
						{language_app_userinfo_nick}
					</List.Item>
					<List.Item extra={userInfo["sexShow"]} onClick={onEdit}>
						{language_app_userinfo_sex}
					</List.Item>
					{/* <List.Item extra={userInfo["birthday"]} onClick={onEdit}>
						{language_app_userinfo_day}
					</List.Item> */}
					{/* <List.Item extra={userInfo["qq"]} onClick={onEdit}>
						{language_app_userinfo_qq}
					</List.Item> */}
					<List.Item extra={userInfo["phone"]} onClick={onEdit}>
						{language_app_userinfo_mobile}
					</List.Item>
				</List>

				<br></br>
				<List header='' >
					<List.Item className='user-info-name' extra={userInfo['jinjijilu']} clickable={false}>
						{language_app_userinfo_vip}
					</List.Item>
				</List>
			</div>
		</div>
	)
}