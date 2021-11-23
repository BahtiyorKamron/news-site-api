import express from 'express'
import Joi from 'joi'
// import model from './model.js'
import jwt from 'jsonwebtoken'
import {fetch,fetchAll} from '../lib/postgres.js'
const logRouter = express.Router()


logRouter.post('/login',async(req,res)=>{
   try{
     let {email,password} = req.body
     let users = await fetchAll("select * from users")
     let user = users.find(f => f.email==email && f.password==password)
     if(!user) throw new Error("Login yoki paro hato")
     res.json({
       message:"Siz tizimga kirdingiz",
       token:jwt.sign({emai:email},'white')
     })
   }catch(e){
     res.json({
       error:e.message
     })
   }
})

export {
  logRouter
}
