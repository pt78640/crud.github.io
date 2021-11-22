const express=require('express');
const app=express();
const data=require('./user.json')
app.use(express.json());
const { value } = require('express');
let arr=[];
arr=[...data]
let middle=(req,res,next)=>{
   req.value="priyanshi";
    next();
}
app.use(middle);
app.get('/',(req,res)=>{
    const obj={
        "api_requested_by":req.value,
        "books":arr
    }
    res.send(obj)
})
app.get('/books/:id',(req,res)=>{
    var choice=arr.filter(el=>{
        return el.id===Number(req.params.id);
    });
    
     res.send(choice)
})
app.post('/books',(req,res)=>{
    arr.push(req.body)
    res.send(arr)
})

app.patch('/books/:id',(req,res)=>{
    const updated=arr.filter(el=>{
       if(el.id==req.params.id){
           return el.author=req.body.author,el.published_year=req.body.published_year;
       };
    })
    res.send(updated)
})
app.delete('/books/:id',(req,res)=>{
    const deleted=arr.filter((el)=>{
          return el.id !== Number(req.params.id);
    })
    res.send(deleted)
    
})
app.listen(1334,()=>{
    console.log("Server is running in port 1334")
})