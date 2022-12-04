import axios from 'axios';
import {
	setHomeList,setDictionary
} from '../store';

import Auth from './Auth'
// async/await 方式使用
// async function getUser() {
//   try {
//     const response = await axios.get('/user', {
//       params: {
//         ID: 12345
//       }
//     });
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// Promise 方式调用
function homeList(params:any,dispatch:any){
	axios.get(address()+'home/list', {
		params: params,
		...Auth.verify(params)
	})
	.then(function (response) {
		if(response.data.code == 0){
			// console.log("data",response.data.data);
			document.title = response.data.data.website_name
			dispatch(setHomeList(response.data.data))
			dispatch(setDictionary(response.data.data.dictionary))
			setRecordType(response.data.data.list)
		}
		// handle success
		// console.log(response);
	})
	.catch(function (error) {
		// handle network error
		console.log(error);
	})
}
const setRecordType = function(list:any){
	let tmp = new Array()
	let row:any
	for (var i=0;i<list.length;i++)
	{ 	
		row = {label: list[i].title, value: list[i].name}
		// console.log(row)
		tmp.push(row)
	}
	let tmp1 = new Array()
	tmp1.push(tmp)
	localStorage.setItem("list", JSON.stringify(tmp1))
}
function address(url:any=''){
	if(url == ''){
		url = localStorage.getItem("apiUrl")
	}
	return url+"/index.php?r="
}
export default {address,homeList}