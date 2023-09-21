const https = require("https");


const postHandler = {}

postHandler.getAllPost = (req, res) => {
    https.get("https://jsonplaceholder.typicode.com/posts", (response) => {
        let data = " ";
        response.on("data", (chunk) => {
            data += chunk
        });
        response.on("end", () => {
            const posts = JSON.parse(data)

            const manipulasiPost = posts.map((post) => ({
                userId: post.userId,
                postId: post.id,
                judulPost: post.title,
                content: post.body
            }))
            res.writeHead(200, "OK")
            res.end(JSON.stringify(manipulasiPost));
        })
    })

}



module.exports = postHandler