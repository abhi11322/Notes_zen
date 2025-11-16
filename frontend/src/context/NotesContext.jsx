import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);

  const API = "http://localhost:5000/api/notes";

  
  const fetchNotes = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`${API}/${user.uid}`);
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch notes error:", err);
    }
  };

 
  const addNote = async (title, content) => {
    try {
      const res = await axios.post(`${API}/create`, {
        
        title,
        content,
        userId: user.uid,
        color: "#fff8b3",      
        pinned: false
      });
      setNotes((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Add note error:", err);
    }
  };

  
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

  
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete note error:", err);
    }
  };

  const updateColor = async (id, color) => {
  try {
    const res = await axios.put(`${API}/updateNote/${id}`, { color });
    setNotes((prev) =>
      prev.map((note) => (note._id === id ? res.data : note))
    );
  } catch (err) {
    console.error("Color update error:", err);
  }
};

const togglePin = async (id, pinned) => {
  try {
    const res = await axios.put(`${API}/updateNote/${id}`, { pinned });
    setNotes((prev) => {
      const updated = prev.map((n) => (n._id === id ? res.data : n));
      // Sort pinned notes on top
      return updated.sort((a, b) => b.pinned - a.pinned);
    });
  } catch (err) {
    console.error("Pin update error:", err);
  }
};



  return (
    <NotesContext.Provider
      value={{ notes, fetchNotes, addNote, updateNote, deleteNote,togglePin,updateColor }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
