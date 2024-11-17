import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, 'books'));
    const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(booksData);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    const docRef = await addDoc(collection(db, 'books'), { title });
    const newBook = { id: docRef.id, title };
    setBooks([...books, newBook]);
  };

  const editBookById = async (id, newTitle) => {
    const bookDoc = doc(db, 'books', id);
    await updateDoc(bookDoc, { title: newTitle });
    const updatedBooks = books.map(book => book.id === id ? { ...book, title: newTitle } : book);
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
