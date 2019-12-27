const main = require("./main__")
const readline = require('readline');
const fs = require("fs")

async function actionLoop() {
  const out = fs.createWriteStream(null, 
    { fd: 3, encoding: "utf8" })
  process.stdin.setEncoding('utf8');
  const rl = readline.createInterface({
    input: process.stdin
  });
  for await (const line of rl) {
    try {
      let args = JSON.parse(line)
      let value = args.value || {}
      for (let key in args) {
          if(key !== "value") {
            let envar = "_OW_"+key.toUpperCase()
            process.env[envar] = args[key]
          }
      }
      let result = main.main(value)
      out.write(JSON.stringify(result)+"\n");
    } catch(err) {
      let message = err.message || err.toString()
      let error = {"error": message}
      out.write(JSON.stringify(error)+"\n");
    }
  }
}
actionLoop()
