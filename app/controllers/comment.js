var mongoose = require('mongoose')
var Comments = mongoose.model('Commentb')


//comment page
exports.save = function(req,res){
    var _comment = req.body.comment;
    var movieId = _comment.movie;

    if(_comment.cid){
        Comments.findById(_comment.cid, function(err, comment){
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }

            comment.reply.push(reply);

            console.log(reply.from.name);
           // console.log(comment.reply.to,1212);
            comment.save(function(err, comment){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/' + movieId);
            })
        })
    }else{
        var comment =new Comments(_comment);

        comment.save(function(err, comment) {
            if(err){
                console.log(err);
            }
            res.redirect('/movie/' + movieId);

        })
    }




}

