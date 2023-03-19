import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Ellipsis,List,Empty,Grid,Card} from 'antd-mobile'
import { ExclamationCircleOutline} from 'antd-mobile-icons'
import axios from 'axios';
import Qs from 'qs'
import './index.css'
import Api from '../../../../lib/Api';
import Auth from '../../../../lib/Auth';

export default () => {
	const [htmlData, setHtmlData] = useState<any>([])
	const [up, setUp] = useState(false)

	 
	let userListHtml = (<></>)

	useEffect(() => {
		getHtmlData()
		// setInterval(()=>{
		// 	console.log(htmlData)
		// 	if(htmlData.length > 0 ){
		// 		console.log(htmlData)
		// 		setUp(up?false:true)
		// 		let tmp = htmlData
		// 		let arr1 = htmlData[0]
		// 		tmp.shift()
		// 		tmp.push(arr1)
		// 		setHtmlData(tmp)
		// 	}
		// },2000)

		// const timer = window.setInterval(() => {
		// 	// console.log(htmlData)
		// 	if(htmlData.length > 0 ){
		// 		console.log(htmlData)
		// 		setUp(up?false:true)
		// 		let tmp = htmlData
		// 		let arr1 = htmlData[0]
		// 		tmp.shift()
		// 		tmp.push(arr1)
		// 		setHtmlData(tmp)
		// 	}
		// }, 2000);
		// return () => {
		// 	clearInterval(timer);
		// };
	},[])
	const getHtmlData = function(){
		const values = {typeid:"k3"}
		axios.post(Api.address()+'home/user-list', Qs.stringify(values),Auth.verify(values))
		.then(function (response) {
			if(response.data.code == 0){
				const tmp :string[]= []
				tmp.push(...response.data.data)
				tmp.push(...response.data.data)
				setHtmlData(tmp)
			}else{
				Toast.show({
					icon: <ExclamationCircleOutline />,
					content: response.data.msg,
				})
			}
		})
		.catch(function (error) {
			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: '服务繁忙，稍后再试！',
			})
		})
	}

	if( htmlData.length != 0){
		userListHtml = (<div className={up?"userlist-list-activity":""}>
				{htmlData.map((item:any, index:any) => (<>
					<Grid columns={11} gap={0} className={"userlist-list"} key={index}>
						<Grid.Item key={index+"1"} span={3}>
							{item.username}
						</Grid.Item>
						<Grid.Item key={index+"2"} span={4}>
							{item.cptitle}
						</Grid.Item>
						<Grid.Item key={index+"3"} span={4}>
							{item.okamount}
						</Grid.Item>
					</Grid>
				</>))}
		</div>)

	}

  return (<>
		<div className='userlist-body'>
			<h2 className='userlist-title'>奖励实时播报</h2>
			<div className="userlist-content" >
				<div className="container">
       	 	<div className="scroll-list">
						{userListHtml}
					</div>
				</div>
			</div>
		</div>
	</>)
}

