'use strict'
exports.topic = {
  name: 'hello',
  // this is the help text that shows up under `heroku help`
  description: 'a topic for the hello world plugin'
}

exports.commands = [
	require("./commands/open.js"),
	require("./commands/jdbc.js"),
]
