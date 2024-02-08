import { ToastContainer, toast } from "react-toastify";

export function Container() {
	return <ToastContainer
		position="top-right"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="light"
		limit={2} />;
}

export function toastSuccess(message) {
	toast(message, { style: { background: "rgb(34 197 94)", color: "black" }, autoClose: 3000 })
	return
}

export function toastFailure(message) {
	toast(message, { style: { background: "rgb(220 38 38)", color: "black" }, autoClose: 3000 })
	return
}