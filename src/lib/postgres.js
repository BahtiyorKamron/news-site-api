import {pgConfig} from '../config.js'
import pkg from 'pg';
const {Pool} = pkg;

const pool= new Pool(pgConfig)
async function fetch (query, ...array) {
	const client = await pool.connect()
	try {
		const { rows:[row] } = await client.query(query, array.length ? array : null)
		return row
	} catch(error) {
		console.log(error)
	} finally {
		await client.release()
	}
}
async function fetchAll (query, ...array) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, array.length ? array : null)
		return rows
	} catch(error) {
		console.log(error)
	} finally {
		await client.release()
	}
}
export{
  fetch,fetchAll
}
