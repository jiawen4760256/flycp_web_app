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
	const [paytype, setPaytype] = useState<any>([])
	const [basicColumns, setBasicColumns] = useState<any[]>([])
	const [basicColumns1, setBasicColumns1] = useState<any[]>([])
  const [value, setValue] = useState<any>({})
	const loading = useSelector(getLoading)
	let navigate = useNavigate()

	const [visible6, setVisible6] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	const [moneyList,setMoney]=useState<any>(['50','100','200'])
	const [active,setActive]=useState<number>(0)
	const [amount, setAmount] = useState<number>(50)
	const [currentTabKey, setTabKey] = useState('0')
	const [paysetStyle, setPaysetStyle] = useState('25')
	const [paysetStyletwovalue, setpaysetStyletwovalue] = useState('')
	const [paysetStylethreevalue, setpaysetStylethreevalue] = useState('')
	function changeTab(e:string) {
	setTabKey(e)
	}
	Auth.page(navigate)
	let html


	useEffect(() => {
		getPaytype()
		paybank()
	},[])
  const back = () =>{
		navigate(-1);
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
		.then(function(response:any){
			dispatch(setLoading(false))
			// const arr:any=[]
			// for(let i=0;i<response.length;i+=1){
			// 	if(response[i]['id']!=1){
			// 		arr.push(response[i])
			// 	}
			// }
		// 	const data:any=
		// 	[
		// 	 {
		// 	 "id": "1",
		// 	 "name": "银行卡",
		// 	 "payset_id": [
		// 		{
		// 	 "label": "QE",
		// 	 "value": 25,
		// 	 "pay_type": "220"
		// 	 }
		// 	],
		// 	 "state": "1",
		// 	 "html": "1",
		// 	 "defaultValue": [25]
		//    }, 
		//    {
		// 	 "id": "2",
		// 	 "name": "快捷支付",
		// 	 "payset_id": [{
		// 	 "label": "HT",
		// 	 "value": 28,
		// 	 "pay_type": "222",
		// 	 "style": "1"
		// 	 },
		// 	 {
		// 	 "label": "XGS",
		// 	 "value": 29,
		// 	 "pay_type": "222",
		// 	 "style": "2"
		// 	 }
		//    ],
		// 	 "state": "1",
		// 	 "html": "2",
		// 	 "defaultValue": [28]
		//    }
		//  ]
			if(response.length==1){
				if(response[0]['html']=='1'){
					setTabKey('0')
					setPaysetStyle(response[0]['payset_id'][0]['value'])
				}
				if(response[0]['html']=='2'){
					setTabKey('1')	
					setPaysetStyle(response[0]['payset_id'][0]['value'])			
				}
			}
			if(response.length==2){
				setTabKey('1')	
				setPaysetStyle(response[1]['payset_id'][0]['value'])		
			}


			setPaytype(response);
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}

	const submit = function(values:any){
		if(currentTabKey=='0'){
			console.log(paysetStyle)
			if(paysetStyle=='25'){
				if(!values.bankname){
					Toast.show({
						icon: <ExclamationCircleOutline />,
						content: '请选择付款银行',
					})
					return;
				}
				values.amount = amount
				if(!amount){
					Toast.show({
						icon: <ExclamationCircleOutline />,
						content: '请输入金额',
					})
					return;
				}
			}

		}else{
			if(paysetStyle=='29'){
				values.amount = paysetStyletwovalue
				if(Number(paysetStyletwovalue)<10 || Number(paysetStyletwovalue)>2000){
					Toast.show({
						icon: <ExclamationCircleOutline />,
						content: '金额必须为10-2000之间',
					})
					return;
				}
				
			}
			if(paysetStyle=='30'){
				values.amount = paysetStylethreevalue
				if(Number(paysetStylethreevalue)<800 || Number(paysetStylethreevalue)>20000){
					Toast.show({
						icon: <ExclamationCircleOutline />,
						content: '金额必须为800-20000之间',
					})
					return;
				}
			}
			if(paysetStyle=='31'){
				values.amount = paysetStylethreevalue
				if(Number(paysetStylethreevalue)<100 || Number(paysetStylethreevalue)>4999){
					Toast.show({
						icon: <ExclamationCircleOutline />,
						content: '金额必须为100-4999之间',
					})
					return;
				}
			}
			if(paysetStyle=='33'){
				console.log(paysetStyle)
				values.amount = paysetStylethreevalue
				console.log(values.amount)
				// if(Number(paysetStylethreevalue)<(paytype[0]['payset_id'][0].scope.min) || Number(paysetStylethreevalue)>(paytype[0]['payset_id'][0].scope.max)){
				if(Number(paysetStylethreevalue)<50 || Number(paysetStylethreevalue)>10000){
					// console.log(paytype[0]['payset_id'][0].scope.min)
					// console.log(paytype[0]['payset_id'][0]['scope']['max'])
					Toast.show({
						icon: <ExclamationCircleOutline />,
						// content: `金额必须为${paytype[0]['payset_id'][0].scope.min}-${paytype[0]['payset_id'][0].scope.max}之间`,
						content:`金额必须为50 - 10000之间`,
					})
					return;
				}
			}
			if(paysetStyle=='34'){
				console.log(paysetStyle)
				values.amount = paysetStylethreevalue
				console.log(values.amount)
				// if(Number(paysetStylethreevalue)<(paytype[0]['payset_id'][1].scope.min) || Number(paysetStylethreevalue)>(paytype[0]['payset_id'][1].scope.max)){
				if(Number(paysetStylethreevalue)<10 || Number(paysetStylethreevalue)>2000){
					// console.log(paytype[0]['payset_id'][1].scope.min)
					// console.log(paytype[0]['payset_id'][1]['scope']['max'])
					Toast.show({
						icon: <ExclamationCircleOutline />,
						// content: `金额必须为${paytype[0]['payset_id'][1].scope.min}-${paytype[0]['payset_id'][1].scope.max}之间`,
						content: `金额必须为10 - 2000之间`,
					})
					return;
				}
			}

		}
		console.log(values)
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
			<Empty className='recharge-empty' description='请联系客服预购' />
		)
	}
	
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back}>预购选择</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
				{paytype.length == 0?<>
					<Empty className='recharge-empty' description='请联系客服预购' />
				</>:<>
					<Tabs defaultActiveKey={paytype.length == 1? '0' : '1'} onChange={changeTab}>
						{paytype.map((item:any,index:number)=>{
							// return <Tabs.Tab title={index==0?'快捷支付':'银行卡'} key={String(index)}>
							return <Tabs.Tab title={item['name']} key={String(index)}>
								{item.html == 1?<>
									<Form
										footer={
											<Button block type='submit' color='primary' size='large' loading={submitLoading}>
												立即支付
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
											label='付款银行'
											// trigger='onConfirm'
											
											rules={[{ message: '请选择付款银行' }]}
											onClick={() => {
												setVisible6(true)
											}}
											
										>
											
											{value.bankname?value.bankname:(<div style={{color:"#ccc"}}>
												请选择付款银行
											</div>)}
										</Form.Item>
										<Form.Item
											name='amount'
											label='金额'
											rules={[{ required: true, message: '请输入金额' }]}
										>
											<Input onChange={console.log} placeholder='请输入金额' autoComplete='off'/>
										</Form.Item>
										<Form.Item name='payset_id'  label='支付通道'  initialValue={item.defaultValue}>
											<Selector  onChange={(arr,extend:any)=>{
												if(extend.items.length){
													setPaysetStyle(extend.items[0]['value'])
												}
												console.log(arr, extend.items)
												// defaultValue={item.defaultValue}
											}}
											options={item.payset_id} 
											/>
										</Form.Item>
									</Form>
								</>:<></>}
								
								{item.html == 2?<>
									<Form
										footer={
											<a href="" target='_blank' style={{ textDecoration:'none'}}>
												<Button block type='submit' color='primary' size='large' loading={submitLoading}>
												立即支付
												</Button>
											</a>
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
											label='金额'
											style={{display:paysetStyle=='1'? 'block' : 'none'}}
											rules={[{ required: false, message: '请选择金额' }]}
										>
											{/* <Input onChange={console.log} placeholder='请输入金额' /> */}
											{
												moneyList.map((item:string,i:number)=>
												(
												<Button style={{ margin: 5 }} className={i==active ? 'active' : ''} key={i} onClick={(e)=>
													{
														setActive(i)
														setAmount(Number(item))
													}
													}
													>
														{item}
												</Button>
												)
												)
											}
										</Form.Item>
										<Form.Item
											// name='amount'
											label='金额'
											style={{display:paysetStyle=='29'? 'block' : 'none'}}
											rules={[{ required: true, message: '请输入金额，金额限制为：10-2000' }]}
										>
											<Input type="number" value={paysetStyletwovalue}  onChange={(e)=>{
												setpaysetStyletwovalue(e)
											}} placeholder='请输入金额(10 - 2000之间)' />
										</Form.Item>
										<Form.Item
											// name='amount'
											label='金额'
											style={{display:paysetStyle=='30'? 'block' : 'none'}} 
											rules={[{ required: true, message: '请输入金额，金额限制为：800-20000' }]}
										>
											<Input type="number" value={paysetStylethreevalue}  onChange={(e)=>{
												setpaysetStylethreevalue(e)
											}} placeholder='请输入金额(800 - 20000之间)' />
										</Form.Item>
										<Form.Item
											// name='amount'
											label='金额'
											style={{display:paysetStyle=='31'? 'block' : 'none'}} 
											rules={[{ required: true, message: `请输入金额，金额限制为：100-4999` }]}
										>
											<Input type="number" value={paysetStylethreevalue}  onChange={(e)=>{
												setpaysetStylethreevalue(e)
											}} placeholder={`请输入金额(100-4999之间)`} />
										</Form.Item>
										<Form.Item
											// name='amount'
											label='金额'
											style={{display:paysetStyle=='33'? 'block' : 'none'}} 
											// rules={[{ required: true, message: `请输入金额，金额限制为：${paytype[0]['payset_id'][0].scope.min}-${paytype[0]['payset_id'][0].scope.max}` }]}
											rules={[{ required: true, message: `请输入金额，金额限制为：50-10000` }]}
										>
											<Input type="number" value={paysetStylethreevalue}  onChange={(e)=>{
												setpaysetStylethreevalue(e)
											}} 
											// placeholder={`请输入金额(${paytype[0]['payset_id'][0].scope.min}-${paytype[0]['payset_id'][0].scope.max}之间)`} 
											placeholder={`请输入金额(50-10000之间)`} 
											/>
										</Form.Item>
										<Form.Item
											// name='amount'
											label='金额'
											style={{display:paysetStyle=='34'? 'block' : 'none'}} 
											// rules={[{ required: true, message: `请输入金额，金额限制为：${paytype[0]['payset_id'][1].scope.min}-${paytype[0]['payset_id'][1].scope.max}` }]}
											rules={[{ required: true, message: `请输入金额，金额限制为：10-2000` }]}
										>
											<Input type="number" value={paysetStylethreevalue}  onChange={(e)=>{
												setpaysetStylethreevalue(e)
											}} 
											// placeholder={`请输入金额(${paytype[0]['payset_id'][1].scope.min}-${paytype[0]['payset_id'][1].scope.max}之间)`} 
											placeholder={`请输入金额(10-2000之间)`} 
											/>
										</Form.Item>
											{/* 二维码功能，目前先注释，后期需要在打开 */}
											{/* < img style={{display : 'block',margin:'auto',width: 170,height: 170 }} src={active == 0 ? "/sc/button2.png" :  active == 1 ? "/sc/button3.png" : "/sc/button4.png"} alt="这是二维码图片" /> */}
										<Form.Item name='payset_id' label='支付通道' initialValue={item.defaultValue}>
											<Selector onChange={(arr,extend:any)=>{
												if(extend.items.length){
													setPaysetStyle(extend.items[0]['value'])
												}
												console.log(arr, extend.items)
											}}
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
						}}>付款银行</NavBar>
					</header>
					{/* <Form layout='horizontal'>
						<Form.Item label='搜索' name='username'>
							<Input placeholder='请输入银行名称' clearable />
						</Form.Item>
					</Form> */}
					<Space className='search-input'>
						<SearchOutline style={{fontSize:20}}/>
						<Input placeholder='搜索'  onChange={(value:string)=>{
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