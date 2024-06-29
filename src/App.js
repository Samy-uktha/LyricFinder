import React, { Component } from 'react';
import Navbar from'./components/Navbar'
import Lyricinput from './components/Lyricinput';
import LyricsDisplay from './components/Lyricoutput';
import './App.css';


class App extends Component {
  state = {
    artist: '',
    song: '',
    lyrics: '',
    topSongs: [],
  };

  setArtist = (artist) => this.setState({ artist });
  setSong = (song) => this.setState({ song });

  fetchLyrics = async () => {
    const { artist, song } = this.state;
    const response = await fetch('http://127.0.0.1:8000/api/lyrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist, song }),
    });
    const data = await response.json();
    console.log(data)
    console.log("hi sammm")
    this.setState({
      lyrics: data.lyrics,
      topSongs: data.top_songs,
      recommendedSongs: data.recommended_songs,
      youtubeVideo: data.youtube_video,
    });
  };

  render() {
    const { artist, song, lyrics, topSongs, recommendedSongs, youtubeVideo } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Lyricinput
          artist={artist}
          song={song}
          setArtist={this.setArtist}
          setSong={this.setSong}
          fetchLyrics={this.fetchLyrics}
        />
        <LyricsDisplay
          artist={artist}
          song={song}
          lyrics={lyrics}
          topSongs={topSongs}
          recommendedSongs={recommendedSongs}
          youtubeVideo={youtubeVideo}
          fetchLyrics={this.fetchLyrics}
          setSong={this.setSong}
        />
      </div>
    );
  }
}


export default App;
