import React, { useState,useEffect } from 'react'
import { NavBar, Image,Form,Button,Divider,TextArea,CheckList,Grid,Popup,List,Toast,Space,Dialog,Calendar } from 'antd-mobile'
import {
  useNavigate,
} from 'react-router-dom'
import moment from "moment";
import './index.css'
import Auth from '../../lib/Auth';
import { 
	AddCircleOutline,
} from 'antd-mobile-icons'
import { setLoading } from '../../store'
import {useDispatch } from 'react-redux'
export default () => {
	const [messageContact, setMessageContact] = useState<{}[]>([])
	const [selectContact, setSelectContact] = useState<string[]>([])
  const [visible4, setVisible4] = useState(false)
  const [text, setText] = useState('')
  const dispatch = useDispatch()
	let navigate = useNavigate()
	Auth.page(navigate)


	useEffect(() => {
	},[])
  const back = () =>{
		navigate(-1);
	}

  const getMessageContact = function(){
		Auth.ajax(navigate,'message/contact')
		.then(function (response:any) {
			setMessageContact(response)
		})
	}  
  const send = function(){
    if(selectContact.length == 0){
      Toast.show({
				icon: "fail",
				content: '请添加接收人',
			})
      return
    }
    if(text.trim() == ""){
      Toast.show({
				icon: "fail",
				content: '请输入发送内容',
			})
      return
    }
		dispatch(setLoading(true))
		Auth.ajax(navigate,'message/send',{text:text,list:selectContact})
		.then(function (response) {
			dispatch(setLoading(false))
      Toast.show({
				icon: 'success',
				content: '发送成功！',
			})
			setTimeout(()=>{
				navigate(-1)
			},1000)
		}).catch(function (error) {
			dispatch(setLoading(false))
		})
	}
	useEffect(() => {
		getMessageContact();
  },[])


	const right = (
    <div style={{ fontSize: 24 }} onClick={send}>
      <div className='message-send'>发送</div>
    </div>
  )
	return (
		<div className='App-main'>
			<header className="App-header"  >
      	<NavBar className='app-header' onBack={back} right={right} >发送站内信</NavBar>
			</header>
			<div className='App-content' style={{height:window.innerHeight-45,background:"#fff"}}>
        <Grid columns={8} className='message-accept' >
          <Grid.Item span={7} className='message-accept-list'>
            <Space wrap onClick={()=>{setVisible4(true)}}>
              <div>发送给：</div>
              {selectContact.map((item,index)=>{
                if(item == '-1'){
                  return(<div key="-1" className='message-user'>
                    上级
                  </div>)
                }
                let user:any
                messageContact.map((item1:any,index1)=>{
                  if(item1.username == item){
                    user = item1
                  }
                })
                return(<div key={index} className='message-user'>
                  {user.username}
                </div>)
              })}
            </Space>
          </Grid.Item>
          <Grid.Item span={1} onClick={()=>{setVisible4(true)}}> 
            <AddCircleOutline className='message-add-button' />
          </Grid.Item>
        </Grid>
        <Divider />
        <TextArea
          className='message-text'
          placeholder='请输入内容'
          autoSize={{ minRows: 3, maxRows: 20 }}
          onChange={val => {
            setText(val)
          }}
        />
        <Popup
          visible={visible4}
          onMaskClick={() => {
            setVisible4(false)
          }}
        >
          <div
            style={{ height: '40vh', overflowY: 'scroll', padding: '0px' }}
          >
            <CheckList multiple defaultValue={[]} onChange={(values)=>{
              console.log(values)
              setSelectContact(values)
            }}>
              <CheckList.Item value="-1" className='message-p'>上级</CheckList.Item>
              {messageContact.map((item:any,index)=>{
                return (<CheckList.Item value={item.username} key={index} >{item.username}</CheckList.Item>)
              })}
            </CheckList>
          </div>
        </Popup>
			</div>
		</div>
	)
}