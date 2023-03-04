import axios from 'axios';

let devMode = true ;

export function save(key,val) {  
  if(key === 'token')axios.defaults.headers.common['Authorization'] = `Bearer ${val}`;
  var saveData;
  if(devMode) saveData= JSON.stringify(val);     
  sessionStorage.setItem(key, saveData);
  return null;
}

export function get(key) {   
  try{
    var getData;
    let str = sessionStorage.getItem(key);
    if(devMode) getData = str ;
    let val = JSON.parse(getData);
    if(key === 'token')axios.defaults.headers.common['Authorization'] = `Bearer ${val}`;
    return val;
  }catch(e){
    return null;
  }
}

export function format() {   
  try{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }catch(e){
  }
}
