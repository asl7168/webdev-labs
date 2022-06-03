import React from 'react';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Stories from './components/Stories';
import Suggestions from './components/Suggestions';
import Posts from './components/Posts';

{/* TODO: Break up the HTML below into a series of React components. */}
class App extends React.Component {  

    render () {
        return (
            <div>

            <nav className="main-nav">
                <h1>Photo App</h1>
                <NavBar />
            </nav>

            <aside>
                <header>
                    Profile
                    <Profile />
                </header>
                <div className="suggestions">
                    <p className="suggestion-text">Suggestions for you</p>
                    <div>
                        Suggestions
                        <Suggestions />
                    </div>
                </div>
            </aside>

            <main className="content">
                <header className="stories">
                    Stories
                    <Stories />
                </header>
                <div id="posts">
                    Posts
                    <Posts />
                </div>
            </main>

            </div>
        )
    }
}

export default App;