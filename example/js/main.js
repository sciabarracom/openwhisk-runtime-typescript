exports.main = function(args) { 
    return {
        "body": "Hello "+ (args.name || "world") 
    }
} 
