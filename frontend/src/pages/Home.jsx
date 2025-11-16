import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";

import { FiPlus, FiLogOut, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

import AddNoteModal from "../components/AddNoteModal";
import EditNoteModal from "../components/EditNoteModal";



export default function Home() {
  const { notes, fetchNotes, deleteNote } = useNotes();
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* ---------- SIDEBAR ---------- */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r shadow-lg p-6 flex flex-col"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-10 text-gray-800">
          Notes
        </h1>

        <button
          onClick={() => document.getElementById("add-modal").showModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl shadow"
        >
          <FiPlus size={20} />
          Add Note
        </button>

        <div className="mt-auto">
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mt-16"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="flex-1 p-10 overflow-y-auto">
        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl mx-auto mb-10"
        >
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow focus-within:ring-2 focus-within:ring-blue-400 transition-all">
            <FiSearch className="text-gray-500 text-xl" />
            <input
              placeholder="Search notes…"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
        </motion.div>

        {/* NOTES GRID */}
        {notes.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-40 text-xl"
          >
            No notes yet. Create your first one ✨
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {notes
              .filter((n) =>
                n.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((note) => (
                <motion.div
                  key={note._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition-all p-5 flex flex-col justify-between"
                >
                  {/* TITLE */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {note.title}
                  </h2>

                  {/* CONTENT */}
                  <p className="text-gray-600 mb-5 whitespace-pre-wrap font-light">
                    {note.content}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex justify-between mt-auto">
                    <button
                      onClick={() => {
                        setSelectedNote(note);
                        document.getElementById("edit-modal").showModal();
                      }}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                    >
                      <FiEdit2 size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => deleteNote(note._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                    >
                      <FiTrash2 size={18} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>

      {/* ---------- MODALS ---------- */}
      <EditNoteModal selectedNote={selectedNote} />
      <EditNoteModal />
      <AddNoteModal />
    </div>
  );
}
