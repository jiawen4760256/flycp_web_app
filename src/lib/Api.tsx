import axios from 'axios';
import {
	setHomeList
} from '../store';

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
		params: params
	})
	.then(function (response) {
		if(response.data.code == 0){
			// console.log("data",response.data.data);
			dispatch(setHomeList(response.data.data))
		}
		// handle success
		// console.log(response);
	})
	.catch(function (error) {
		// handle network error
		console.log(error);
	})
}

function address(url:any=''){
	if(url == ''){
		url = localStorage.getItem("apiUrl")
	}
	return url+"/index.php?r="
}
export default {address,homeList}