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
						<div className='sc-itme-img'>
							
							<div className='sc-badge'>
								<Badge content={website_hot==''?<></>:<Image src={website_hot} />} bordered style={{"--color":"none"}}>
									<Image  src={game.img} />
								</Badge>
							</div>
						</div>
						
						<div className='sc-itme-title'>{game.title}</div>
						<div className='sc-itme-desc'>{game.desc}</div>
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
						<div className='sc-itme-img'>
							<div className='sc-badge'>
								<Badge content={website_hot==''?<></>:<Image src={website_hot} />} bordered style={{"--color":"none"}}>
									<Image  src={game.img} />
								</Badge>
							</div>
						</div>
						<div className='sc-itme-title'>{game.title}</div>
						<div className='sc-itme-desc'>{game.desc}</div>
					</div>
				</Grid.Item>
			)
		}
	})
	let title
	let gameList = <></>
	if(params['type'] == '1' || params['type'] == '2'|| params['type'] == '3'|| params['type'] == '4'){
		
		if(params['type'] == '1')title = '电影专区'
		if(params['type'] == '2')title = '线上影视'
		if(params['type'] == '3')title = '腾讯专区'
		if(params['type'] == '4')title = '直播专区'
		gameList = <Grid columns={2} gap={10} style={{marginTop:10}}>
		{
			list.map((game:any, index:any) =>{
				if(game.qishu == params['type']){
					return (
						<Grid.Item  onClick={()=>{navigate("/hall/k3/"+game.name)}}>
							<div className='sc-itme'>
								<div className='sc-itme-img'>
									<div className='sc-badge'>
										<Badge content={website_hot==''?<></>:<Image src={website_hot} />} bordered style={{"--color":"none"}}>
											<Image  src={game.img} />
										</Badge>
									</div>
								</div>
								<div className='sc-itme-title'>{game.title}</div>
								<div className='sc-itme-desc'>{game.desc}</div>
							</div>
						</Grid.Item>
					)
				}
			})
		}
		</Grid>
	}else{
		title = '热销电影'
		gameList = <>
			{/* <Image className='sc-jxhw'  src="/sc/jxhw.png" /> */}
			
			<Divider className='dy-type'>正在热映</Divider>
			<Grid columns={2} gap={10} style={{marginTop:10}}>
				{gameList1}
			</Grid>
			{/* <Image className='sc-jxhw'  src="/sc/hdzq.png" /> */}
			<Divider className='dy-type'>即将上映</Divider>
			<Grid columns={2} gap={10} style={{marginTop:10}}>
				{gameList2}
			</Grid>
		</>
	}
	return (
		<div className='App-main'>
			<header className="App-header"  >
				<NavBar className='app-header'  onBack={back}>{title}</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,backgroundColor:"#f5fbf9"}}>
				<div className='mall-body' >
					{gameList}
				</div>
			</div>
		</div>
	)
}