const express=require('express');

const app=express();

const cors=require('cors');

const pool=require("./db")

// middleware
app.use(cors());
app.use(express.json()); 

// Routes //

// create a todo
 app.post("/todos",async (req,res)=>{
    try{
        // console.log(req.body)
        const {description}=req.body;
        const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description])
        res.json(newTodo.rows[0])
    }

    catch(err){ 
        console.error(err.message);
    }
 })

//get all todo

app.get("/todos",async(req,res)=>{
    try{
        const alltodo=await pool.query('select * from todo');
        res.json(alltodo.rows);
    }
    catch(err){
        console.error(err.message);
    }
})

// get a todo 

app.get("/todos/:id",async(req,res)=>{
    try{
        // console.log(req.params)
        const {id}=req.params;
        const todo=await pool.query("select * from todo where todo_id=$1",[id])
        res.json(todo.rows[0])
        res.json("todo was updated")

    }
    catch(err){
        console.error(err.message);
    }
})
// update a todo
app.put("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {description}=req.body;
        const updateTodo=await pool.query("update todo set description= $1 where todo_id=$2",
        [description,id])
        res.json("Todo was updated")

    }
    catch(err){
        console.error(err.message)
    }
})


//delete a todo 
app.delete("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
       const deleteTodo= await pool.query("delete from todo where todo_id = $1",
        [id])
        res.json("todo was deleted")

    }
    catch(err){
        console.error(err.message)
    }
})


app.listen(5000,()=>{
    console.log('server has started');
})