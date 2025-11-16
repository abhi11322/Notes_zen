import { useState } from "react";
import { useNotes } from "../context/NotesContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function AddNoteModal() {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) return;
    await addNote(title, content);
    setTitle("");
    setContent("");
    document.getElementById("add-modal").close();
  };

  return (
    <dialog id="add-modal" className="modal">
      <div className="modal-box p-0 bg-white rounded-2xl shadow-2xl max-w-lg">

        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Create Note</h3>
          <button
            onClick={() => document.getElementById("add-modal").close()}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 mt-4 border rounded-xl h-40 resize-none focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
          />
        </motion.div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={() => document.getElementById("add-modal").close()}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
          >
            Save Note
          </button>
        </div>
      </div>
    </dialog>
  );
}
