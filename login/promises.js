//There are 3 posts
const post = [
    {post_id: 1, title: 'First Post'},
    {post_id: 2, title: 'Second Post'},
    {post_id: 3, title: 'Third Post'}
]

//Each post has its own comment
const comment = [
        {comment_id: 1, post_id: 1,comment: 'First comment'},
        {comment_id: 2, post_id: 2,comment: 'Second comment'},
        {comment_id: 3, post_id: 3,comment: 'Third comment'}
]

//Now, we will write a function to get a post by passing the post id. If the post is found, we will retrieve the comments related to that post.
const getPost = (post_id, callback) =>{
    const foundPost = post.find(post => post.post_id === post_id);
    if(post) {
        callback(null, post);
    }
    else{
        callback('No matching post found',undefined);
    }
}

const getComment = (post_id, callback)=>{
    const result = comment.filter(comment => comment.post_id == post_id);
    if(result){
        callback(null, result);
    }
    else{
        callback('No comment found',undefined);
    }
}
//In the above gets  , if theres an error we will pass it as the first argument, but if we get results, we will call the callback functin and pass the results as the second argument to it.

//Now let's call the functions:
getPost(2, (error,post)=>{
    if(error){
        return console.log(error);
    }
    console.log('Post', post);
    getComment(post.post_id, (error,comments)=>{
        if(error){
            return console.log(error);
        }
        console.log('Comments:', comments)
    })
})