import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import {
  FiPlus,
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiStar,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import AddNoteModal from "../components/AddNoteModal";
import EditNoteModal from "../components/EditNoteModal";

export default function Home() {
  const { notes, fetchNotes, deleteNote, togglePin, updateColor } = useNotes();
  const { theme, toggleTheme } = useTheme();

  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="h-screen w-full flex bg-gray-50 dark:bg-gray-900 dark:text-gray-200 transition-all">
      
      {/* ---------- SIDEBAR ---------- */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-lg p-6 flex flex-col relative"
      >
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-200"
        >
          {theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
        </button>

        <h1 className="text-3xl font-bold tracking-tight mb-10 text-gray-800 dark:text-gray-100">
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
            className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 font-medium mt-16"
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
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-blue-600 transition-all">
            <FiSearch className="text-gray-500 dark:text-gray-300 text-xl" />
            <input
              placeholder="Search notes…"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200"
            />
          </div>
        </motion.div>

        {/* ---------- PINNED NOTES ---------- */}
        {notes.some((n) => n.pinned) && (
          <>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
              📌 Pinned
            </h2>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
            >
              {notes
                .filter((n) => n.pinned)
                .filter((n) =>
                  n.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    setSelectedNote={setSelectedNote}
                    deleteNote={deleteNote}
                    togglePin={togglePin}
                    updateColor={updateColor}
                  />
                ))}
            </motion.div>
          </>
        )}

        {/* ---------- ALL NOTES ---------- */}
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
          All Notes
        </h2>

        {notes.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 dark:text-gray-400 mt-40 text-xl"
          >
            No notes yet. Create your first one ✨
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {notes
              .filter((n) => !n.pinned)
              .filter((n) =>
                n.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  setSelectedNote={setSelectedNote}
                  deleteNote={deleteNote}
                  togglePin={togglePin}
                  updateColor={updateColor}
                />
              ))}
          </motion.div>
        )}
      </div>

      {/* MODALS */}
      <AddNoteModal />
      <EditNoteModal selectedNote={selectedNote} />
    </div>
  );
}

/* ----------------------------------------------------------
    NOTE CARD COMPONENT
---------------------------------------------------------- */
function NoteCard({ note, setSelectedNote, deleteNote, togglePin, updateColor }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl shadow p-5 relative transition-all"
      style={{ background: note.color || "#fff8b3" }}
    >
      {/* PIN BUTTON */}
      <button
        onClick={() => togglePin(note._id, !note.pinned)}
        className="absolute top-3 right-3"
      >
        <FiStar
          size={22}
          className={
            note.pinned
              ? "text-yellow-500"
              : "text-gray-600 hover:text-yellow-500"
          }
        />
      </button>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {note.title}
      </h2>

      {/* CONTENT */}
      <p className="text-gray-800 mb-5 whitespace-pre-wrap">
        {note.content}
      </p>

      {/* COLOR PICKERS */}
      <div className="flex gap-2 mt-3">
        {["#fff8b3", "#ffd6e0", "#d7f9f1", "#d0e8ff", "#f5e2ff"].map((c) => (
          <button
            key={c}
            onClick={() => updateColor(note._id, c)}
            className="w-5 h-5 rounded-full border shadow"
            style={{ background: c }}
          />
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-4">
        <button
          className="text-blue-600 flex items-center gap-1 hover:text-blue-800"
          onClick={() => {
            setSelectedNote(note);
            document.getElementById("edit-modal").showModal();
          }}
        >
          <FiEdit2 /> Edit
        </button>

        <button
          className="text-red-600 flex items-center gap-1 hover:text-red-800"
          onClick={() => deleteNote(note._id)}
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </motion.div>
  );
}

