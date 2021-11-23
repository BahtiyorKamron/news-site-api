import express from 'express'
import Joi from 'joi'
import model from './model.js'
import jwt from 'jsonwebtoken'
import {fetch,fetchAll} from '../lib/postgres.js'
const news = express.Router()

news.get('/news',async (req,res)=>{

  let keys = Object.keys(req.query)

  try{
       if(!keys.length){
         let news = await model.getNews()
         if(news){
           res.json({
             status:200,
             data:news
           })
         }else{
           res.json({
             status:400,
             data:null
           })
         }
       }else{
         let news = await model.filterNews(req.query)
         let values = Object.values(req.query)
         if(values.includes('asc') || values.includes('desc')){
           let news = await model.sort(req.query)
         }
         else if(news){
           res.json({
             status:200,
             data:news
           })
         }
       }
  }catch(e){
    res.json({
      status:400,
      error:e.message
    })
  }

})

.put('/news',async (req,res)=>{
  try{
    let news = await model.updateNews(req.body)
    console.log(news);
     if(news){
       res.json({
        status:200,
        message:"Yangilik yangilandi",
        data:news
      })
    }
  }catch(e){
    res.json({
      error:e.message
    })
  }
})
.delete('/news',async (req,res)=>{
  try{
    let news = await model.deleteNews(req.body)
    if(news){
      res.json({
        status:200,
        message:"Yangilik o'chirildi"
      })
    }else throw new Error("O'chirilmadi")
  }catch(e){
    res.json({
      error:e.message
    })
  }
})
.post('/news',async (req,res)=>{
  try{
    console.log(req.body);
    let news = await model.insertNews(req.body)
    if(news){
      res.json({
        status:200,
        message:"Yangiliklarga qo'shildi",
        data:news
      })
    }else throw new Error("Qo'shilmadi!")
  }catch(e){
    res.json({
      error:e.message
    })
  }
})
export {
  news
}
