export function main(args) {
    let name = args.name || "world"
    console.log("name: ", name)
    return {
        body: "Hello, "+name
    }
}