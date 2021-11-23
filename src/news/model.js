import {fetch,fetchAll} from '../lib/postgres.js'

const GET_NEWS = 'select * from news'

const UPDATE_NEWS = `
WITH old_data as (
SELECT
news_id,
news_title,
news_body,
author_id
FROM news
WHERE news_id = $1
) UPDATE news c SET
news_title = (
CASE
WHEN length($2) > 1 THEN $2
ELSE o.news_title
END),
news_body=(
  case
  when length($3)>1 THEN $3
  else o.news_body
  end
),
author_id=(
  case
  when $4>0 THEN $4
  else o.author_id
  end
)
FROM old_data o
WHERE c.news_id = $1
RETURNING c.*;
`

const FILTER_NEWS = `select
        *
    from news
    where
    case
        WHEN $1 > 0 THEN  news_lang_id = $1
        ELSE true
    end and
    case
        WHEN $2 > 0 THEN  author_id = $2
        ELSE true
    end and
    case
        WHEN $3 >  0 THEN  categor_id = $3
        ELSE true
    end and
    case
        WHEN $4 >  0 THEN  news_id = $4
        ELSE true
    end

`
const SORT = `
select
        *
    from news
    order by
    news_title
    case
        WHEN length($1) > 0 THEN  $1
        ELSE true
    end and
    case
        WHEN length($2) > 0 THEN  news_created_time = $2
        ELSE true
    end

`
const DELETE_NEWS = `
    delete from news where news_id=$1
    returning *
`

const INSERT_NEWS = `
   insert into news(news_title,news_body,news_views,categor_id,author_id,news_lang_id)
   values($1,$2,$3,$4,$5,$6)
   returning *
`
const insertNews = async ({newsTitle,newsBody,newsViews,categoryId,authorId,newsLangId})=>{
  try{
    return await fetch(INSERT_NEWS,newsTitle,newsBody,newsViews,categoryId,authorId,newsLangId)
  }catch(e){
    throw e
  }
}
const filterNews = async ({langId,authorId,categoryId,newsId})=>{
  try{
    return await fetchAll(FILTER_NEWS,langId,authorId,categoryId,newsId)
  }catch(e){
    throw e
  }
}
const getNews = async ()=>{
  try{
    return await fetchAll("select * from news")
  }catch(e){
    throw e
  }
}

const updateNews = async ({newsId,newsTitle,newsBody,authorId})=> {
  try{
    return await fetch(UPDATE_NEWS,newsId,newsTitle,newsBody,authorId)
  }catch(e){
    throw e
  }
}
const deleteNews = async ({newsId})=>{
  try{
      return await fetch(DELETE_NEWS,newsId)
  }catch(e){
    throw e
  }
}
const sort = async ({title="",time=""})=>{
  try{
    return await fetchAll(SORT,title,time)
  }catch(e){
    throw e
  }
}
export default{
      getNews,
      updateNews,
      deleteNews,
      insertNews,
      filterNews,
      sort
}
