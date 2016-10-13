'use strict'
let cli = require('heroku-cli-util')
let co  = require('co')
let url = require('url')

function* app (context, heroku) {
    // let res = yield {
    // app:    heroku.get(`/apps/${context.app}`),
    // config: heroku.get(`/apps/${context.app}/config-vars`),
    // }
    const apps = context.args.apps.split("...")
    let appInfo = {};
    let columns = [{
        key: "key"
    }];
    let keys = new Set();
    for(let i = 0; i< apps.length; i++){
        let res = yield {
            app:    heroku.get(`/apps/${apps[i]}`),
            config: heroku.get(`/apps/${apps[i]}/config-vars`),
        }

        appInfo[apps[i]] = res;
        columns.push({
            key: apps[i]
        });
        Object.keys(res.config).forEach((key)=>{
            keys.add(key)
        })
    }

    let rows = [];
    keys.forEach((key)=>{
        let row = {key}
        apps.forEach((app)=>{
            row[app] = appInfo[app].config[key]
            if(row[app] && row[app].length > 45){
                row[app] = row[app].substr(0,40) + "..."
            }
        })
        rows.push(row)
    })
    // console.log(rows)
    cli.table(rows,columns)


}

module.exports = {
  topic: 'chatbox',
  command: 'configdiff',
  description: 'config sync with .env on surround with SYNCWITHHEROKU',
  help: '',
  args: [ {name: 'apps'} ],
  // needsApp: true,
  needsAuth: true,
  run: cli.command(co.wrap(app))
}