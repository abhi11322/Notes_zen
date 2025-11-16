import { useState } from "react";
import { useNotes } from "../context/NotesContext";

export default function AddNoteModal() {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async () => {
    await addNote(title, content);
    setTitle("");
    setContent("");
    document.getElementById("add-modal").close();
  };

  return (
    <dialog id="add-modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">New Note</h3>

        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full mt-4"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="textarea textarea-bordered w-full mt-4"
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-6 flex justify-end gap-2">
          <button className="btn" onClick={handleAdd}>Save</button>
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}
