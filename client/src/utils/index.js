import jwt_decode from 'jwt-decode'

export const isEmail = (string = '') => {
  const regex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return regex.test(string)
}


export const getUserFromToken = (token) => {
    if(token){
       return jwt_decode(token)
    }
    return ''
}