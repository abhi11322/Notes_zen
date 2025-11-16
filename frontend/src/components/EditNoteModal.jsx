import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useNotes } from "../context/NotesContext";

export default function EditNoteModal({ selectedNote, closeModal }) {
  const { updateNote } = useNotes();

  const [title, setTitle] = useState(selectedNote.title);
  const [content, setContent] = useState(selectedNote.content);

  useEffect(() => {
    setTitle(selectedNote.title);
    setContent(selectedNote.content);
  }, [selectedNote]);

  const handleUpdate = async () => {
    await updateNote(selectedNote._id, title, content);
    closeModal();
    document.getElementById("edit-modal").close();
  };

  return (
    <dialog id="edit-modal" className="modal">
      {/* BLUR BACKGROUND */}
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      />

      {/* ANIMATED EXPANDED NOTE */}
      <motion.div
        layoutId={selectedNote._id}
        className="modal-box bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-xl w-full shadow-xl relative z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Note</h3>

          <button
            onClick={closeModal}
            className="text-gray-600 dark:text-gray-300"
          >
            <FiX size={24} />
          </button>
        </div>

        <input
          className="w-full p-3 border rounded-xl mb-4 dark:bg-gray-700 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded-xl h-40 dark:bg-gray-700 dark:text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </motion.div>
    </dialog>
  );
}
