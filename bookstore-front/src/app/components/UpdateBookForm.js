import React from 'react';
import BookForm from './BookForm';
import axios from 'axios';
import { toastFailure, toastSuccess } from './Toast';

const UpdateBookForm = ({ books, bookIndex, setBooks }) => {
    const book = books[bookIndex];

    const initialValues = {
        title: book.title,
        author: book.author,
        price: book.price,
        stockQuantity: book.stockQuantity,
    };

    const handleSubmit = async (values, { resetForm }) => {
        const updatedBook = {
            title: values.title,
            author: values.author,
            price: values.price,
            stockQuantity: values.stockQuantity
        };
    
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_DOMAIN}/book/${bookIndex}`, updatedBook);
            const updatedBookData = response.data.data;
            const updatedBooks = books.map((b, index) => index === bookIndex ? updatedBookData : b);
            setBooks(updatedBooks);
            toastSuccess('Book updated successfully!')
        } catch (error) {
            toastFailure("We coudn't update your book")
        }
    };

    return (
        <BookForm initialValues={initialValues} onSubmit={handleSubmit} buttonText={"Update Book"} />
    );
};

export default UpdateBookForm;
