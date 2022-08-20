function getQueryVariable(variable:string)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
export default (navigate:any)=>{
  let p = getQueryVariable('p')
  console.log(p,'p')
  if(p){
    localStorage.setItem('p',p)
  }

  // if(!localStorage.getItem("checkCode")){
  //   let checkCode = getQueryVariable('c')
  //   if(checkCode){
  //     localStorage.setItem('checkCode','1')
  //     return
  //   }
  //   navigate('/check/code')
  // }
}

