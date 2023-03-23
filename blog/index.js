const express = require("express");
const path = require("path");
const request = require("path");
const querystring = require('querystring');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const generateRandomString = require('./utils/generateRandonString');
const encodeBasic = require('./utils/encodebasic');
const scopes = require('./utils/encodebasic');
const scopesArray = require('./utils/scopesArray');

const playlistMocks = require('./utils/mocks/playlists');

const {config} = require('./config');

const app = express();

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

//middlewares
app.use(cors());
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.get("/", async function(req, res, next) {
  res.render("playlists", { playlists: {
    items: playlistsMocks
    //title: "Javier's playlist",
    //description: "Creatine supplementation is the reference compound for increasing muscular creatine levels; there is variability in this increase, however, with some nonresponders.",
    //author: "Javier Medina"
  } });
});

// login
app.get('/login',function(req,res) {
  const state = generateRandomString(16);
  
  const querystring = querystring.stringify({
      response_type: "code",
      client_id: config.spotifyClientId,
      scope:scopesArray.join(" "),
      redirect_uri: config.spotifyRedirectUri,
      state: state
    });
    res.cookie("auth_state",state,{ httpOnly:true});
    res.redirect('https://accounts.spotify.com/authorize?${queryString}')

});

app.get("/callback", function(req,res,next) {
  const { code,state} = req.query;
  const { auth_state} = req.cookies;

  if ( state===null || state !== auth_state) {
      next(new console.error("the state doesn't match")); 
  }

  res.clearCookie(auth_state);

  const authOptions = {
    url:"https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: config.spotifyRedirectUri,
      grant_type: "authorization_code"

    },

    Headers: {
      Authorization: 'Basic ${encodebasic(config.spotifyClientId,config.spotifyClientSecret)}'
      },
      json: true
   };
    request.post(authOptions, function(errpr,response, bosy){
      if ( error || response.statusCode !== 200) {
        next(new error("the token is invalid")); 
      }
      res.cookie("access_token", body.access_token, {httpOnly:true});
      res.redirect("/playlist");
    })
  });



// server
const server = app.listen(3000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});