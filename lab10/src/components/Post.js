import React from "react";
import { getHeaders } from "../utils"
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.state = {post: this.props.model}
        this.redrawPost = this.redrawPost.bind(this)
    }

    async redrawPost() {
        const url = `/api/posts/${this.state.post.id}`
        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders()
        })
        const post = await response.json()
        this.setState({post: post})
    }

    render() {
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
                    moreCaption = <button>more</button>
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
                                    <LikeButton postId={postID} likeId={post.current_user_like_id} redrawPost={this.redrawPost} />
                                    <button><i className="far fa-comment"></i></button>
                                    <button><i className="far fa-paper-plane"></i></button>
                                </div>
                                <BookmarkButton postId={postID} bookmarkId={post.current_user_bookmark_id} redrawPost={this.redrawPost} />
                            </div>
                            <div id="likes"><p>{post.likes.length} Likes</p></div>
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