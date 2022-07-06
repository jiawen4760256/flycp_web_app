import React, { useState,useEffect,useRef } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Tag,Grid,SearchBar,List,Empty,Space,Dialog,Calendar } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../../lib/Auth';
import { setLoading } from '../../../store'
import {useDispatch } from 'react-redux'

export default () => {
	const [data, setData] = useState<any>({})
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	useEffect(() => {
		getHistory()
		console.log('useEffect')
		let timerDay = setInterval(() => {
			Auth.ajax(navigate,'proxy/tim',{fastTime:1})
			.then(function (response:any) {
				setData(response)
			}).catch(function (error) {
			})
		}, 10000);
		return () => clearInterval(timerDay);
	
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getHistory = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'proxy/tim',{fastTime:1})
		.then(function (response:any) {
			setData(response)
			dispatch(setLoading(false))
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}


	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>实时报表</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95,background:"#fff"}}>				<br/>
				<br/>
				<div  className='proxy-info'>
						<Grid columns={24} gap={0}>
							<Grid.Item span={5} className='proxy-key'>
								当前日期
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{data.date}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								我的下线
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value proxy-total'>
								{data.totalMember}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								代理人数
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{data.proxyCount}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								会员人数
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{data.memberCount}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								注册人数
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{data.reqCount}
							</Grid.Item>
							<Grid.Item span={5} className='proxy-key'>
								登录人数
							</Grid.Item>
							<Grid.Item span={7} className='proxy-value'>
								{data.loginCount}
							</Grid.Item>
						</Grid>
				</div>
				<br/>
				<div  className='proxy-info'>
					<Grid columns={24} gap={0}>
						<Grid.Item span={5} className='proxy-key'>
							充提盈亏
						</Grid.Item>
						<Grid.Item span={19} className='proxy-value proxy-total'>
							{(data.withdraw-data.recharge).toFixed(2)}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							充值积分
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.recharge}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							提现积分
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.withdraw }
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							首充/充值
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.rechargeFirst}/{data.rechargeUser}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							提现人数
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.withdrawUser}
						</Grid.Item>
					</Grid>
				</div>
				<br/>
				<div  className='proxy-info'>
					<Grid columns={24} gap={0}>
						<Grid.Item span={5} className='proxy-key'>
							投注盈亏
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value proxy-total'>
							{(data.win-data.touzhu).toFixed(2)}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							团队余额
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value proxy-total'>
							{data.balance}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							投注积分
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.touzhu}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							中奖积分
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.win}
						</Grid.Item>
						
						<Grid.Item span={5} className='proxy-key'>
							投注人数
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.touzhuUser}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							中奖人数
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.winUser}
						</Grid.Item>
					</Grid>
				</div>
				<br/>
				<div  className='proxy-info'>
					<Grid columns={24} gap={0}>
						<Grid.Item span={5} className='proxy-key'>
							总彩金
						</Grid.Item>
						<Grid.Item span={19} className='proxy-value proxy-total'>
							{(data.add-data.reduce).toFixed(2)}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							加彩金
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.add}
						</Grid.Item>
						<Grid.Item span={5} className='proxy-key'>
							减彩金
						</Grid.Item>
						<Grid.Item span={7} className='proxy-value'>
							{data.reduce}
						</Grid.Item>
					</Grid>
				</div>
			</div>
		</div>
	)
}