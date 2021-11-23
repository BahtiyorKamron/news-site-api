import {fetch,fetchAll} from '../lib/postgres.js'
const INSERT_CATEGORIES = `
  insert into categories(categor_name,categor_lang_id) values($1,$2)
  returning *
`
const DELETE_CATEGORY = `
   delete from categories where categor_id=$1
   returning *
`
const UPDATE_CATEGORY = `
WITH old_data as (
SELECT
categor_id,
categor_name
FROM categories
WHERE categor_id = $1
) UPDATE categories c SET
categor_name = (
CASE
WHEN length($2) > 1 THEN $2
ELSE o.categor_name
END)
FROM old_data o
WHERE c.categor_id = $1
RETURNING *;

`
const insertCategor = async(categorName,languageId)=>{
  try{
         return await fetch(INSERT_CATEGORIES,categorName,languageId)
  }catch(e){
    throw e
  }
}
const deleteCategory = async (categorId)=>{
  try{
      return await fetch(DELETE_CATEGORY,categorId)
  }catch(e){
    throw e
  }
}
const updateCategor = async (categorName,categorId)=>{
  try{
     return await fetch(UPDATE_CATEGORY,categorName,categorId)
  }catch(e){
    throw e
  }
}

export default {
  insertCategor,
  deleteCategory,
  updateCategor
}
