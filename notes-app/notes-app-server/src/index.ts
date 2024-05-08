import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient();


app.get("/notes", async (req, res)=>{
    const notes = await prisma.note.findMany();
    res.json(notes)
})

app.listen(5000, () => {
    console.log("server running on localhost:5000")
});

app.post("/api/notes", async (req,res) => {
    const{title, content} = req.body;
    if(!title || !content){
        return res.status(400).send("title and content fields required");
    }

    try{
        const note  = await prisma.note.create({
            data: {title, content}
        });
        res.json(note)
    }catch(error){
        res.status(500).send("something went wrong")
    }
});

app.put("/api/notes/:id", async (req, res) => {
    const{title, content} = req.body;
    const id = req.params.id


    if(!title || !content){
        return res.status(400).send("title and content fields required");
    }
    
    if(!id){
        return res.status(400).send("ID must be valid")
    }

    try{
        const updateNote = await prisma.note.update({
            where: { id },
            data: {title, content}
        });
        res.json(updateNote)
    }catch(error){
        res.status(500).send("something went wrong.");
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id


    if(!id){
        return res.status(400).send("ID must be valid")
    }

    try{
        await prisma.note.delete({
            where:{id},
        });
        res.status(204).send
    }catch(error){
        res.status(500).send("something went wrong.");
    }
})


