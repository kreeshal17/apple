// src/components/Cart.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../Redux/CardSlice';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Component/Auth/firebase';

const CartPage = () => {
    const { items, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleProceed = () => {
        setShowForm(true);
    };

    const handleSubmitOrder = async () => {
        if (!name || !address) {
            alert("Please fill in both name and address.");
            return;
        }

        try {
            await addDoc(collection(db, 'orders'), {
                name,
                address,
                items: items.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    imageUrl: item.imageUrl
                })),
                total: totalAmount,
                status: 'pending',
                createdAt: new Date()
            });

            dispatch(clearCart());
            alert('Order placed successfully! You can view your order in the admin panel.');
            setShowForm(false);
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600">Your cart is empty</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center">
                            <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded mr-4" />
                            <div>
                                <h2 className="font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-600">₹{item.price}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                            >−</button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                            >+</button>
                        </div>

                        <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="flex justify-end mt-6">
                    <div className="w-1/3">
                        <div className="flex justify-between py-2">
                            <span className="font-bold">Subtotal</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">₹{totalAmount}</span>
                        </div>
                        <button
                            onClick={handleProceed}
                            className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-2 px-4 w-full mt-4"
                        >
                            Proceed to Checkout
                        </button>

                        {showForm && (
                            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold mb-2">Enter Shipping Details</h2>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Full Name"
                                    className="w-full p-2 mb-2 border rounded"
                                />
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Your Address (State, District, Nearby Post Office)"
                                    className="w-full p-2 mb-2 border rounded"
                                ></textarea>
                                <button
                                    onClick={handleSubmitOrder}
                                    className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
