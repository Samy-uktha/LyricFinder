import React from "react";

const Lyricinput = ( {artist, song, setArtist, setSong, fetchLyrics} ) => {
  return (
    <form>
      <div className="mt-5 container">

        <div className="form-label">
          <label htmlFor="song-name" className="form-label">
            Enter Song Name
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Song Name"
              id="song-name"
              aria-describedby="song-name"
              value={song}
              onChange={(e) => setSong(e.target.value) }
            />
          </div>

          <div className="form-label">
            <label htmlFor="artist-name" className="form-label">
              Enter Artist Name
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Artist Name"
                id="artist-name"
                aaria-describedby="artist-name"
                value={artist}
                onChange={(e) => setArtist(e.target.value) }
              />
            </div>
          </div>
          <div className="mt-5 container">
          <button type="submit" className="btn btn-outline-primary" onClick={fetchLyrics}>Get Lyrics</button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Lyricinput;
