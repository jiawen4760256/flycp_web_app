import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Space,Picker,Toast,Grid,InfiniteScroll,List,Empty,Tabs,Dialog,ProgressBar } from 'antd-mobile'
import { 
	DownOutline,UndoOutline
} from 'antd-mobile-icons'
import {
  useNavigate,
} from 'react-router-dom'
import './index.css'
import { useSelector } from 'react-redux';
import {
  getHomeList,
} from '../../store';
import axios from 'axios';
import Api from '../../lib/Api'
let LineTimeout = false 
// let LineUrl = 'http://192.168.1.188:3000' 
let LineUrl = '' 
export default () => {

	const {appUrl} = useSelector(getHomeList);
	const [line0, setLine0] = useState<string[]>(['#2c3039','检测中','0'])
	const [line1, setLine1] = useState<string[]>(['#2c3039','检测中','0'])
	const [line2, setLine2] = useState<string[]>(['#2c3039','检测中','0'])
  const demoSrc = '/app/check.jpg'
  const color0 = '#2c3039'
  const color1 = '#87d068'
  const color2 = '#ffe121'
  const color3 = '#ff4010'
  function homeList(url:string,id:number){
    let startTime = (new Date()).valueOf()
    axios.get(Api.address(url)+'home/ping', {params:{id:startTime}})
    .then(function (response) {
      let tmp
      if(response.data.code == 0){
        let ms = (new Date()).valueOf() - startTime
        let progress = 0
        let time = '检测中'
        let color = color0
        if(ms<500){
          progress =85
          time = ms+'ms'
          color = color1
        }else if(ms<1500){
          progress =50
          time = ms+'ms'
          color = color2
        }else{
          progress =10
          time = ms+'ms'
          color = color3
        }
        tmp = [color,time,progress+""]
      }else{
        let progress = 0
        let time = '超时'
        let color = color3
        tmp = [color,time,progress+""]
      }
      updateData(id,tmp)
      // setStatusData(tmp)
    })
    .catch(function (error) {
      let progress = 0
      let time = '超时'
      let color = color3
      let tmp = [color,time,progress+""]
      updateData(id,tmp)
    })
  }
  const updateData=(id:number,data:any)=>{
    if(LineUrl == ''){
      LineUrl = appUrl[id]
    }
    if(id==0){
        setLine0(data)
    }
    if(id==1){
        setLine1(data)
    }
    if(id==2){
        setLine2(data)
    }
  }
  useEffect(() => {
    // if(appUrl.length != 0 ){
    //   console.log(appUrl)
    //   getStatus()
    // }
    if(!LineTimeout && appUrl.length != 0){
      LineTimeout = true
      setTimeout(()=>{
        getStatus()
      },500)
      
      setTimeout(()=>{
        if(LineUrl != ''){
          window.location.href = LineUrl
        }
      },5000)

    }
    return(()=>{LineTimeout=false})
  },[appUrl])
  const getStatus = ()=>{
    let init = ['#2c3039','检测中','0']
    setLine0(init)
    setLine1(init)
    setLine2(init)
    
    homeList(appUrl[0],0)
    homeList(appUrl[1],1)
    homeList(appUrl[2],2)
    // let tmp:any = {};
    // appUrl.map((item:any,index:any)=>{
    //   tmp[index]={start:(new Date()).valueOf(),end:0} 
    // })
    // setStatusData(tmp)
    // appUrl.map((item:any,index:any)=>{
    //   homeList(item,index)
    // })
  }
  const selectLine = (id:number)=>{
    window.location.href = appUrl[id]
  }
  return (
		<div className='App-main' style={{backgroundImage:`url(${demoSrc})`,backgroundSize:'100% 100%'}}>
      <div className='check-titel'>线路检测</div>
      <div className='check-type-list'>
        <Space wrap>
          <div className='check-color' style={{backgroundColor:color1}}></div><div className='check-type'>畅通</div>
          <div className='check-color' style={{backgroundColor:color2}}></div><div className='check-type'>较好</div>
          <div className='check-color' style={{backgroundColor:color3}}></div><div className='check-type'>一般</div>
          <UndoOutline className='check-update' onClick={getStatus}/>
        </Space>
      </div>
      <div className='check-line'>
        {/* {lineHtml} */}
        <div >
          <br/>
          <Space wrap className='check-row'>
            <div className='check-color' style={{backgroundColor:line0[0]}}></div><div className='check-type'>线路1</div>
          </Space>
          <Grid columns={2} gap={0}>
            <Grid.Item  className='check-status-progress'>
              <ProgressBar
                percent={Number(line0[2])}
                style={{
                  '--track-width': '10px',
                  '--fill-color':line0[0]
                }}
              />
            </Grid.Item>
            <Grid.Item className='check-status-button'>
              <Space >
                <div className='check-status-txt'>
                  {line0[1]}
                </div>
                <Button color='primary' fill='outline' size='mini' style={{'--border-color': '#31a0c0','--text-color': '#fff'}} onClick={()=>{selectLine(0)}}>
                  立即登录
                </Button>

              </Space>
            </Grid.Item>
          </Grid>
        </div>
        
        <div >
          <br/>
          <Space wrap className='check-row'>
            <div className='check-color' style={{backgroundColor:line1[0]}}></div><div className='check-type'>线路2</div>
          </Space>
          <Grid columns={2} gap={0}>
            <Grid.Item  className='check-status-progress'>
              <ProgressBar
                percent={Number(line1[2])}
                style={{
                  '--track-width': '10px',
                  '--fill-color':line1[0]
                }}
              />
            </Grid.Item>
            <Grid.Item className='check-status-button'>
              <Space >
                <div className='check-status-txt'>
                  {line1[1]}
                </div>
                <Button color='primary' fill='outline' size='mini' style={{'--border-color': '#31a0c0','--text-color': '#fff'}} onClick={()=>{selectLine(1)}}>
                  立即登录
                </Button>

              </Space>
            </Grid.Item>
          </Grid>
        </div>
        
        <div >
          <br/>
          <Space wrap className='check-row'>
            <div className='check-color' style={{backgroundColor:line2[0]}}></div><div className='check-type'>线路3</div>
          </Space>
          <Grid columns={2} gap={0}>
            <Grid.Item  className='check-status-progress'>
              <ProgressBar
                percent={Number(line2[2])}
                style={{
                  '--track-width': '10px',
                  '--fill-color':line2[0]
                }}
              />
            </Grid.Item>
            <Grid.Item className='check-status-button'>
              <Space >
                <div className='check-status-txt'>
                  {line2[1]}
                </div>
                <Button color='primary' fill='outline' size='mini' style={{'--border-color': '#31a0c0','--text-color': '#fff'}} onClick={()=>{selectLine(2)}}>
                  立即登录
                </Button>

              </Space>
            </Grid.Item>
          </Grid>
        </div>
      </div>
		</div>
  )
}