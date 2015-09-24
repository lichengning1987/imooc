/*
var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment')
var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
*/
var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment')
var Comments = mongoose.model('Commentb', CommentSchema)

module.exports = Comments