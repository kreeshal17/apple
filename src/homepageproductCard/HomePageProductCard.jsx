// productData 
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Component/Auth/firebase";
import { useDispatch } from "react-redux"


import { addToCart } from "../Redux/CardSlice";


const HomePageProductCard = () => {
    const [productDetail, setProductDetail] = useState(null);
    const dispatch = useDispatch()
   
   
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))

    }

    const fetchData = async () => {
        const productRef = collection(db, "products")
        const querysnapshot = await getDocs(productRef)

        const products = querysnapshot.docs.map(
            doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            )


        )
        setProductDetail(products)



    }
    useEffect(() => {
        fetchData()
    }





        ,





        [])





    return (
        <>



            <div className="mt-10">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
                </div>

                {/* main  */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {productDetail?.map((item, index) => {

                                return (
                                    <div key={index} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                                className="lg:h-80  h-96 w-full"
                                                src={item?.imageUrl || null}
                                                alt="blog"
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">

                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    {item?.title.substring(0, 25) || null}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    ₹{item?.price || null}
                                                </h1>

                                                <div className="flex justify-center ">
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">


                                                        Add To Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>








        </>
    )
}


export default HomePageProductCard;