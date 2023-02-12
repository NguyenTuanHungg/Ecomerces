var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
const login=require('../models/Login')
const Login =mongoose.model('Login',login)
const products=require('../models/products')
const Product=mongoose.model('products',products)
const orders=require('../models/orders')
let Order=mongoose.model('orders',orders)


router.get('/admin_products', function(req, res, next) {
  const resultsPerPage=10
   Product.find({},(error,data)=>{
     console.log('ds:',data)
     const numOfResults=result.length
     const numberOfPages= Math.ceil(numOfResults/resultsPerPage)
     let page=req.query.page ? Number(req.query.page):1;
     if(page>numberOfPages){
       res.redirect('/admin_products?page='+encodeURIComponent(numberOfPages))
     }
     else if(page<1){
       res.redirect('/admin_products?page='+encodeURIComponent('1'))
     }
   
   const startingLimit=(page - 1)*resultsPerPage
   Product.find({},(error,data) => {
    let iterator=(page-5)<1 ? 1:page-5
    let endingLink=(iterator+9) <= numberOfPages ? (iterator+9):page+(numberOfPages-page)
    if(endingLink<(page+4)){
     iterator-=(page+4)-numberOfPages
    }
   }).limit(startingLimit,resultsPerPage) 
   res.render('admin_products',{datas:data,page,iterator,endingLink,numberOfPages})
 });
 })
//add
router.get('/form-add',function(req,res){
    res.render('form-add')
  })
  router.post('/add', function(req, res, next) {
    Product.create(req.body);
    res.redirect('/admin_products')
  })
  //update
  router.get('/form-update/:id', function(req, res, next) {
    Product.findById(req.params.id,(error,data)=>{
      res.render('form-update',{datas:data})
    })
  })
    router.post('/update', function(req, res, next) {
      Product.findByIdAndUpdate(req.body.id,req.body,(error,data)=>{
        res.redirect('/admin_products')
      });
      
    })
    //Delete
  router.get('/delete/:id', function(req, res, next) {
    Product.findByIdAndDelete(req.params.id,(error,data)=>{
      res.redirect('/admin_products')
    })
  })
  router.get('/search',function(req, res, next) {
   
   
      Product.find( {$or:[{name:{ $regex:req.query.dsearch}},{type:{$regex:req.query.dsearch}}]},(err,data)=>{
      res.render('admin_products',{datas:data})
    } );
    
  })
  module.exports=router;