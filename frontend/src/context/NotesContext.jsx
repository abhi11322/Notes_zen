import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);

  const API = "http://localhost:5000/api/notes";

  const fetchNotes = async () => {
    if (!user) return;

    const res = await axios.get(`${API}/getNotes`, {
      params: { userId: user.uid },
    });

    setNotes(res.data);
  };

  const addNote = async (title, content) => {
    const res = await axios.post(`${API}/createNote`, {
      title,
      content,
      userId: user.uid,
    });

    setNotes([res.data, ...notes]);
  };

  const updateNote = async (id, title, content) => {
  const res = await axios.put(`${API}/updateNote/${id}`, {
    title,
    content,
  });

  setNotes(
    notes.map(n => n._id === id ? res.data : n)
  );

};


  const deleteNote = async (id) => {
    await axios.delete(`${API}/deleteNote/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, fetchNotes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
  
};

export const useNotes = () => useContext(NotesContext);
