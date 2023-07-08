import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Space,Picker,Toast,Grid,InfiniteScroll,List,Empty,Tabs,Dialog,Input } from 'antd-mobile'
import { ExclamationCircleOutline,CheckShieldFill,CheckCircleOutline} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import Auth from '../../lib/Auth';
import { useSelector } from 'react-redux';
import {
  getHomeList,
} from '../../store';
import md5 from "js-md5";
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'
export default () => {
	
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const {checkCode} = useSelector(getHomeList);
	const [value, setValue] = useState('')
	
  useEffect(() => {
		dispatch(setLoading(false))
  },[])
  const demoSrc = '/app/map.png'
  const titleImg = '/app/title_img.png'
  const ztImg = '/app/zt_img.png'
	const onFinish = () => {
    console.log(value)
		if(md5(value) == checkCode){
			localStorage.setItem('checkCode','1')
			// navigate('/check/line')
			navigate('/')
		}else{

			Toast.show({
				icon: <ExclamationCircleOutline />,
				content: "vip邀请码错误！",
			})
		}
  }
  return (
		<div className='App-main code-body' style={{"backgroundColor": "#e02c2c"}}>
			<div style={{backgroundImage:`url(${demoSrc})`,backgroundSize:'100% 100%',width: "100%",height: "200px",marginTop:40}}>
				<div  className='check-title-img'>
					{/* <Image src={titleImg} fit='scale-down' /> */}
					<div className='code-title'>
						<CheckShieldFill /> vip邀请码
						 
					</div>
				</div>
			</div>
			<div className='check-code'>
				<Grid columns={4} gap={8} style={{height: '40px',lineHeight: '40px'}}>
          <Grid.Item span={1} style={{textAlign:'right',color:'#e61516',fontSize:'15px'}}>
					编 号 :
          </Grid.Item>
          <Grid.Item span={3}>
						<Input
							style={{height: '40px',lineHeight: '40px'}}
							placeholder='请输入vip邀请码'
							value={value}
							onChange={val => {
								setValue(val)
							}}
						/>
          </Grid.Item>
        </Grid>
			</div>
			<div className='check-button' onClick={onFinish}>
				立即加入
			</div>
			<div className='check-zt-img' >
				<Image src={ztImg} />
			</div>

		</div>
  )
}