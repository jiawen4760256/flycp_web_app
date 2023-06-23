import React, { useState,useEffect } from 'react'
import { NavBar,Toast,Grid,Divider,Space,Image,Badge } from 'antd-mobile'
import {
  useNavigate,useParams
} from 'react-router-dom'
import { 
	RightOutline,
} from 'antd-mobile-icons'
import './index.css'
import Auth from '../../lib/Auth';
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'

import { useSelector } from 'react-redux';
import {
  getHomeList,getMsgCount
} from '../../store';
export default () => {
	const dispatch = useDispatch()
	const params = useParams() 
	let navigate = useNavigate()
	const {list,website_hot} = useSelector(getHomeList);

	useEffect(() => {
  },[])
  const back = () =>{
		navigate(-1);
	}
	const gameList1 = list.map((game:any, index:any) =>{
		if(index < 8){
			return (
				<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
					<div className='sc-itme'>
						<Badge content={website_hot==''?<></>:<Image src={website_hot} />} style={{
									'--right': '30px','--top': '10px',"--color":"none",width:30}}>
							<div className='sc-itme-img'>
								<div className='sc-badge'>
										<Image  src={game.img} />
								</div>
							</div>
							<div className='sc-itme-title'>{game.title}</div>
							<div className='sc-itme-desc'>{game.desc}</div>
						</Badge>
					</div>
				</Grid.Item>
			)
		}
	} )
	const gameList2 = list.map((game:any, index:any) =>{
		if(index>7){
			return (
				<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
					<div className='sc-itme'>
						{/* <Badge content={website_hot==''?<></>:<Image src={website_hot} />} style={{
									'--right': '30px','--top': '10px',"--color":"none",width:30}}> */}
							<div className='sc-itme-img'>
								<div className='sc-badge'>
										<Image  src={game.img} />
								</div>
							</div>
							<div className='sc-itme-title'>{game.title}</div>
							<div className='sc-itme-desc'>{game.desc}</div>
						{/* </Badge> */}
					</div>
				</Grid.Item>
			)
		}
	})
	let title
	let gameList = <></>
	if(params['type'] == '1' || params['type'] == '2'|| params['type'] == '3'|| params['type'] == '4'){
		
		if(params['type'] == '1')title = '热销商家'
		if(params['type'] == '2')title = '旅游度假'
		if(params['type'] == '3')title = '旅游胜地'
		if(params['type'] == '4')title = '世界闻名'
		gameList = <Grid columns={2} gap={10} style={{marginTop:10}}>
		{
			list.map((game:any, index:any) =>{
				if(game.qishu == params['type']){
					return (
						<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
							<div className='sc-itme'>
								<Badge content={website_hot==''?<></>:<Image src={website_hot} />} style={{
										'--right': '30px','--top': '10px',"--color":"none",width:30}}>
									<div className='sc-itme-img'>
										<div className='sc-badge'>
												<Image  src={game.img} />
											
										</div>
									</div>
									<div className='sc-itme-desc'>{game.desc}</div>
									<div className='sc-itme-title'>{game.title}</div>
								</Badge>
							</div>
						</Grid.Item>
					)
				}
			})
		}
		</Grid>
	}else{
		title = '热销商家'
		gameList = <>
			{/* <Image className='sc-jxhw'  src="/assets/jxhw.png" /> */}
			<Image className='sc-jxhw'  src="/assets/haowu.png" />

			{/* <Divider className='dy-type' style={{color:'#1021fb',padding:0}}>热门影视</Divider> */}
			<Grid columns={2} gap={10} style={{marginTop:10}}>
				{gameList1}
			</Grid>
			{/* <Image className='sc-jxhw'  src="/assets/hdzq.png" /> */}
			<Image className='sc-jxhw'  src="/assets/hdzq1.png" />
			{/* <Divider className='dy-type' style={{color:'#1021fb'}}>正在热映</Divider> */}
			<Grid columns={2} gap={10} style={{marginTop:10}}>
				{gameList2}
			</Grid>
		</>
	}
	return (
		<div className='App-main'>
			<header className="App-header" style={{color:'#000'}} >
				<NavBar className='app-header'  onBack={back}>{title}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45}}>
				<div className='mall-body' >
					{gameList}
				</div>
			</div>
		</div>
	)
}