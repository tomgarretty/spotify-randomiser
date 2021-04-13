# spotify-randomiser
Create new playlist with shuffled content from existing playlist

Requires [NodeJS](https://nodejs.org/en/) to run

## Usage

1. Create a copy of example.env named .env, and fill in the clientId and clientSecret (see below)
2. `npm install`
3. `node index.js`
4. Open http://localhost:3000/

### Creating a Spotify Developer account & getting ClientId and ClientSecret

1. Go to https://developer.spotify.com/
2. Create an account and a new application (called e.g. spotify randomiser)
3. Update the redirectUris to include:
  - http://localhost:3000/auth/spotify/callback
  - http://localhost:3000/authorise
  - http://localhost:3000/api/spotify/authorise
4.  In the application dashboard you should see your clientId and clientSecret
