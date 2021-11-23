import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(),'src','.env')})

const pgConfig ={
  user:process.env.PG_USER,
  host:process.env.PG_HOST,
  port:process.env.PG_PORT,
  database:process.env.PG_DATABASE,
  password:process.env.PG_PASSWORD

}

export {
  pgConfig
}
