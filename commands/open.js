let cli = require('heroku-cli-util')

module.exports = {
  topic: 'cb',
  command: 'open',
  description: 'open heroku dashboard',
  help: 'help text for hello:world',
  needsApp: true,
  run: function (context) {
  	var exec = require('child_process').exec;
	var cmd = `open https://dashboard.heroku.com/apps/${context.app}`;

	exec(cmd, function(error, stdout, stderr) {
	  console.log(cmd)
	});
  }
};