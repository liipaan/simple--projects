
import React from 'react'
import {useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchBooks,fetchBookById,addBook,editBook,deleteBook } from './feature/books/bookSlice'
const App = () => {
  const dispatch = useDispatch()
const books = useSelector((state) => state.books.items)
const [form, setForm] = useState({
  title: '',
  author: '',
  price: '',
})
const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])
 const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title: form.title,
      author: form.author,
      price: Number(form.price)
    };

    if (editingId) {
      dispatch(editBook({ id: editingId, book: bookData }));
      setEditingId(null);
    } else {
      dispatch(addBook(bookData));
    }

    setForm({ title: "", author: "", price: "" });
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      price: book.price
    });
    setEditingId(book._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Books App</h1>

        <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded-2xl bg-white p-4 shadow">
          <input
            className="rounded-lg border p-3 outline-none"
            placeholder="Book title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="rounded-lg border p-3 outline-none"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <input
            className="rounded-lg border p-3 outline-none"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <button className="rounded-lg bg-black px-4 py-3 font-semibold text-white">
            {editingId ? "Update Book" : "Add Book"}
          </button>
        </form>

        <div className="grid gap-4">
          {books.map((book) => (
            <div key={book._id} className="rounded-2xl bg-white p-4 shadow flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Price: ${book.price}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App