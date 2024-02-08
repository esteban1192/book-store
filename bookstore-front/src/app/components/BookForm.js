import React from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import { UserOutlined, AlignLeftOutlined, DollarOutlined, NumberOutlined } from '@ant-design/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookForm = ({ initialValues, onSubmit, buttonText }) => {
    const bookSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive').nullable(),
        stockQuantity: Yup.number().min(0, "Can't be negative").required('Stock Quantity is required').integer('Stock Quantity must be an integer').nullable()
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={bookSchema}
            onSubmit={onSubmit}>
            {({ touched, errors }) => (
                <Form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold">Title:</label>
                        <Field id="title" name="title" as={Input} size="large" placeholder="Title" prefix={<AlignLeftOutlined />} />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-gray-700 text-sm font-bold">Author:</label>
                        <Field id="author" name="author" as={Input} size="large" placeholder="Author" prefix={<UserOutlined />} />
                        <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold">Price:</label>
                        <Field id="price" name="price" as={Input} size="large" placeholder="Price" prefix={<DollarOutlined />} type="number" />
                        <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stockQuantity" className="block text-gray-700 text-sm font-bold">Stock Quantity:</label>
                        <Field id="stockQuantity" name="stockQuantity" as={Input} size="large" placeholder="Quantity" prefix={<NumberOutlined />} type="number" />
                        <ErrorMessage name="stockQuantity" component="div" className="text-red-500 text-sm" />
                    </div>
                    <Button className="bg-sky-500" type="primary" htmlType="submit" block> {buttonText} </Button>
                </Form>
            )}
        </Formik>
    );
};

export default BookForm;
