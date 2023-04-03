export const getToken = ()=>{
    return localStorage.getItem('TOKEN');
}
export const setToken = (data)=>{
     localStorage.setItem('TOKEN',data);
}
