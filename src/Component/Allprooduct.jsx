import React, { useState } from 'react'

import { toast } from 'react-toastify';

import { auth, db } from './Auth/firebase';

import { setDoc, doc } from 'firebase/firestore';


function Allprooduct() {


  const [product, setProduct] = useState({
    imageUrl: '',
    title: '',
    description: '',
    price: '',
    quantity: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const randomId = Math.random().toString(36).substr(2, 9);

      await setDoc(doc(db, "products", randomId), {
        imageUrl: product.imageUrl,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity

      })


      toast.success("product registered successfully!", { position: "top-center" });
      setProduct({ imageUrl: '', title: '', description: '', price: '', quantity: '' });
    }
    catch (error) {
      toast.error("Something went wrong!", { position: "top-center" });
      console.error("Error adding document:", error);
    }

  }
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return
    const data = new FormData();
    data.append("file", file)
    data.append("upload_preset", "krishal")
    data.append("cloud_name", "dgfuwtqbk")


    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dgfuwtqbk/image/upload", {
        method: "Post",
        body: data
      })
      if (res.ok) {
        const result = await res.json();

        setProduct(prev => ({
          ...prev, imageUrl: result.secure_url
        }))
        toast.success("Image uploaded successfully!", {
          position: "top-center"
        })
      }


    }
    catch (error) {

    }



  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(

      (prev) => ({
        ...prev,
        [name]: value

      }
      )

    )



  }


  return (
    <>
      {/* {
        id: 4,
        image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
        title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
        desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
        price: 120,
        trendingProductName: 'Featured',
        quantity: 1,
    } */}
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>

        <form onSubmit={handleSubmit}>
          {/* Image URL */}


          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter detailed product description"
              required
            ></textarea>
          </div>












          <div className="mb-4">
            <input type="file" name="" id=""
              onChange={handleFile} />
          </div>




















          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      </div>






    </>


  )
}

export default Allprooduct