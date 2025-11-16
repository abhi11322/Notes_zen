import { useState, useEffect } from "react";
import { useNotes } from "../context/NotesContext";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function EditNoteModal({ selectedNote }) {
  const { updateNote } = useNotes();

  // 🚀 FIX 1 — Prevent modal from rendering when selectedNote is null
  if (!selectedNote) return null;

  const [title, setTitle] = useState(selectedNote.title);
  const [content, setContent] = useState(selectedNote.content);

  // Load old values when selectedNote changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleUpdate = async () => {
    await updateNote(selectedNote._id, title, content);
    document.getElementById("edit-modal").close();
  };

  return (
    <dialog id="edit-modal" className="modal">
      <div className="modal-box p-0 bg-white rounded-2xl max-w-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Edit Note</h3>
          <button
            onClick={() => document.getElementById("edit-modal").close()}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            value={content}
            placeholder="Write your note..."
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-4 p-3 border rounded-xl h-40 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </motion.div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={() => document.getElementById("edit-modal").close()}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
          >
            Update Note
          </button>
        </div>
      </div>
    </dialog>
  );
}
