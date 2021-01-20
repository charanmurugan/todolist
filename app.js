const express=require('express');
const app= express();
const mongoose=require('mongoose');
const bodyParser=require("body-parser");
const _=require("lodash");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let today="";
const lists=[];
let value="";
mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const todoSchema=new mongoose.Schema({
    name:String
});
const List=mongoose.model("list",todoSchema);
const item=new List({
    name:_.capitalize("hello Welcome to My Page")
});

app.get("/",function(req,res){
    var date=new Date();
    const options = { 
        weekday: 'long',
        month: 'long',
        day: 'numeric' };
   today=date.toLocaleDateString('en', options)
   List.find({},function(err,foundItems){
       if(foundItems.length===0){
         List.insertMany(item,function(err){
            if(!err){
                console.log("succesfully");
            }
        });
        res.redirect("/");
       }
     else{
          res.render("index",{
            kindOfDay:today,
            lists:foundItems,
            value:value
        });
    }
   });

});
app.post("/",function(req,res){
    value="list_area";
    const todoValue=_.capitalize(req.body.todo_value);
    const item1=new List({
        name:todoValue
    });
    item1.save();


    res.redirect("/");    
})
app.post("/delete",function(req,res){
    const checkedValue=(req.body.checked);
    console.log(checkedValue);
    List.findByIdAndRemove(checkedValue,function(err){
    if(!err){
             res.redirect("/"); 
    }
});
});
















app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server started");
})