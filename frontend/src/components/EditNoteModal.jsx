import { useState, useEffect } from "react";
import { useNotes } from "../context/NotesContext";

export default function EditNoteModal() {
  const { updateNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (window.currentNote) {
      setTitle(window.currentNote.title);
      setContent(window.currentNote.content);
    }
  }, [window.currentNote]);

  const handleUpdate = async () => {
    await updateNote(
      window.currentNote._id,
      title,
      content
    );

    document.getElementById("edit-modal").close();
  };

  return (
    <dialog id="edit-modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Edit Note</h3>

        <input
          type="text"
          className="input input-bordered w-full mt-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full mt-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}
