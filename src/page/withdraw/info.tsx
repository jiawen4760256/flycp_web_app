import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Tag,Image,Empty,Grid,Space} from 'antd-mobile'
import {
  useNavigate,
	useParams,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'
export default () => {
	const params = useParams() 
	const [htmlData, setHtmlData] = useState<any>({})
	const dispatch = useDispatch()
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
					票单号:<span  className='withdraw-info-value1' >{htmlData.trano}</span>
        </div>
				<br/>
				<div >
					兑换金额:<span className='withdraw-info-value1'>{htmlData.amount}</span>
        </div>
				<br/>
				<div >
					兑换状态:			
					{(htmlData.state=="1"?<Tag color='primary' fill='outline'>
						正在审核
					</Tag>:"")}
					{(htmlData.state=="2"?<Tag color='success' fill='outline'>
						兑换成功
					</Tag>:"")}
					{(htmlData.state=="3"?<Tag color='danger' fill='outline'>
					  兑换失败
					</Tag>:"")}
        </div>
				<br/>
				<div >
				银行卡姓名:<span className='withdraw-info-value1'>{htmlData.accountname}</span>
        </div>
				<br/>
				<div >
				银行卡名称:<span className='withdraw-info-value1'>{htmlData.bankname}</span>
        </div>
				<br/>
				<div >
				银行卡支行:<span className='withdraw-info-value1'>{htmlData.bankbranch}</span>
        </div>
				<br/>
				<div >
				银行卡号:<span className='withdraw-info-value1'>{htmlData.banknumber}</span>
        </div>
				<br/>
				<div >
				兑换时间:<span className='withdraw-info-value1'>{htmlData.oddtime}</span>
        </div>
				<br/>
				<div >
				兑换详情:<span className='withdraw-info-value1'>{htmlData.remark1}</span>
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
      	<NavBar  onBack={back}>兑换详情</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
				{html}
			</div>
		</div>
	)
}