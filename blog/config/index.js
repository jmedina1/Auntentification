require("dotenv").config();

const config = {
spotifyClientId: process.env.spotify_Client_Id,
spotifyClientSecret: process.env.spotify_Client_Secret,
spotifyRedirectUri: process.env.spotify_Redirect_Uri
}
module.exports = { config: config };