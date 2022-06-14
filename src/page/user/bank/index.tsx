import React, { useState,useEffect } from 'react'
import { NavBar,Grid,Empty,Card,Tag } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import { 
	AddCircleOutline,
} from 'antd-mobile-icons'
import './index.css'
import Auth from '../../../lib/Auth';
import { setLoading } from '../../../store'
import {useDispatch } from 'react-redux'

export default () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	const [bankList, setBankList] = useState([])
  const back = () =>{
		navigate(-1);
	}
	const getBank = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'user/bank')
		.then(function (response:any) {
			dispatch(setLoading(false))
			setBankList(response);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	useEffect(() => {
		getBank()
  },[])
	const right = (
    <div style={{ fontSize: 24 }} onClick={()=>{Auth.navigate(navigate, "/bank/add")}}>
			<AddCircleOutline />
    </div>
  )
	let data
	if(bankList.length == 0){
		data =  (<Empty description='暂未绑定银行卡，请点击右上角 ‘+’ 添加' />)	
	}else{
		data = bankList.map((item, index)=>{
			let state = (<></>)
			if(item['state']==0){
				state = (<Tag className='bank-state' color='primary' fill='outline'>正在审核</Tag>)
			}else if(item['state']==2){
				state = (<Tag className='bank-state' color='danger' fill='outline'>审核失败</Tag>)
			}else if(item['state']==1){
				state = (<Tag className='bank-state' color='success' fill='outline'>审核通过</Tag>)
			}
			return ( 
				<Card  key={index}  className={item['state']==1?"bank-item":"bank-item"} onClick={()=>{}}>
					<Grid columns={3} gap={8}>
						<Grid.Item>
							<div>兑换银行：</div>
							
						</Grid.Item>
						<Grid.Item span={2}>
							<div>
								{item['bankname']}&nbsp;&nbsp;
								{state}
							</div>
						</Grid.Item>
						<Grid.Item>
							<div>开户姓名：</div>
						</Grid.Item>
						<Grid.Item span={2}>
							<div>{item['accountname']}</div>
						</Grid.Item>
						<Grid.Item>
							<div>开户支行：</div>
						</Grid.Item>
						<Grid.Item span={2}>
							<div>{item['bankaddress']}</div>
						</Grid.Item>
						<Grid.Item>
							<div>银行卡号：</div>
						</Grid.Item>
						<Grid.Item span={2}>
							<div>{item['banknumber']}</div>
						</Grid.Item>
					</Grid>
				</Card>
			)
		}) 
	}

	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar right={right} onBack={back}>银行卡管理</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
					{data}
			</div>
		</div>
	)
}