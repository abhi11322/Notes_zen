import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);

  const API = "http://localhost:5000/api/notes";

  // GET Notes
  const fetchNotes = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`${API}/${user.uid}`);
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch notes error:", err);
    }
  };

  // CREATE Note
  const addNote = async (title, content) => {
    try {
      const res = await axios.post(`${API}/create`, {
        title,
        content,
        userId: user.uid,
      });
      setNotes((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Add note error:", err);
    }
  };

  // UPDATE Note
  const updateNote = async (id, title, content) => {
    try {
      const res = await axios.put(`${API}/updateNote/${id}`, {
        title,
        content,
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? res.data : n))
      );
    } catch (err) {
      console.error("Update note error:", err);
    }
  };

  // DELETE Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete note error:", err);
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, fetchNotes, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
