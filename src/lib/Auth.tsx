
import axios from 'axios';
import Qs from 'qs'
import {Toast} from 'antd-mobile'
import { ExclamationCircleOutline} from 'antd-mobile-icons'
import md5 from "js-md5";
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
  verify:(params:any)=>{
    let keyList = Object.keys(params).sort()
    let str = '';
    for(let i=0;i<keyList.length;i++){
      let tmp = ''
      if(params[keyList[i]] instanceof Array){
        let params1 = params[keyList[i]]
        for(let j=0;j<params1.length;j++){
          if(params1[j] !== null && params1[j]!== ''){
            tmp = params1[j]
            str +=tmp+'&'
          }
        }
      }else if(params[keyList[i]] instanceof Object){
        let params1 = params[keyList[i]]
        let keyList1 = Object.keys(params1).sort()
        for(let j=0;j<keyList1.length;j++){
          if(params1[keyList1[j]] !== null && params1[keyList1[j]] !== ''){
            tmp = params1[keyList1[j]]
            str +=tmp+'&'
          }
        }
      }else{
        if(params[keyList[i]] !== null && params[keyList[i]] !== ''){
          tmp = params[keyList[i]]
          str +=tmp+'&'
        }
      }
    }
    let time = Date.now()
    str +='ArEVTpnKpK&'+time
    return {
      headers:{
        v:md5(str),
        t:time,
        language:localStorage.getItem('language')??""
      }
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
    // Auth.verify(params)
		return axios.post(Api.address()+path, Qs.stringify(params),Auth.verify(params))
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