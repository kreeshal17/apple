    import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Component/Auth/firebase';

function Admin() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [statusPopup, setStatusPopup] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                const orderList = ordersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(orderList);
                setLoadingOrders(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoadingOrders(false);
            }
        };

        const fetchProducts = async () => {
            try {
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const productList = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productList);
                setLoadingProducts(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoadingProducts(false);
            }
        };

        fetchOrders();
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "products", productId));
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: newStatus });
            // Show popup notification
            setStatusPopup(true);
            setTimeout(() => setStatusPopup(false), 2000); // Close the popup after 2 seconds
            // Update local state to reflect the status change
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            {/* Orders Section */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h2>
            {loadingOrders ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-1 text-gray-800">{order.name}</h3>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {order.email}</p>
                            <p className="text-sm text-gray-600"><strong>Address:</strong> {order.address}</p>
                            <p className="text-sm text-gray-600"><strong>Total:</strong> ₹{order.total}</p>

                            {/* Status Dropdown */}
                            <div className="mt-3">
                                <h4 className="font-medium text-gray-700 mb-1">Status:</h4>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className="py-2 px-4 bg-gray-50 border border-gray-300 rounded-md text-gray-700"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <h4 className="font-medium text-gray-700 mb-1">Items:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.title} - ₹{item.price} x {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Products Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Products</h2>
                {loadingProducts ? (
                    <p>Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="text-gray-500">No products available.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-xl shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="py-3 px-6 text-left">Image</th>
                                    <th className="py-3 px-6 text-left">Title</th>
                                    <th className="py-3 px-6 text-left">Price</th>
                                    <th className="py-3 px-6 text-left">Quantity</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-6">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.title}
                                                className="w-14 h-14 object-cover rounded-md border"
                                            />
                                        </td>
                                        <td className="py-3 px-6">{product.title}</td>
                                        <td className="py-3 px-6">₹{product.price}</td>
                                        <td className="py-3 px-6">{product.quantity}</td>
                                        <td className="py-3 px-6">
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-800 hover:underline transition duration-150"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Status Update Popup */}
            {statusPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="text-green-500 font-semibold">Status updated successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
    