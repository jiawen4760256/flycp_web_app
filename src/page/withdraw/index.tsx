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
let pwdInput:any={}
let cpfInput:any={}
export default () => {
	
	const [loading1, setLoading1] = useState(false)
	const [basicColumns, setBasicColumns] = useState<[][]>([[]])
	const [basicColumns1, setBasicColumns1] = useState<[][]>([[]])
	const [basicColumns2, setBasicColumns2] = useState<[][]>([[]])
	const [visible, setVisible] = useState(false)
	const [visible1, setVisible1] = useState(false)
	const [visible2, setVisible2] = useState(false)
	const [tradepassword, setTradepassword] = useState("")
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
		let cpf_number = cpfInput.nativeElement.value
		let tradepassword = pwdInput.nativeElement.value
		// if(!value[0]){
		// 	Toast.show({
		// 		icon: <ExclamationCircleOutline />,
		// 		// 请选择兑换银行卡
		// 		content: 'Por favor, escolha trocar o cartão do banco',
		// 	})
		// 	return
		// }
		if(!tradepassword){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				// 资金密码
				content: 'Introduza o seu código de financiamento',
			})
			return
		}
		if(!amount){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				// 请输入兑换积分
				content: 'Insira os pontos de resgate',
			})
			return
		}
		if(!cpf_number){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				// 请输入个人税务登记号
				content: 'Por favor, insira seu número de registro fiscal pessoal',
			})
			return
		}
		let values = {
			bankId:value[0],
			amount:amount,
			cpf_number:cpf_number,
			tradepassword:tradepassword,
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
			setTradepassword('')
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
  const blances=()=>notice.map((item,index)=>{
	if(index==0){
		console.log(item['v'])
		return <span>{item['v']}</span>
	}
})
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar onBack={back} 
		// 右侧顶部的兑换记录跳转按钮暂时注释
		// right={right}
		>{language_app_user_exchange}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor: "#fff"}}>
				<div style={{lineHeight: '60px',paddingLeft: '1.2rem'}}>Por favor, selecione uma conta de câmbio</div>
				<List header=''>
					{/* 兑换银行栏位注释 */}
					{/* <List.Item prefix={(<div className='withdraw-bank'>{language_app_withdraw_bank}</div>)} onClick={selectBank} >
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
					</List.Item> */}
					
					{/* 收款人栏位注释 */}
					{/* <List.Item  prefix={(<div className='withdraw-bank'>{language_app_withdraw_user}</div>)} onClick={selectBank}>
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
					</List.Item> */}

					{/* 银行卡号栏位注释 */}
					{/* <List.Item  prefix={(<div className='withdraw-bank'>{language_app_withdraw_number}</div>)} onClick={selectBank}>
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
					</List.Item> */}

					<List.Item  prefix={(<div className='withdraw-bank'>{'Saldo da conta'}</div>)} >
						 <span>{blances()}&nbsp;REAIS </span>
					</List.Item>
					<List.Item  prefix={(<div className='withdraw-bank'>{'Valor da Troca'}</div>)} >
						<Input
							placeholder={'Insira o valor da troca'}
							// onChange={setAmount}
							// value={amount}
							ref={input => amountInput = input}
						/>
					</List.Item>
					<List.Item  prefix={(<div className='withdraw-bank'>Senha do Fundo</div>)} >
						<form >
							<Input
								placeholder='Por favor, digite a senha do fundo'
								// onChange={setTradepassword}
								// value={tradepassword}
								type="password"
								autoComplete='off'
								ref={input => pwdInput = input}
							/>

						</form>
					</List.Item>
					<List.Item  prefix={(<div className='withdraw-bank'>{'CPF'}</div>)} >
						<Input
							placeholder={'Por favor, insira seu número de registro fiscal pessoal'}
							// onChange={setAmount}
							// value={amount}
							ref={input => cpfInput = input}
						/>
					</List.Item>
				</List>

				<Form
					onFinish = {submit}
					layout='horizontal'
					footer={
						<Button block loading={loading1} type='submit' color='danger' size='large' style={{backgroundColor: "#e53333"}}>
							{'Claro'}
						</Button>
					}
				>
				</Form>
				<data className='withdraw-info-head'>
					{' Descrição das regras de troca: '}：
				</data>
				{/* 展示列表暂时注释 */}
				{/* <div className='withdraw-info'>
					{noticeDiv}
				</div> */}
				<p style={{'padding':'0 10px'}}> *Todas as retiradas do cliente são totalmente gratuitas. </p>
				<p style={{'padding':'0 10px'}}>  * Valor máximo de retirada por dia  Segunda categoria.    </p>
				<p style={{'padding':'0 10px'}}>   *Retirada Mínima  USDT, valor máximo ilimitado.    </p>
				<p style={{'padding':'0 10px'}}>    *Em circunstâncias normais, leva de 3 a 5 minutos para concluir saques domésticos (se for um período de pico ou devido a fatores como remessa interbancária, pode levar cerca de 30 minutos para ser concluído. meias)     </p>
			</div>
		</div>
	)

}