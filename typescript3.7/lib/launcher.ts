let main = require("./exec__")
let fs = require("fs")

process.stdin.setEncoding('utf8');
let out = fs.createWriteStream(null, { fd: 3 });
process.stdin.on('readable', function() {
  var line = process.stdin.read();
  if (line !== null) {
    try {
        let args = JSON.parse(line)
        let value = args.value || {}
        for (let key in args) {
            if(key !== "value")
              process.env["_OW_"+key.toUpperCase()] = args[key]
        }
        let result = main(value)
        out.write(JSON.stringify(result)+"\n");
    } catch(err) {
        let error = {"error": err}
        out.write(JSON.stringify(error)+"\n");
    }
  }
})