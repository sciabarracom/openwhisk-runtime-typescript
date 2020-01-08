const main = require("./main__").main
const readline = require('readline');
const fs = require("fs")
const os = require("os")

function vscodeDebug() {
  let ifaces = os.networkInterfaces()
  for(let iface of Object.keys(ifaces)) {
    for(let ip of ifaces[iface]) {
      if(!ip.internal) {
        return {
          "type": "node",
          "request": "attach",
          "name": process.env["__OW_ACTION_NAME"],
          "address": ip.address,
          "port": 8081,
          "localRoot": "${workspaceFolder}",
          "remoteRoot": __dirname
        }
      }
    }
  }
  return {"error": "cannot find external interface"}
}

async function actionLoop() {
  const out = fs.createWriteStream(null, 
    { fd: 3, encoding: "utf8" })
    process.stdin.setEncoding('utf8');
  const rl = readline.createInterface({
    input: process.stdin
  });
  const debugging = "__OW_DEBUG_PORT" in process.env
  for await (const line of rl) {
    try {
      let args = JSON.parse(line)
      let value = args.value || {}
      for (let key in args) {
          if(key !== "value") {
            let envar = "__OW_"+key.toUpperCase()
            process.env[envar] = args[key]
          }
      }
      let result = {}
      if(debugging && "debugWith" in value) {
        if(value["debugWith"]==="vscode")
          result = vscodeDebug()
        else
          result = {"error": "requested unknown debugger"}
      } else {
        result = main(value)
      }
      out.write(JSON.stringify(result)+"\n");
    } catch(err) {
      let message = err.message || err.toString()
      let error = {"error": message}
      out.write(JSON.stringify(error)+"\n");
    }
  }
}
actionLoop()
