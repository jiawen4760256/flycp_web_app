
import axios from 'axios';
import Qs from 'qs'
import {Toast} from 'antd-mobile'
import { ExclamationCircleOutline} from 'antd-mobile-icons'

import Api from './Api'
const Auth = {
  navigate : (navigate:any,path:string) => {
    // navigate(path); return
    if(localStorage.getItem("token")){
      navigate(path)
    }else{
      navigate('/login/null')
    }
  },
  page : (navigate:any) => {
    // return
    if(!localStorage.getItem("token")){
      navigate('/')
    }
  },
  ajax : (navigate:any,path:string,params:any={}) => {
    params.token = localStorage.getItem("token")
    if(!params.token){
      const promise = new Promise(function (resolve, reject) {
        resolve({})
      });
      Toast.show({
        icon: <ExclamationCircleOutline />,
        content: "您尚未登录",
      })
      navigate('/')
      return promise;
    }
		return axios.post(Api.address()+path, Qs.stringify(params))
		.then(function (response) {
			if(response.data.code == 0){
				return response.data.data
			}else{
        // console.log('response',response)
				// Toast.show({
				// 	icon: 'fail',
				// 	content: response.data.msg,
				// })
        if(201 == response.data.code){
          Toast.show({
          	icon: <ExclamationCircleOutline />,
          	content: response.data.msg,
          })
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          navigate('/')
          return {}
        }else{
          throw new Error(response.data.msg)
        }
			}
		})
		.catch(function (error) {
      if(path != 'user/ping'){
        // console.log('error',error)
        Toast.show({
          icon: <ExclamationCircleOutline />,
          content: error.message,
        })
      }
      throw error
		})
  }

}

export default Auth