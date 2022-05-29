// stuff
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const matter = require("matter-js");
const _ = require('lodash');
const ejs = require('ejs');
const mongoose = require('mongoose');
// jquery
const jsDom = require("jsdom");
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

// Connect to Mongo Server
mongoose.connect('mongodb://localhost:27017/Personal-Portfolio');

// Global Variables
const abtDes = "Hello! My name is Franco (or Mr. ghost) and this is my first website! I love making websites and video games. My goal is to become a software engineer or a full stack developer.";
const app = express();

app.set('view engine', 'ejs');

const postSchema = new mongoose.Schema({
    title: String,
    paragraph: String
});

const Post = mongoose.model('Post', postSchema);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render("main", {posts: posts});
    })
})
app.get("/about", (req, res) => {
    res.render("about", {aboutDesc: abtDes});
})
app.get("/email", (req, res) => {
    res.render("email");
})
app.get("/posts/:postId", (req, res) => {
    const reqTopic = req.params.postId;
    Post.findOne({_id: reqTopic}, (err, post) => {
        res.render("post", {
            title: post.title,
            paragraph: post.paragraph
        });
    })
})

app.post("/email", (req, res) => {
    const post = new Post({
        title: req.body.textTitle,
        paragraph: req.body.textBody
    });

    post.save(function(err){
        if (!err){
            res.redirect("/");
        }
      });
})

// app.post("/", (req, res) => {
//     Post.find({}, (err, posts) => {
//         res.render("main", {posts: posts});
//     })
// })

app.listen(3000, function(){
    console.log("Working!");
})