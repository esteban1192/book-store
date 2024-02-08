import React from 'react';
import BookForm from './BookForm';
import axios from 'axios';
import { toastFailure, toastSuccess } from './Toast';

const AddBookForm = ({ books, setBooks }) => {

    const initialValues = {
        title: '',
        author: '',
        price: null,
        stockQuantity: null
    };

    const handleSubmit = async (values, { resetForm }) => {
        const newBook = {
            title: values.title,
            author: values.author,
            price: values.price,
            stockQuantity: values.stockQuantity
        };
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/book`, newBook);
            
            const addedBook = response.data.data;
    
            setBooks([...books, addedBook]);
    
            resetForm();
    
            toastSuccess("Book Added!");
        } catch (error) {
            toastFailure("We had a problem adding your book")
        }
    };

    return (
        <BookForm initialValues={initialValues} onSubmit={handleSubmit} buttonText={"Add Book"} />
    );
};

export default AddBookForm;
