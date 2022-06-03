import React from "react";
import { getHeaders } from "../utils";

class LikeButton extends React.Component {

    constructor(props) {
        super(props)
        this.toggleLike = this.toggleLike.bind(this)
        this.likePost = this.likePost.bind(this)
        this.unlikePost = this.unlikePost.bind(this)
    }

    render() {
        return (
            <button aria-label="like" onClick={this.toggleLike}>
                <i className={(this.props.likeId ? "fas" : "far") + " fa-heart"}></i>
            </button>
        )
    }

    async likePost() {
        const dataToPost = {"post_id": this.props.postId}

        const url = "/api/posts/likes/"
        const response = await fetch(url, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(dataToPost)
        })
        const data = await response.json()
    }

    async unlikePost() {
        const url = `/api/posts/likes/${this.props.likeId}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: getHeaders()
        })
        const data = await response.json()
    }

    async toggleLike(ev) {
        if (this.props.likeId) { await this.unlikePost() }
        else { await this.likePost() }

        this.props.redrawPost()
    }
}

export default LikeButton