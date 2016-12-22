'use strict'
let cli = require('heroku-cli-util')
let co  = require('co')
let url = require('url')

function* app (context, heroku) {
  let res = yield {
    app:    heroku.get(`/apps/${context.app}`),
    config: heroku.get(`/apps/${context.app}/config-vars`),
  }
    var fs = require('fs');
    fs.readFile(context.cwd+'/.env', 'utf8', function (err, text) {
        if(err){
            console.log("cant read file")
            return ;
        }else{
            const lines = text.split(/\r\n|\r|\n/);
            let syncBuf = {};
            let inBuf = false;
            for(let index in lines){
                const line = lines[index].trim();
                if(line === "# ENDSYNCWITHHEROKU"){
                    inBuf = false;
                }
                if(inBuf){
                    const key = line.split("=")[0];
                    const val = line.split("=")[1];
                    syncBuf[key] = val;
                }
                if(line === "# SYNCWITHHEROKU"){
                    inBuf = true;
                }
            }
            console.log(syncBuf)
            heroku.patch(`/apps/${context.app}/config-vars`,{
                body: syncBuf
            })

        }
    });
}

module.exports = {
  topic: 'chatbox',
  command: 'cb',
  description: 'config sync with .env on surround with SYNCWITHHEROKU',
  help: '',
  needsApp: true,
  needsAuth: true,
  run: cli.command(co.wrap(app))
}