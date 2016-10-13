'use strict'
let cli = require('heroku-cli-util')
let co  = require('co')
let url = require('url')

function* app (context, heroku) {
  let res = yield {
    app:    heroku.get(`/apps/${context.app}`),
    config: heroku.get(`/apps/${context.app}/config-vars`),
  }
  if(res.config.DATABASE_URL){
	const db = url.parse(res.config.DATABASE_URL);
	const user = db.auth.split(':')[0];
	const pass = db.auth.split(':')[1];
	let jdbc = `jdbc:postgresql://${db.host}${db.path}?user=${user}&password=${pass}&ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory`;
	console.log(jdbc);
  }else{
	console.log("error: cant get DATABASE_URL")
  }
}

module.exports = {
  topic: 'chatbox',
  command: 'jdbc',
  description: 'get jdbc config param',
  help: 'help text for hello:world',
  needsApp: true,
  needsAuth: true,
  run: cli.command(co.wrap(app))
}