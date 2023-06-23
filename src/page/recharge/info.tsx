import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Tag,Image,Empty,Grid,Space,AutoCenter} from 'antd-mobile'
import copy from 'copy-to-clipboard';
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
		Auth.ajax(navigate,'recharge/collection-info',{id:params['id']})
		.then(function (response) {
			dispatch(setLoading(false))
			setHtmlData(response)
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	function coppyUrl(url:string){
		copy(url);
		Toast.show({
			icon: 'success',
			content: '复制成功',
		})
	};
	// accountname: "*三"
	// amount: "100.00"
	// banknumber: "8888******8888"
	// remark: ""
	// state: "正在审核"
	// trano: "O20220719140305826"
	if( Object.keys(htmlData).length != 0){
		if(htmlData.img){
			html = (<>
				<AutoCenter><h3>{htmlData.title}</h3></AutoCenter>
				<AutoCenter>
				<Image
					src={htmlData.img}
					fit='cover'
				/></AutoCenter>
				<br/>
				{/* <div><pre>{htmlData.remark}</pre></div> */}
				
				<div style={{marginLeft:10,color: "#525252"}}>温馨提示：</div>
				<div style={{margin:10,color: "#525252"}}
					dangerouslySetInnerHTML={{__html:htmlData['remark']}}
				>
				</div>
			</>)
		}else{
			html = (<>
				<AutoCenter><h3>{htmlData.title}</h3></AutoCenter>
				<div style={{margin:10,fontSize: "14px"}}>
					<div style={{margin:5}}>收款银行：&nbsp;{htmlData.bank_name}  <span className='info-copy'></span></div>
					<div style={{margin:5}}>收款户名：&nbsp;{htmlData.account_name} <span className='info-copy' onClick={()=>coppyUrl(htmlData.account_name)}>[复制]</span></div>
					<div style={{margin:5}}>收款账号：&nbsp;{htmlData.account_number} <span className='info-copy' onClick={()=>coppyUrl(htmlData.account_number)}>[复制]</span></div>
					<div style={{margin:5}}>支行地址：&nbsp;{htmlData.account_addr} <span className='info-copy' onClick={()=>coppyUrl(htmlData.account_addr)}>[复制]</span></div>

				</div>
				<br/>
				{/* <div><pre>{htmlData.remark}</pre></div> */}
				
				<div style={{marginLeft:10,color: "#525252"}}>温馨提示：</div>
				<div style={{margin:10,color: "#525252"}}
					dangerouslySetInnerHTML={{__html:htmlData['remark']}}
				>
				</div>
			</>)

		}

	}else{
		html = (<>
      <Empty />
		</>)
	}

	
	return (
		<div className='App-main'>
			<header className="App-header"   style={{color:'#000'}}>
      	<NavBar  onBack={back}>预购</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
				{html}
			</div>
		</div>
	)
}