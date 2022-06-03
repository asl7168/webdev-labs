import React from "react";
import { getHeaders } from "../utils";

class BookmarkButton extends React.Component {

    constructor(props) {
        super(props)
        this.toggleBookmark = this.toggleBookmark.bind(this)
        this.bookmarkPost = this.bookmarkPost.bind(this)
        this.unbookmarkPost = this.unbookmarkPost.bind(this)
    }

    render() {
        return (
            <button aria-label="bookmark" aria-checked={postMessage.bookmarkId ? true : false} onClick={this.toggleBookmark}>
                <i className={(this.props.bookmarkId ? "fas" : "far") + " fa-bookmark"}></i>
            </button>
        )
    }

    async bookmarkPost() {
        const dataToPost = {"post_id": this.props.postId}

        const url = "/api/bookmarks/"
        const response = await fetch(url, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(dataToPost)
        })
        const data = await response.json()
    }

    async unbookmarkPost() {
        const url = `/api/bookmarks/${this.props.bookmarkId}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: getHeaders()
        })
        const data = await response.json()
    }

    async toggleBookmark(ev) {
        if (this.props.bookmarkId) { await this.unbookmarkPost() }
        else { await this.bookmarkPost() }

        this.props.redrawPost()
    }
}

export default BookmarkButton