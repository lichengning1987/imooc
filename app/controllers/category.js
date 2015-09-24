var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var _ = require('underscore');

//admin new page
exports.new = function(req, res){
    res.render('catetory_admin',{
        title: 'imooc 后台分类录入页',
        category:{}
    })
}

//admin post catetory
exports.save = function(req, res){
    var _category = req.body.category;
    var category = new Category(_category);

    category.save(function(err, category) {
        if(err){
            console.log(err)
        }

        res.redirect('/admin/category/list');
    })

}

//userlist page
exports.list = function (req, res){
    Category.fetch(function(err,categories){
        if(err){
            console.log(err)
        }
        res.render('categorylist',{
            title: 'imooc 分类列表页',
            categories:categories
        })
    })
}




