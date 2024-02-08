'use client'
import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import { Button, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons'; // Import the EditOutlined icon
import AddBookForm from "./components/AddBookForm";
import { Container as ToastContainer, toastSuccess, toastFailure } from "./components/Toast";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import UpdateBookForm from "./components/UpdateBookForm";

export default function Home() {
	const initBooks = [];
	const [books, setBooks] = useState(initBooks);
	const [deleteLoading, setDeleteLoading] = useState([]);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [selectedBookIndex, setSelectedBookIndex] = useState(null);

	const handleDelete = async (index) => {
		try {
			const loadingState = [...deleteLoading];
			loadingState[index] = true;
			setDeleteLoading(loadingState);

			await axios.delete(`${process.env.REACT_APP_API_DOMAIN}/book/${index}`);

			setBooks(books.filter((book, bookIndex) => index !== bookIndex));

			toastSuccess("Deleted successfully");
		} catch (error) {
			toastFailure("There was a problem while deleting your book");
		} finally {
			const loadingState = [...deleteLoading];
			loadingState[index] = false;
			setDeleteLoading(loadingState);
		}
	};

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_DOMAIN}/books`)
			.then(response => {
				setBooks(response.data.data);
				setDeleteLoading(new Array(response.data.data.length).fill(false));
			})
			.catch(error => {
				toastFailure("We are having problems getting your books");
			});
		return () => {

		};
	}, []);

	//Columns used by the Table component used below
	const columns = [
		{
			title: '',
			key: 'update',
			align: 'center',
			render: () => <Button onClick={() => setOpenUpdateModal(true)}><EditOutlined style={{ fontSize: '16px' }} /></Button>,
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			align: 'center',
		},
		{
			title: 'Author',
			dataIndex: 'author',
			key: 'author',
			align: 'center',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
		},
		{
			title: 'Stock Quantity',
			dataIndex: 'stockQuantity',
			key: 'stockQuantity',
			align: 'center',
		},
		{
			title: 'Delete',
			key: 'delete',
			align: 'center',
			render: (_, record, index) => (
				<Button danger type="primary" loading={deleteLoading[index]} onClick={() => handleDelete(index)} className="h-full w-full text-white rounded border-0">Delete</Button>
			),
		},
	];

	const modalsStyle = {
		content: {
			width: "300px",
			height: "fit-content",
			position: "relative"
		},
		overlay: {
			display: "flex",
			justifyContent: "center",
			height: "100%",
		}
	}
	return (
		<div id="home" className="bg-red h-full">
			<div className="flex justify-center text-3xl font-serif">
				<h1>Welcome to your book store</h1>
			</div>
			<Button className="my-7 bg-sky-500" onClick={() => setOpenCreateModal(true)}>Add Book</Button>
			<ReactModal
				isOpen={openCreateModal}
				onRequestClose={() => { setOpenCreateModal(false) }}
				style={modalsStyle}>
				<AddBookForm books={books} setBooks={setBooks} />
			</ReactModal>
			<ReactModal
				isOpen={openUpdateModal}
				onRequestClose={() => { setOpenUpdateModal(false) }}
				style={modalsStyle}>
				<UpdateBookForm books={books} bookIndex={selectedBookIndex} setBooks={setBooks} />
			</ReactModal>
			<Table
				dataSource={books}
				columns={columns}
				rowKey={(record) => record.title}
				pagination={false}
				className="min-w-full"
				onRow={(record, rowIndex) => {
					return {
						onClick: () => {setSelectedBookIndex(rowIndex)},
					};
				}}
			/>
			<ToastContainer />
		</div>
	);
};
