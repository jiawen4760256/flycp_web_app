import React, { useState,useEffect } from 'react'
import { NavBar, Image,List,Avatar,Space,Grid,Card } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'

export default () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	const [data, setData] = useState<any>("")
	const demoSrc = '/app/vip.png';
  const back = () =>{
		navigate(-1);
	}
	const getData = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'proxy/index')
		.then(function (response) {
			dispatch(setLoading(false))
			setData(response);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	
	useEffect(() => {
		getData()
  },[])


	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header' onBack={back}>代理中心</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>

			<br/>
				{/* <div className='proxy-info'>
				<Grid columns={24} gap={0}>
          <Grid.Item span={5} className='proxy-key'>
						我的下级
          </Grid.Item>
          <Grid.Item span={19} className='proxy-value proxy-total'>
						{data.totalMember}
          </Grid.Item>
          <Grid.Item span={5} className='proxy-key'>
						总充值
          </Grid.Item>
          <Grid.Item span={19} className='proxy-value proxy-total'>
						{data.recharge2}
          </Grid.Item>
          <Grid.Item span={5} className='proxy-key'>
						会员人数
          </Grid.Item>
          <Grid.Item span={7} className='proxy-value'>
						{data.memberCount}
          </Grid.Item>
          <Grid.Item span={5} className='proxy-key'>
						会员新增
          </Grid.Item>
          <Grid.Item span={7} className='proxy-value'>
						{data.newMemberCount}
          </Grid.Item>
          <Grid.Item span={5} className='proxy-key'>
						代理人数
          </Grid.Item>
          <Grid.Item span={7} className='proxy-value'>
						{data.proxyCount}
          </Grid.Item>
          <Grid.Item span={5} className='proxy-key'>
						代理新增
          </Grid.Item>
          <Grid.Item span={7} className='proxy-value'>
						{data.newProxyCount}
          </Grid.Item>

					
          <Grid.Item span={5} className='proxy-key'>
						昨日充值
          </Grid.Item>
          <Grid.Item span={7} className='proxy-value'>
						{data.recharge1}
          </Grid.Item>
          <Grid.Item span={5} className='proxy-key'>
						今日充值
          </Grid.Item>
          <Grid.Item span={7} className='proxy-value'>
						{data.recharge}
          </Grid.Item>
        </Grid>
				</div> */}
				{/* <br/> */}
				<div className='user-button-list'>
					<List header=''>
						<List.Item prefix={<Image fit='contain' src='/app/record.png' />} onClick={()=>{Auth.navigate(navigate,"/proxy/tim")}}>
							团队报表
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/fuddetail.png' />} onClick={() => {Auth.navigate(navigate,"/proxy/member")}}>
							下级报表
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/recharge.png' />} onClick={() => {Auth.navigate(navigate,"/proxy/day")}}>
							实时报表
						</List.Item>
						{/* <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
							个人报表
						</List.Item> */}
						{/* <List.Item prefix={<Image fit='contain' src='/app/recharge.png' />} onClick={() => {Auth.navigate(navigate,"/recharge/history")}}>
							充值记录
						</List.Item>
						<List.Item prefix={<Image fit='contain' src='/app/withdraw.png' />} onClick={() => {Auth.navigate(navigate,"/withdraw/history")}}>
							兑换记录
						</List.Item> */}
					</List>
				</div>
			</div>
		</div>
	)
}