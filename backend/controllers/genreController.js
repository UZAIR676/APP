import Genre from "../models/Genre.js"; // Ensure the .js extension is included
import asyncHandler from "../middlewares/asyncHandler.js"; // Ensure the .js extension is included

const createGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const existingGenre = await Genre.findOne({ name });
        if (existingGenre) {
            return res.status(400).json({ error: "Genre already exists" });
        }
        const genre = new Genre({ name });
        await genre.save(); // Await the save operation
        res.status(201).json({ message: "Genre created successfully", genre }); // Return a 201 status
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
const updateGenere = asyncHandler(async(req,res)=>{ 
try {
    const {name}=req.body;
    const {id}=req.params;
    const genre = await Genre.findById(id);
    if(!genre){
        return res.status(404).json({error:"Genre not found"})

    }
    genre.name=name;
    await genre.save();
    res.json({message:"Genre updated successfully",genre})

     

} catch (error) {
    
    console.log(error);
    return res.status(500).json({error:"Internal server error "}); 
}
})
const deleteGenre = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const removed = await Genre.findByIdAndDelete(id); // Use findByIdAndDelete to remove the genre from the database
        if (!removed) {
            return res.status(404).json({ error: "Genre not found " });
        }
        res.json({ message: "Genre deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error " });
    }
});
const listgenre = await asyncHandler(async(req,res)=>{
    try {
        const all = await Genre.find({})
        res.json(all);


    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
        
    }
})
const readGenre = asyncHandler(async (req, res) => {
    try {
      const genre = await Genre.findOne({ _id: req.params.id });
      res.json(genre);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  });

export { createGenre ,updateGenere ,deleteGenre,listgenre,readGenre};
