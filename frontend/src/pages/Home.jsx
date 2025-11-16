import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { FiPlus, FiLogOut, FiTrash2, FiSearch } from "react-icons/fi";
import AddNoteModal from "../components/AddNoteModal";

export default function Home() {
  const { notes, fetchNotes, deleteNote } = useNotes();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Notes App</h1>

        <button
          onClick={() => document.getElementById("add-modal").showModal()}
          className="flex items-center gap-2 bg-blue-600 text-white p-3 rounded-lg"
        >
          <FiPlus /> New Note
        </button>

        <div className="mt-auto">
          <button
            className="flex items-center gap-2 text-red-500 mt-10"
            onClick={() => signOut(auth)}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Notes Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Search */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow mb-6">
          <FiSearch className="text-gray-500" />
          <input 
            type="text"
            placeholder="Search notes..."
            className="focus:outline-none flex-1"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-xl">
            No notes yet. Create your first note!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes
              .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
              .map((note) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow p-5 rounded-lg hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-bold">{note.title}</h2>
                  <p className="text-gray-600 mt-2">{note.content}</p>

                  <div className="flex justify-end mt-4">
                    <button
                      className="text-red-600 flex items-center gap-1"
                      onClick={() => deleteNote(note._id)}
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>

                </motion.div>
              ))}
          </div>
        )}
      </div>

      <AddNoteModal />
    </div>
  );
}
