import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Tag,Image,Empty,Grid,Space} from 'antd-mobile'
import {
  useNavigate,
	useParams,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch ,useSelector} from 'react-redux'
import {
  getDictionary
} from '../../store';
export default () => {
	const params = useParams() 
	const [htmlData, setHtmlData] = useState<any>({})
	const dispatch = useDispatch()
	const {
		language_app_withdraw_history,
		language_app_withdraw_info_number,
		language_app_withdraw_info_amount,
		language_app_withdraw_info_state,
		language_app_withdraw_info_state_1,
		language_app_withdraw_info_state_2,
		language_app_withdraw_info_state_3,
		language_app_withdraw_info_name,
		language_app_withdraw_info_bank,
		language_app_withdraw_info_addr,
		language_app_withdraw_info_bank_number,
		language_app_withdraw_info_time,
		language_app_withdraw_info_info,    
	} = useSelector(getDictionary)
	let navigate = useNavigate()
	Auth.page(navigate)
	let html

	useEffect(() => {
		getHtmlData()
	},[])
  const back = () =>{
		navigate(-1);
	}
	const getHtmlData = function(){
		dispatch(setLoading(true))
		Auth.ajax(navigate,'withdraw/info',{id:params['id']})
		.then(function (response) {
			dispatch(setLoading(false))
			setHtmlData(response)
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	// accountname: "*三"
	// amount: "100.00"
	// banknumber: "8888******8888"
	// remark: ""
	// state: "正在审核"
	// trano: "O20220719140305826"
	if( Object.keys(htmlData).length != 0){
		html = (<div className='withdraw-info-body' style={{}}>
			<>
				<div>
					{language_app_withdraw_info_number}:<span  className='withdraw-info-value1' >{htmlData.trano}</span>
        </div>
				<br/>
				<div >
					{language_app_withdraw_info_amount}:<span className='withdraw-info-value1'>{parseInt(htmlData.amount)}</span>
        </div>
				<br/>
				<div >
				{language_app_withdraw_info_state}:			
					{(htmlData.state=="1"?<Tag color='primary' fill='outline'>
						{language_app_withdraw_info_state_1}
					</Tag>:"")}
					{(htmlData.state=="2"?<Tag color='success' fill='outline'>
						{language_app_withdraw_info_state_2}
					</Tag>:"")}
					{(htmlData.state=="3"?<Tag color='danger' fill='outline'>
					  {language_app_withdraw_info_state_3}
					</Tag>:"")}
        </div>
				<br/>
				<div >
				{language_app_withdraw_info_name}:<span className='withdraw-info-value1'>{htmlData.accountname}</span>
        </div>
				<br/>
				<div >
				{language_app_withdraw_info_bank}:<span className='withdraw-info-value1'>{htmlData.bankname}</span>
        </div>
				<br/>
				<div >
				{language_app_withdraw_info_addr}:<span className='withdraw-info-value1'>{htmlData.bankbranch}</span>
        </div>
				<br/>
				<div >
				{language_app_withdraw_info_bank_number}:<span className='withdraw-info-value1'>{htmlData.banknumber}</span>
        </div>
				<br/>
				<div >
				{language_app_withdraw_info_time}:<span className='withdraw-info-value1'>{htmlData.oddtime}</span>
        </div>
				<br/>
				<div >
				{language_app_withdraw_info_info}:<span className='withdraw-info-value1'>{htmlData.remark1}</span>
        </div>
			</>
		</div>)

	}else{
		html = (<>
      <Empty />
		</>)
	}

	
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar  onBack={back}>{language_app_withdraw_history}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
				{html}
			</div>
		</div>
	)
}