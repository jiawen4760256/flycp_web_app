import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Tag,Grid,SearchBar,List,Empty,Space,Dialog,Calendar } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import moment from "moment";
import './index.css'
import Auth from '../../../lib/Auth';
import { setLoading } from '../../../store'
import {useDispatch } from 'react-redux'
import { time } from 'console';

let now1 = new Date()
// now1.setDate(now1.getDate()-2)
let now2 = new Date()
export default () => {
	
	const [date1, setDate1] = useState(now1)
	const [date2, setDate2] = useState(now2)
	const [page, setPage] = useState(1)
	const [dateformat1, setformatDate1] = useState(moment(now1).format('YYYY-MM-DD'))
	const [dateformat2, setformatDate2] = useState(moment(now2).format('YYYY-MM-DD'))
	const [data, setData] = useState<any>({})
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	let tmp1 = date1;
	let tmp2 = date2;

	useEffect(() => {
		getHistory()
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getHistory = async function(init=false){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'proxy/tim',{date1:dateformat1,date2:dateformat2})
		.then(function (response:any) {
			setData(response)
			dispatch(setLoading(false))
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	
	useEffect(() => {
		// getHistory();
  },[])
	const onSelect =()=>{
		setPage(1)
		console.log(page,"page");
		setData({})
		getHistory(true)
	}
	const selectDate=()=>{
		Dialog.show({
			content: (        
				<Calendar
					defaultValue={[date1,date2]}
					selectionMode='range'
					onChange={(val:any) => {
						console.log(val)
						tmp1 = val[0]
						tmp2 = val[1]
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
							setDate1(tmp1)
							setDate2(tmp2)
							setformatDate1(moment(tmp1).format('YYYY-MM-DD'))
							setformatDate2(moment(tmp2).format('YYYY-MM-DD'))
							// console.log("confirm");
						},
					},
				],
			],
		})
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>团队报表</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-95,background:"#fff"}}>
				<div className='history-day'>
					<Space wrap	>	
						<>
							<Button onClick={selectDate}>
								{dateformat1}
							</Button>
						</>
						<div className='history-limit'>
							至
						</div>
						<>
							<Button onClick={selectDate}>
								{dateformat2}
							</Button>
						</>
						<div >
						<Button color='danger' size='small' className='history-button' onClick={onSelect}>查询</Button>
						</div>
					</Space>
					{/* <Space wrap	>	
						<SearchBar placeholder='请输入会员账号' style={{marginTop:5}}/>
						<Button color='danger' size='small' className='history-button' onClick={onSelect}>查询</Button>
					</Space> */}
				</div>	
				<br/>
				<div  className='proxy-info'>
						<Grid columns={24} gap={0}>
							<Grid.Item span={5} className='proxy-key'>
								我的下线
							</Grid.Item>
							<Grid.Item span={19} className='proxy-value proxy-total'>
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
							{(data.reduce-data.add).toFixed(2)}
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