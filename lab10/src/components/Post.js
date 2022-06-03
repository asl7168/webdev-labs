import React from 'react';

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.state = {post: this.props.model}
    }

    render = () => {
        const post = this.state.post
        if (!post) { return (<div></div>)}
        else {
            const postID = post.id

            let postAlt = post.alt_text
            if (! (postAlt && postAlt !== "None")){
                postAlt = `${post.user.username}'s post's image`
            }

            let postCaption = ""
            let moreCaption = ""
            
            if (post.caption) {
                postCaption = post.caption.split(" ")

                if (postCaption.length > 30) {
                    postCaption = postCaption.slice(0, 30).join(" ") + "..."
                    moreCaption = "<button>more</button>"
                } else {
                    postCaption = post.caption
                }
            }
            
            let viewAll = ""
            let firstComment = ""
            if (post.comments.length > 0) { 
                firstComment = post.comments.reduce(function(c1, c2) {
                    if (c1.pub_date < c2.pub_date) { return c1 }
                    else { return c2 }
                })
                firstComment = <p id="comment"><span>{firstComment.user.username} </span>{firstComment.text}</p>
            }
            if (post.comments.length > 1) { viewAll = <button aria-label="view all comments" data-card-id={postID} /*onClick={showModal()}*/>View all {post.comments.length} comments</button> }
            
            return (<div className="card" data-card-id={postID}>
                        <header>
                            <h3>{post.user.username}</h3>
                            <button><i className="fas fa-ellipsis-h"></i></button>
                        </header> 
                        <img src={post.image_url} alt={postAlt} />
                        <div className="interactions">
                            <div id="options">
                                <div id="left-options">
                                    {/*
                                    NEED TO REPLACE WITH LIKE COMPONENT
                                    <button aria-label="like" aria-checked="${post.current_user_like_id ? "true" : "false"}" data-card-id="${postID}" data-like-id="${post.current_user_like_id || ""}" onClick="toggleLike(event)"><i className="${post.current_user_like_id ? "fas" : "far"} fa-heart"></i></button>
                                    */}
                                    <button><i className="far fa-comment"></i></button>
                                    <button><i className="far fa-paper-plane"></i></button>
                                </div>
                                {/*
                                NEED TO REPLACE WITH BOOKMARK COMPONENT
                                <button aria-label="bookmark" aria-checked={post.current_user_bookmark_id ? "true" : "false"} data-card-id={postID} data-bookmark-id={post.current_user_bookmark_id || ""} onClick="toggleBookmark(event)"><i className={(post.current_user_bookmark_id ? "fas" : "far") + "fa-bookmark"}></i></button>
                                */}
                            </div>
                            {/*
                            WILL ALSO BE AFFECTED BY LIKE COMPONENT?
                            <div id="likes"><p>${post.likes.length} Likes</p></div>
                            */}
                            <div id="caption">
                                <p><span>{postCaption !== "" ? post.user.username : ""} </span>
                                    {postCaption}
                                    {moreCaption}
                                </p>
                            </div>
                            <div className="comments">
                                {viewAll}
                                {firstComment}
                                <p id="when">{post.display_time.toUpperCase()}</p>
                            </div>
                            <div className="react">
                                <div id="compose">
                                    <i className="far fa-smile"></i>
                                    <input type="text" aria-label="add a comment here" id="add-comment" name="add-comment" placeholder="Add a comment here..." />
                                </div>
                                <button aria-label="post comment from add-comment" data-card-id={postID} /*onClick="addComment(event)"*/>Post</button>
                            </div>
                        </div>
            </div>)
        }
    }
}

export default Post;