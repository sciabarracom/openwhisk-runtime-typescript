exports.main = function(args) { 
    return {
        "body": "hello"+ (args.name || "world") 
    }
} 
