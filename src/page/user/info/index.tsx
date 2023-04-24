import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,List,Avatar,Space,Grid,Divider } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../../lib/Auth';
import { setLoading } from '../../../store'
import {useDispatch } from 'react-redux'

export default () => {
	const dispatch = useDispatch()
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
				<NavBar  onBack={back}>个人信息</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor:'#fff'}}>
				
				<List header='' >
					<List.Item className='user-info-name' extra={userInfo["realname"]} clickable={false}>
						真实姓名
					</List.Item>
					<List.Item className='user-info-name' extra={userInfo["username"]} clickable={false}>
						会员账号
					</List.Item>
				</List>

				<br></br>
				<List header=''>
					<List.Item extra={userInfo["nickname"]} onClick={onEdit}>
						昵称
					</List.Item>
					<List.Item extra={userInfo["sexShow"]} onClick={onEdit}>
						性别
					</List.Item>
					<List.Item extra={userInfo["birthday"]} onClick={onEdit}>
						生日
					</List.Item>
					<List.Item extra={userInfo["qq"]} onClick={onEdit}>
						联系QQ
					</List.Item>
					<List.Item extra={userInfo["phone"]} onClick={onEdit}>
						手机号
					</List.Item>
				</List>

				<br></br>
				<List header='' >
					<List.Item className='user-info-name' extra={userInfo['jinjijilu']} clickable={false}>
						用户等级
					</List.Item>
				</List>
			</div>
		</div>
	)
}