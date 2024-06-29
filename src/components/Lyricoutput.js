import React from 'react';

const LyricsDisplay = ({ artist, song, lyrics, topSongs, setSong, fetchLyrics }) => {
  return (
    <div className="lyrics-display">
      <div className="left-column">
          {lyrics && (
            <div>
              <h2>Lyrics for "{song}" by {artist}</h2>
              <pre>{lyrics}</pre>
            </div>
        
          )}
          </div>
          <div className="right-column">
          {topSongs.length > 0 && (
            <div>
              <h2>Top Songs by {artist}</h2>
              <ul>
                {topSongs.map((topSong) => (
                  <li key={topSong}>
                    <button
                      onClick={() => {
                        setSong(topSong);
                        fetchLyrics();
                      }}
                    >
                      {topSong}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

    </div>
  );
};

export default LyricsDisplay;
