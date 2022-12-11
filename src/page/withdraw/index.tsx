import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Input,TextArea,Toast,DatePicker,Picker,List,Grid } from 'antd-mobile'
import { ExclamationCircleOutline} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../lib/Auth';
import './index.css'
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import {
  getDictionary
} from '../../store';
import { 
	FileOutline,
} from 'antd-mobile-icons'
let amountInput:any = {};
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
	const {
		language_app_user_exchange,      
		language_app_withdraw_bank_pls,
		language_app_withdraw_amount_pls,
		language_app_withdraw_ok,
		language_app_withdraw_bank,
		language_app_withdraw_user,
		language_app_withdraw_user_pls,
		language_app_withdraw_number,
		language_app_withdraw_number_pls,
		language_app_withdraw_amount,
		language_app_withdraw_submit,
		language_app_withdraw_info,
		language_app_hall_cancel,
		language_app_hall_confirm,
	} = useSelector(getDictionary);
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
		// console.log(amountInput.nativeElement.value);
		let amount = amountInput.nativeElement.value
		if(!value[0]){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: language_app_withdraw_bank_pls,
			})
			return
		}
		if(!amount){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: language_app_withdraw_amount_pls,
			})
			return
		}
		let values = {
			bankId:value[0],
			amount:amount
		}
		
		setLoading1(true)
		Auth.ajax(navigate,'withdraw/submit',values)
		.then(function (response:any) {
			Toast.show({
				icon: 'success',
				content: language_app_withdraw_ok,
			})
			

			setNotice(response['notice'])
			setAmount("");
			setLoading1(false)
			// amountInput.nativeElement.value = ''
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
				<Grid.Item key={index+"1"}  className='withdraw-info-key'>
					<div>{item["k"]}</div>
				</Grid.Item>
				<Grid.Item span={2} key={index+"2"} className='withdraw-info-value'>
					<div>{item["v"]}</div>
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
      	<NavBar onBack={back} right={right}>{language_app_user_exchange}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<List header=''>
					<List.Item prefix={(<div className='withdraw-bank'>{language_app_withdraw_bank}</div>)} onClick={selectBank} >
						<Picker
							columns={basicColumns}
							visible={visible}
							cancelText={language_app_hall_cancel}
							confirmText={language_app_hall_confirm}
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
									return (<span className='withdraw-span'>{language_app_withdraw_bank_pls}</span>)
								} else {
									return items.map(item => item?.label ?? language_app_withdraw_bank_pls).join(' - ')
								}
							}}
						</Picker>
					</List.Item>
					<List.Item  prefix={(<div className='withdraw-bank'>{language_app_withdraw_user}</div>)} onClick={selectBank}>
						<Picker
							columns={basicColumns1}
							visible={visible1}
							cancelText={language_app_hall_cancel}
							confirmText={language_app_hall_confirm}
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
									return (<span className='withdraw-span'>{language_app_withdraw_user_pls}</span>)
								} else {
									return items.map(item => item?.label ?? language_app_withdraw_user_pls).join(' - ')
								}
							}}
						</Picker>
					</List.Item>
					<List.Item  prefix={(<div className='withdraw-bank'>{language_app_withdraw_number}</div>)} onClick={selectBank}>
						<Picker
							columns={basicColumns2}
							visible={visible2}
							cancelText={language_app_hall_cancel}
							confirmText={language_app_hall_confirm}
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
									return (<span className='withdraw-span'>{language_app_withdraw_number_pls}</span>)
								} else {
									return items.map(item => item?.label ?? language_app_withdraw_number_pls).join(' - ')
								}
							}}
						</Picker>
					</List.Item>

					<List.Item  prefix={(<div className='withdraw-bank'>{language_app_withdraw_amount}</div>)} >
						<Input
							placeholder={language_app_withdraw_amount_pls}
							// onChange={setAmount}
							// value={amount}
							ref={input => amountInput = input}
						/>
					</List.Item>
				</List>

				<Form
					onFinish = {submit}
					layout='horizontal'
					footer={
						<Button block loading={loading1} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
							{language_app_withdraw_submit}
						</Button>
					}
				>
				</Form>
				<data className='withdraw-info-head'>
					{language_app_withdraw_info}：
				</data>
				<div className='withdraw-info'>
					{noticeDiv}
				</div>
			</div>
		</div>
	)

}