const https = require("https");

const commentHandler = {}

commentHandler.getAllComments = (req, res) => {
    https.get("https://jsonplaceholder.typicode.com/comments", (response) => {
        let data = " ";
        response.on("data", (chunk) => {
            data += chunk
        });
        response.on("end", () => {
            const comments = JSON.parse(data)

            const manipulasiComment = comments.map((comment) => ({
                postId: comment.postId,
                name: comment.name,
                email: comment.email,
                content: comment.body
            }))
            res.writeHead(200, "OK")
            res.end(JSON.stringify(manipulasiComment))
        })
    })
}


module.exports = commentHandler