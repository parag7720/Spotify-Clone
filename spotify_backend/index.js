const express= require("express")
const mongoose= require("mongoose")

const User= require("./models/User.js")
const passport=require("passport")
const authRoutes=require("./routes/auth.js")
const playlistRoutes=require("./routes/playlist.js")
const songRoutes=require("./routes/song.js")
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const app = express();
const cors= require("cors")
app.use(cors())
const port=8000
app.use(express.json())
require("dotenv").config();
mongoose.connect("mongodb+srv://admin:"+ process.env.MONGO_PASS +"@cluster0.grg0hjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{   
useNewUrlParser: true,
useUnifiedTopology: true,

})
    .then((x)=>{
        console.log("Connected to Mongo");
    })
    .catch((error)=> {console.log("Error aa gya")})


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "pdnejoh";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/", (req,res)=>{
    console.log("request hit");
    res.send("Hello world");
});
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);
app.listen(port, ()=>{
console.log("App is runnung on port" + port);
})
