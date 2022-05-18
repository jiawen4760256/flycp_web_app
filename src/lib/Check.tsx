export default (navigate:any)=>{
  if(!localStorage.getItem("checkCode")){
    navigate('/check/code')
  }
}

