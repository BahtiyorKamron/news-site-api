import express from 'express'
import Joi from 'joi'
import model from './model.js'
import jwt from 'jsonwebtoken'
import {fetch,fetchAll} from '../lib/postgres.js'
const categoryRouter = express.Router()

categoryRouter.get('/categories',async (req,res)=>{
       try{
         let {lang} = req.query
       if(lang){
         let categories = await fetchAll(`select * from categories
         natural join languages where categories.categor_lang_id=languages.lang_id`)
         let query = categories.filter(f => f.lang_name==lang)
         res.json({
           status:200,
           data:query
         })
       }else{
         let categories = await fetchAll("select * from categories")
         res.json({
           status:200,
           data:categories
         })
       }}catch(e){
         res.json({
           error:e.message
         })
       }
})

           .post('/categories',async (req,res)=>{
                   try{
                       let {categorName,languageId} = req.body
                       let langs = [1,2,3]
                       if(!langs.includes(languageId)) throw new Error('nomalum til')
                       if(categorName.length>100) throw new Error('Categor name haddan ortiq uzun')
                       if(categorName.length<5) throw new Error("Categor name haddan ortiq kichkina")
                       let categor = await model.insertCategor(categorName,languageId)
                       if(categor){
                         res.json({
                           status:200,
                           message:"Kategoriya qo'shildi",
                           data:categor
                         })
                       }
                   }catch(e){
                     res.json({
                       error:e.message
                     })
                   }
                  })
           .delete('/categories',async (req,res)=>{
             try{
                 let {categorId} = req.query
                 let categor = await model.deleteCategory(categorId)
                 if(categor){
                   res.json({
                     status:200,
                     message:"Kategoriya o'chirildi!",
                     data:categor
                   })
                 }
             }catch(e){
              res.json({
                error:e.message
              })
             }
           })
           .put('/categories',async (req,res)=>{
             try{
                let {categorName,categorId} = req.body
                console.log(categorName,categorId)
                let categor = await model.updateCategor(categorId,categorName)
                if(categor){
                  res.json({
                    status:200,
                    message:"Kategoriya yangilandi",
                    data:categor
                  })
                }
             }catch(e){
               res.json({
                 error:e.message
               })
             }
           })

export  {
  categoryRouter
}
