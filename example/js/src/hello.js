exports.main = function (args) {
    var name = args.name || "world"
    console.log("name: ", name)
    return {
        body: "Hello, "+name
    }
}



