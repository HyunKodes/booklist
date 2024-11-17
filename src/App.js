import { useState, useEffect } from "react";
import { db } from "./firebase";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const snapshot = await db.collection('books').get();
    const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(booksData);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    const docRef = await db.collection('books').add({ title });
    const newBook = { id: docRef.id, title };
    setBooks([...books, newBook]);
  };

  const editBookById = async (id, newTitle) => {
    await db.collection('books').doc(id).update({ title: newTitle });
    const updatedBooks = books.map(book => book.id === id ? { ...book, title: newTitle } : book);
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await db.collection('books').doc(id).delete();
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
