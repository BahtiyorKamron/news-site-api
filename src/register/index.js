import express from 'express'
import Joi from 'joi'
import model from './model.js'
import jwt from 'jsonwebtoken'
import {fetch,fetchAll} from '../lib/postgres.js'
const regRouter = express.Router()

const schema = Joi.object({
  firstname: Joi.string()
  .min(3)
  .max(30)
  .required(),
  lastname: Joi.string()
  .min(3)
  .max(30)
  .required(),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .min(8)
  .max(12)
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  specialist: Joi.string()
  .min(3)
  .max(30)
  .required()
})

regRouter.post('/register',async (req,res)=>{
    let {firstname,lastname,email,password,specialist} = req.body
    try {
       if(!firstname) throw new Error("Ism yozilishi shart!")
       if(!lastname) throw new Error("Familiya yozilishi shart!")
       if(!email) throw new Error("Elektron pochta adresi kiritilishi shart!")
       if(!password) throw new Error("Parol kiritilishi shart!")
       if(!specialist) throw new Error("Mutahasisligingizni kiritish shart!")
       const validation = schema.validate({firstname:firstname,lastname:lastname,email:email,password:password,specialist:specialist})
       if(validation.error) throw new Error(validation.error.details[0].message)
       let users = await fetchAll('select email from users')
       let user = users.find(f => f.email==email)
       if(user) throw new Error("Bu email bilan ro'yhatda o'tilgan!")
       let register = await model.insertUser(firstname,lastname,email,password,specialist)
       res.json({
         message:"Siz muvaffaqiyatli ro'yhadan o'tdingiz!",
         token:jwt.sign({emai:email},'white')
       })
      }catch(e){
          res.json({
          error:e.message
        })
      }

})

export {
  regRouter
}

// const validation = schema.validate({ firstname: firstname,
//   lastname:lastname,
//   password:password,
//   email:email,
//   specialist:specialist });





// const schema = Joi.object({
//   firstname: Joi.string()
//   .min(3)
//   .max(30)
//   .required(),
//   lastname: Joi.string()
//   .min(3)
//   .max(30)
//   .required(),
//   password: Joi.string()
//   .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
//   .required(),
//   email: Joi.string()
//   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//   .required(),
//   specialist: Joi.string()
//   .min(3)
//   .max(30)
//   .required()
// })
