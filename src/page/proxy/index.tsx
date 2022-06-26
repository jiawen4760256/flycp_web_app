import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,List,Avatar,Space,Grid,Card } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import { 
	HandPayCircleOutline,
	GiftOutline
} from 'antd-mobile-icons'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'

export default () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	const [userData, setUserData] = useState<any>("")
	const demoSrc = '/app/vip.png';
  const back = () =>{
		navigate(-1);
	}
	const userinfo = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'user/info')
		.then(function (response) {
			dispatch(setLoading(false))
			setUserData(response);
			localStorage.setItem("userInfo", JSON.stringify(response))
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	
	useEffect(() => {
		userinfo()
  },[])


	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header' onBack={back}>代理中心</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				<div className='proxy-info'>
				<Grid columns={12} gap={0}>
          <Grid.Item span={2} className='proxy-key'>
						我的下线
          </Grid.Item>
          <Grid.Item span={10} className='proxy-value proxy-total'>
						10人
          </Grid.Item>
          <Grid.Item span={2} className='proxy-key'>
						会员人数
          </Grid.Item>
          <Grid.Item span={4} className='proxy-value'>
						10人
          </Grid.Item>
          <Grid.Item span={2} className='proxy-key'>
						今日新增
          </Grid.Item>
          <Grid.Item span={4} className='proxy-value'>
						10人
          </Grid.Item>

					
          <Grid.Item span={2} className='proxy-key'>
						代理人数
          </Grid.Item>
          <Grid.Item span={4} className='proxy-value'>
						10人
          </Grid.Item>
          <Grid.Item span={2} className='proxy-key'>
						今日新增
          </Grid.Item>
          <Grid.Item span={4} className='proxy-value'>
						10人
          </Grid.Item>

					
          <Grid.Item span={2} className='proxy-key'>
						昨日充值
          </Grid.Item>
          <Grid.Item span={4} className='proxy-value'>
						100
          </Grid.Item>
          <Grid.Item span={2} className='proxy-key'>
						今日充值
          </Grid.Item>
          <Grid.Item span={4} className='proxy-value'>
						106
          </Grid.Item>
        </Grid>

				</div>

				<div className='user-button-list'>
					<List header=''>
						<List.Item prefix={<Image fit='contain' src='/app/record.png' />} onClick={()=>{Auth.navigate(navigate,"/record")}}>
							项目记录
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/fuddetail.png' />} onClick={() => {Auth.navigate(navigate,"/fuddetail")}}>
							账单明细
						</List.Item>
						{/* <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
							个人报表
						</List.Item> */}
						<List.Item prefix={<Image fit='contain' src='/app/recharge.png' />} onClick={() => {Auth.navigate(navigate,"/recharge/history")}}>
							充值记录
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/withdraw.png' />} onClick={() => {Auth.navigate(navigate,"/withdraw/history")}}>
							兑换记录
						</List.Item>
					</List>
				</div>
			</div>
		</div>
	)
}