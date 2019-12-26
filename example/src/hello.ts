export interface Hello {
    name: string | null
}

export function hello(args: Hello) {
    let name = args.name || "world"
    console.log("name: ", name)
    return {
        body: "Hello, "+name
    }
}
