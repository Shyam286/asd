import {useNavigate} from 'react-router-dom';
import React,{useState, useEffect} from 'react'


const getDatafromLS=()=>{
  const data = localStorage.getItem('books');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

 const CrudApp = () => {
  const navigate=useNavigate();

  // main array of objects state || books state || books array of objects
  const [books, setbooks]=useState(getDatafromLS());

  // input field states
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [isbn, setIsbn]=useState('');

  // form submit event
  const handleAddBookSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let book={
      title,
      author,
      isbn
    }
    setbooks([...books,book]);


    setTitle('');
    setAuthor('');
    setIsbn('');
    navigate("/table")
  }

  // delete book from LS
  const deleteBook=(isbn)=>{
    const filteredBooks=books.filter((element,index)=>{
      return element.isbn !== isbn
    })
    setbooks(filteredBooks);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  return (
    <div className='wrapper'>
      <h1>BookList App</h1>
      <p>Add and view your books using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
            <label>Title</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label>Author</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setAuthor(e.target.value)} value={author}></input>
            <br></br>
            <label>ISBN#</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>


      </div>
    </div>
  )
}

export default CrudApp;



// import React, { useState, useEffect } from 'react';

// const CrudApp = () => {
//   const [formData, setFormData] = useState({
//     id: null,
//     name: '',
//     author: '',
//     price: '',
//   });

//   const [bookList, setBookList] = useState([]);

//   useEffect(() => {
//     // Fetch data from local storage on component mount
//     const storedBookList = JSON.parse(localStorage.getItem('bookList')) || [];
//     setBookList(storedBookList);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.id === null) {
//       // Create: Add new book to the list
//       const newBook = { id: Date.now(), ...formData };
//       setBookList([...bookList, newBook]);
//     } else {
//       // Update: Find and update existing book
//       const updatedList = bookList.map((book) =>
//         book.id === formData.id ? formData : book
//       );
//       setBookList(updatedList);
//     }

//     // Clear the form data in the state
//     setFormData({ id: null, name: '', author: '', price: '' });

//     // Update local storage with the updated book list
//     localStorage.setItem('bookList', JSON.stringify(bookList));
//   };

//   const handleDelete = (id) => {
//     // Delete book from the list
//     const updatedList = bookList.filter((book) => book.id !== id);
//     setBookList(updatedList);

//     // Update local storage with the updated book list
//     localStorage.setItem('bookList', JSON.stringify(updatedList));
//   };

//   const handleEdit = (book) => {
//     // Set the form data for editing
//     setFormData(book);
//   };

//   return (
//     <div>
//       <h2>Book CRUD Application</h2>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <label>
//           Author:
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <label>
//           Price:
//           <input
//             type="text"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <button type="submit">{formData.id === null ? 'Create' : 'Update'}</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Author</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookList.map((book) => (
//             <tr key={book.id}>
//               <td>{book.name}</td>
//               <td>{book.author}</td>
//               <td>{book.price}</td>
//               <td>
//                 <button onClick={() => handleEdit(book)}>Edit</button>
//                 <button onClick={() => handleDelete(book.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CrudApp;
