import React from 'react';
import { getHeaders } from '../utils';
import Post from "./Post";

class Posts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {posts: []}
        this.fetchPosts = this.fetchPosts.bind(this)
    }

    componentDidMount = () => { this.fetchPosts() }

    async fetchPosts() {
        const url = "/api/posts"
        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders()
        })
        const posts = await response.json()
        this.setState({ posts: posts})
    }

    render = () => {
        return (
            <div id="posts">
                {
                    this.state.posts.map(post => {
                        return ( <Post model={post} key={'post-'+post.id} /> )
                    })
                }
            </div>
        )
    }

}

export default Posts;