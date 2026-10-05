import express from "express"
import { readContent, writeContent } from "./utils/file.js"
import { read } from "fs"
import { v4 as uuid } from "uuid"
import authMiddleware from "./middleware/auth.js"
import bcrypt from "bcrypt"
import encrypt from "./utils/token.js"

const app = express()

app.use(express.json())

app.get("/health" , (req,res) =>{
    res.status(200).json({
        "msg" : "API is running"
    })
})

app.post("/signup", async (req,res) =>{
    try {
        let { name, email, password } = req.body

        if (!email || !password){
            return res.status(400).json({
                Error : "Email ID and password are both required"
            })
        }
        
        let database = await readContent()
        
        if(database.find((item) => item.email == email)){
            return res.status(400).json({
                message : " An accound already exist with this email"
            })
        }

        let newUser = {
            id: uuid(),
            name,
            email,
            hashedPassword : await bcrypt.hash(password, 10),
            todos: [],
        }

        database.push(newUser)
        await writeContent(database)
        res.status(201).json({
            "msg" : "account created successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "intern al server error"
        })
    }
})

   app.post("/login", async (req,res) =>{
    try{
        let {email, password} = req.body
        let database = await readContent()
        let existingUser = database.find((item) => item.email == email)
    }
    catch(error){
        
    }
})

app.listen(5000, () =>{
    console.log("server is running on port 5000");
    
})