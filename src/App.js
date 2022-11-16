
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const CLIENT_ID = "664b7b95d83d4afb9360d23db26ad1c7"
  const REDIRECT_URI = "http://localhost:3001"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState ("")


  //getting the token 
  useEffect( () => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    //getting the hash.. find access token and remove & on both ends..
    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    }

    window.location.hash = ""
    window.localStorage.setItem("token", token)
    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sptyht</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login 
            to Spotify</a>
            : <button onClick= {logout}>Logout</button> }
      </header>
    </div>
  );
}

export default App;
