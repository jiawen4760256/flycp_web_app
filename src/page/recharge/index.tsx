import React, { useState,useEffect } from 'react'
import { NavBar,Space,Input,List,Empty,Form,Tabs,Button,Popup,Toast,Selector} from 'antd-mobile'
import { 
	SoundOutline,ExclamationCircleOutline,SystemQRcodeOutline,BankcardOutline,SearchOutline
} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import Auth from '../../lib/Auth'
import './index.css'
import { setLoading ,getDictionary,getLoading} from '../../store'
import {useDispatch,useSelector } from 'react-redux'
export default () => {
	
	const dispatch = useDispatch()
	const [htmlData, setHtmlData] = useState<{}[]>([])
	const [paytype, setPaytype] = useState<{}[]>([])
	const [basicColumns, setBasicColumns] = useState<any[]>([])
	const [basicColumns1, setBasicColumns1] = useState<any[]>([])
  const [value, setValue] = useState<any>({})
	const loading = useSelector(getLoading)
	let navigate = useNavigate()
	
  const [visible6, setVisible6] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
	Auth.page(navigate)
	let html

	const {
		language_app_user_buy,
		language_app_recharge_text,
		language_app_recharge_bank_pls,
		language_app_recharge_bank,
		language_app_recharge_pay,
		language_app_recharge_amount,
		language_app_recharge_amount_pls,
		language_app_recharge_search,
		language_app_recharge_channel,
		
	} = useSelector(getDictionary);

	useEffect(() => {
		getPaytype()
		paybank()
	},[])
  const back = () =>{
		navigate(-1);
	}

	const getData = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'recharge/collection')
		.then(function (response:any) {
			dispatch(setLoading(false))
			setHtmlData(response);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	const paybank = function(){
		Auth.ajax(navigate,'recharge/paybank')
		.then(function (response:any) {
				setBasicColumns(response)
				setBasicColumns1(response)
		})
	}
	const getPaytype = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'recharge/paytype')
		.then(function (response:any) {
			dispatch(setLoading(false))
			setPaytype(response);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}

	const submit = function(values:any){
		if(values.html == 1 && !value.bankname){
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: language_app_recharge_bank_pls,
			})
			return;
		}
		setLoading(true)
		setSubmitLoading(true)
		values.bankcode = value.bankcode
		Auth.ajax(navigate,"recharge/online",values)
		.then(function (response:any) {
			setLoading(false)
			setSubmitLoading(false)
			window.location.href = response;
			return
		})		
		.catch(function (error) {
			setLoading(false)
			setSubmitLoading(false)
		})
	}
	if(htmlData.length > 0 && 0){
		html = (<>
			<List header=''>
				{htmlData.map((item:any,index) =>{
					let prefix
					if(item.img){
						prefix = (
							<SystemQRcodeOutline 
								style={{ padding: 5 }}
								width={35}
								height={35}
							/>)
					}else{
						prefix = (
							<BankcardOutline 
								style={{ padding: 5 }}
								width={35}
								height={35}
							/>)

					}
					return (
						<List.Item
							onClick={()=>{Auth.navigate(navigate,"/recharge/info/"+item['id'])}}
							key={index}
							prefix={prefix}
							description={item.desc}

						>
							{item.title}
						</List.Item>
					)
				})}
			</List>
		</>)

	}else{
		html = (
			<Empty className='recharge-empty' description={language_app_recharge_text} />
		)
	}
	
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>{language_app_user_buy}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
				{paytype.length == 0?<>
					<Empty className='recharge-empty' description={language_app_recharge_text} />
				</>:<>
					<Tabs defaultActiveKey={"0"}>
						{paytype.map((item:any,index)=>{
							return <Tabs.Tab title={item.name} key={index}>
								{item.html == 1?<>
									<Form
										footer={
											<Button block type='submit' color='primary' size='large' loading={submitLoading}>
												{language_app_recharge_pay}
											</Button>
										}
										onFinish = {submit}
									>
										<Form.Item
											style={{display:"none"}}
											name='id'
											label='id'
											initialValue={item.id}
										>
											<Input />
										</Form.Item>
										<Form.Item
											name='paybank_id'
											label={language_app_recharge_bank}
											// trigger='onConfirm'
											
											rules={[{ message: language_app_recharge_bank_pls }]}
											onClick={() => {
												setVisible6(true)
											}}
											
										>
											
											{value.bankname?value.bankname:(<div style={{color:"#ccc"}}>
												{language_app_recharge_bank_pls}
											</div>)}
										</Form.Item>
										<Form.Item
											name='amount'
											label={language_app_recharge_amount}
											rules={[{ required: true, message: language_app_recharge_amount_pls }]}
										>
											<Input onChange={console.log} placeholder={language_app_recharge_amount_pls} />
										</Form.Item>
										<Form.Item name='payset_id'  label={language_app_recharge_channel}  initialValue={item.defaultValue}>
											<Selector
												// defaultValue={item.defaultValue}
												options={item.payset_id}
											/>
										</Form.Item>
									</Form>
								</>:<></>}
								
								{item.html == 2?<>
									<Form
										footer={
											<Button block type='submit' color='primary' size='large' loading={submitLoading}>
												{language_app_recharge_pay}
											</Button>
										}
										
										onFinish = {submit}
									>

										
										<Form.Item
											style={{display:"none"}}
											name='id'
											label='id'
											initialValue={item.id}
										>
											<Input />
										</Form.Item>
										<Form.Item
											name='amount'
											label={language_app_recharge_amount}
											rules={[{ required: true, message: language_app_recharge_amount_pls }]}
										>
											<Input onChange={console.log} placeholder={language_app_recharge_amount_pls} />
										</Form.Item>
										<Form.Item name='payset_id' label={language_app_recharge_channel} initialValue={item.defaultValue}>
											<Selector
												// defaultValue={item.defaultValue}
												options={item.payset_id}
											/>
										</Form.Item>
									</Form>
								</>:<></>}
							</Tabs.Tab>
						})}
					</Tabs>
				
				</>}
			</div>
			<Popup
					visible={visible6}
					onMaskClick={() => {
						setVisible6(false)
					}}
					position='right'
          bodyStyle={{ width: '100vw' }}
				>
					<header className="App-header" style={{position: "unset"}} >
						<NavBar className='app-header' onBack={()=>{
							setVisible6(false)
						}}>{language_app_recharge_bank}</NavBar>
					</header>
					{/* <Form layout='horizontal'>
						<Form.Item label='搜索' name='username'>
							<Input placeholder='请输入银行名称' clearable />
						</Form.Item>
					</Form> */}
					<Space className='search-input'>
						<SearchOutline style={{fontSize:20}}/>
						<Input placeholder={language_app_recharge_search}  onChange={(value:string)=>{
							let newList:any[] = [];
							for(let i=0;i<basicColumns1.length;i++){
								let str:string = basicColumns1[i].bankname
								if(str.indexOf(value) != -1){
									newList.push(basicColumns1[i])
								}
							}
							setBasicColumns(newList)
						}}/>
					</Space>
					{/* <Divider /> */}
					<div
						style={{ height: '100vh', overflowY: 'scroll' }}
					>
						<List >
						{basicColumns.map((item:any,index)=>{
							return <>
								<List.Item  onClick={()=>{
									setValue(item)
									setVisible6(false)
								}}>{item.bankname}</List.Item>
							</>
						})}
						</List>
					</div>
				</Popup>
		</div>
	)
}