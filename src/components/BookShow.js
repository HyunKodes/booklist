import React, { useState, useEffect } from "react";
import BookEdit from "./BookEdit";
import axios from "axios";

function BookShow({ book, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books.json");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query: book.title, per_page: 1 },
            headers: {
              Authorization: `Client-ID -eJ9cgm80FL6F4HMOjqdizufCQAt26Rtq5RS6gj0aQw`,
            },
          }
        );
        if (response.data.results.length > 0) {
          const image = response.data.results[0];
          const customSizeUrl = `${image.urls.raw}&w=300&h=200&fit=crop`;
          setImageUrl(customSizeUrl);
        } else {
          setImageUrl(`https://picsum.photos/seed/${book.id}/300/200`);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(`https://picsum.photos/seed/${book.id}/300/200`);
      }
    };

    fetchImage();
  }, [book.title, book.id]);

  const handleDeleteClick = () => {
    onDelete(book.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
    onEdit(id, newTitle);
  };

  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    content = <BookEdit onSubmit={handleSubmit} book={book} />;
  }

  return (
    <div className="book-show">
      <img alt="book" src={imageUrl} />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
