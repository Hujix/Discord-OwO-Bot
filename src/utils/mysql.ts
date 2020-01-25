/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import mysql from 'mysql'
import login from '../../tokens/owo-auth.json'

const config = {
  host: 'localhost',
  user: login.user,
  password: login.pass,
  database: 'owo',
  supportBigNumbers: true,
  bigNumberStrings: true,
  multipleStatements: true,
  charset: 'utf8mb4'
}

const pool = mysql.createPool(config)
/*
pool.on('connection', function (connection) {
	  //console.log('New connect %d', connection.threadId);
});
pool.on('acquire', function (connection) {
	  console.log('Connection %d acquired', connection.threadId);
});
pool.on('enqueue', function () {
	  console.log('Waiting for available connection slot');
});
pool.on('release', function (connection) {
	  console.log('Connection %d released', connection.threadId);
});
*/

export default {
  con: pool,
  mysql
}
