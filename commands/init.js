let cli = require('heroku-cli-util')
var fs = require('fs');

module.exports = {
  topic: 'chatbox',
  command: 'init',
  description: 'create Procfile',
  help: 'help text for hello:world',
  run: function (context) {
      var text = `#Procfile :see https://devcenter.heroku.com/articles/custom-php-settings
web: vendor/bin/heroku-php-apache2 public/
`;
      fs.writeFile('Procfile', text);
  }
};