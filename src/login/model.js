import {fetch,fetchAll} from '../lib/postgres.js'
const INSERT_USER = `
  insert into users(first_name,last_name,email,password,specialist)
  values($1,$2,$3,$4,$5)
  returning *
`
const login = async (firstname,lastname,email,password,specialist)=>{
  try{
    return  await fetch(INSERT_USER,firstname,lastname,email,password,specialist)
  }catch(e){
    throw e
  }
}

export default {
  login
}
