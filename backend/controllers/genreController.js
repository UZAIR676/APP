import Genre from "../models/Genre";
import asyncHandler from "../middlewares/asyncHandler";

const createGenre = asyncHandler(async (req, res) => {
    try {
        const {name}= req.body;
        if(!name){
            return res.status(400).json({error:"Name is required"})
        }
        const exitingGenre = await Genre.findOne({name})
        if(exitingGenre){
            return res.status(400).json({error:"Genre already exits"})
        }
        const genre = new Genre({name}).save()
        res.json(genre)
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
});





export {createGenre}