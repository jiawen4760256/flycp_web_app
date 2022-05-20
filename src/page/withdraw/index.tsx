import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,DatePicker,Picker,List,Grid } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../lib/Auth';
import './index.css'
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'
import { 
	FileOutline,
} from 'antd-mobile-icons'

export default () => {
	
	const [loading1, setLoading1] = useState(false)
	const [basicColumns, setBasicColumns] = useState<[][]>([[]])
	const [basicColumns1, setBasicColumns1] = useState<[][]>([[]])
	const [basicColumns2, setBasicColumns2] = useState<[][]>([[]])
	const [visible, setVisible] = useState(false)
	const [visible1, setVisible1] = useState(false)
	const [visible2, setVisible2] = useState(false)
  const [value, setValue] = useState<(string | null)[]>([])
  const [amount, setAmount] = useState("")
	const [notice, setNotice] = useState([])
	const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)
	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getUserBank = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'user/bank-use')
		.then(function (response:any) {
			dispatch(setLoading(false))
			setBasicColumns(response['bankname'])
			setBasicColumns1(response['accountname'])
			setBasicColumns2(response['banknumber'])
			setNotice(response['notice'])
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
		
	}
	const submit = function(){
		if(!value[0]){
			Toast.show({
				icon: 'fail',
				content: '请选择兑换银行卡',
			})
			return
		}
		if(!amount){
			Toast.show({
				icon: 'fail',
				content: '请输入兑换金额',
			})
			return
		}
		let values = {
			bankId:value[0],
			amount:amount
		}
		
		setLoading1(true)
		Auth.ajax(navigate,'withdraw/submit',values)
		.then(function (response) {
			Toast.show({
				icon: 'success',
				content: '申请兑换成功！',
			})
			

			setNotice(response['notice'])
			setAmount("");
			setLoading1(false)
		})
		.catch(function (error) {
			setLoading1(false)
		})
		
	}
	useEffect(() => {
		getUserBank();
  },[])
	let noticeDiv = notice.map((item,index)=>{
		return (
			<Grid columns={3} gap={0} key={index}>
				<Grid.Item key={index+"1"}>
					<div className='withdraw-info-key'>{item["k"]}</div>
				</Grid.Item>
				<Grid.Item span={2} key={index+"2"}>
					<div className='withdraw-info-value' >{item["v"]}</div>
				</Grid.Item>
				
			</Grid>
		)
	}) 
	const selectBank = ()=>{
		if(basicColumns[0].length == 0){
			Auth.navigate(navigate,'/bank')
		}else{
			setVisible(true)
		}
	}
	const right = (
    <div style={{ fontSize: 24 }} onClick={()=>{Auth.navigate(navigate, "/withdraw/history")}}>
			<FileOutline />
    </div>
  )
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar onBack={back} right={right}>兑换申请</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<List header=''>
					<List.Item prefix={(<div className='withdraw-bank'>兑换银行</div>)} onClick={selectBank} >
						<Picker
							columns={basicColumns}
							visible={visible}
							onClose={() => {
								setVisible(false)
							}}
							
							// defaultValue={["25"]}
							value={value}
							onConfirm={setValue}
							onSelect={(val, extend) => {
								// console.log('onSelect', val, extend.items)
							}}
						>
							{items => {
								if (items.every(item => item === null)) {
									return (<span className='withdraw-span'>请选择兑换银行</span>)
								} else {
									return items.map(item => item?.label ?? '请选择兑换银行').join(' - ')
								}
							}}
						</Picker>
					</List.Item>
					<List.Item  prefix={(<div className='withdraw-bank'>银行卡号</div>)} onClick={selectBank}>
						<Picker
							columns={basicColumns1}
							visible={visible1}
							onClose={() => {
								setVisible1(false)
							}}
							value={value}
							onConfirm={setValue}
							onSelect={(val, extend) => {
								console.log('onSelect', val, extend.items)
							}}
						>
							{items => {
								if (items.every(item => item === null)) {
									return (<span className='withdraw-span'>请选择银行卡号</span>)
								} else {
									return items.map(item => item?.label ?? '请选择银行卡号').join(' - ')
								}
							}}
						</Picker>
					</List.Item>
					<List.Item  prefix={(<div className='withdraw-bank'>收款人</div>)} onClick={selectBank}>
						<Picker
							columns={basicColumns2}
							visible={visible2}
							onClose={() => {
								setVisible2(false)
							}}
							value={value}
							onConfirm={setValue}
							// defaultValue={["25"]}
							onSelect={(val, extend) => {
								console.log('onSelect', val, extend.items)
							}}
						>
							{items => {
								if (items.every(item => item === null)) {
									return (<span className='withdraw-span'>请选择收款人</span>)
								} else {
									return items.map(item => item?.label ?? '请选择收款人').join(' - ')
								}
							}}
						</Picker>
					</List.Item>

					<List.Item  prefix={(<div className='withdraw-bank'>兑换金额</div>)} >
						<Input
							placeholder='请输入兑换金额'
							onChange={setAmount}
							value={amount}
						/>
					</List.Item>
				</List>

				<Form
					onFinish = {submit}
					layout='horizontal'
					footer={
						<Button block loading={loading1} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
							立即兑换
						</Button>
					}
				>
				</Form>
				<data className='withdraw-info-head'>
					温馨提示：
				</data>
				<div className='withdraw-info'>
					{noticeDiv}
				</div>
			</div>
		</div>
	)

}