from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LASTFM_API_KEY = '33fc96bf95459fb36664ad3e44cad987'

class SongRequest(BaseModel):
    artist: str
    song: str

def get_lyrics(artist, song):
    artist = artist.lower().replace(' ', '')
    song = song.lower().replace(' ', '')
    url = f'https://www.azlyrics.com/lyrics/{artist}/{song}.html'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching lyrics: {e}")
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    try:
        divs = soup.find_all('div', class_=None)
        
        for div in divs:
            if div.find('br'):
                lyrics = div.get_text(separator='\n').strip()
                break
        else:
            raise HTTPException(status_code=404, detail="Lyrics not found.")
        
        lyrics_lines = lyrics.split('\n\n')
        paragraphs = [para.strip() for para in lyrics_lines if para.strip()]
        cleaned_lyrics = '\n'.join(line.strip() for line in lyrics_lines if line.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing lyrics: {e}")
    
    return cleaned_lyrics

def get_top_songs(artist):
    url = f'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist={artist}&api_key={LASTFM_API_KEY}&format=json'
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        top_tracks = data['toptracks']['track']
        top_songs = [track['name'] for track in top_tracks]
    except requests.exceptions.RequestException as e:
        return []
    
    return top_songs


@app.post('/api/lyrics')
async def fetch_lyrics(song_request: SongRequest):
    artist = song_request.artist
    song = song_request.song
    lyrics = get_lyrics(artist, song)
    top_songs = get_top_songs(artist)
    print(lyrics)
    return {
        'artist': artist,
        'song': song,
        'lyrics': lyrics,
        'top_songs': top_songs,
    }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
