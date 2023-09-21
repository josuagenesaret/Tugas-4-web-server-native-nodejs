const https = require("https");

const postCommentHandler = {}

postCommentHandler.getAllPostComment = (req, res) => {
    https.get('https://jsonplaceholder.typicode.com/posts', (postsResponse) => {
        let postData = '';

        postsResponse.on('data', (chunk) => {
            postData += chunk;
        });

        postsResponse.on('end', () => {
            const posts = JSON.parse(postData);

            https.get('https://jsonplaceholder.typicode.com/comments', (commentsResponse) => {
                let commentData = '';

                commentsResponse.on('data', (chunk) => {
                    commentData += chunk;
                });

                commentsResponse.on('end', () => {
                    const comments = JSON.parse(commentData);

                    // Gabungkan data post dan comment
                    const postsDanComments = posts.map((post) => {
                        const postComments = comments.filter((comment) => comment.postId === post.id);
                        return {
                            id: post.id,
                            judulPost: post.title,
                            contentPost: post.body,
                            comments: postComments.map((comment) => ({
                                postId: comment.postId,
                                namaUser: comment.name,
                                emailUser: comment.email,
                                contentComment: comment.body,
                            })),
                        };
                    });

                    res.writeHead(200, "OK");
                    res.end(JSON.stringify(postsDanComments));
                });
            });
        });
    });
}




module.exports = postCommentHandler