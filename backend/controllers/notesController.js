import Note from "../models/Note.js";
export const createNote = async (req, res) => {
    try{
        const note = new Note(req.body);
        await note.save();
        res.json(note);

    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

export const getNotes = async (req, res) => {
    try{
        const notes = await Note.find({userId: req.params.userId});
        res.json(notes);
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

export const deleteNote = async (req, res) => {
    try{
        await Note.findByIdAndDelete(req.params.id);
        res.json({message: "Note deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

