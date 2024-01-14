import React from 'react'
import { useNavigate } from 'react-router-dom'

const card = ({ cuisine }) => {
    let navigate = useNavigate()

    function setCurrency(price) {
        return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    }

    return (
        <>
            <div className="card card-compact w-72 m-3 p-5 bg-base-200 shadow-lg">
                <figure><img src={cuisine.imgUrl} alt="Shoes" className='h-40' /></figure>
                <div className="card-body bg-base-300 rounded-xl">
                    <h2 className="card-title text-lg">{cuisine.name}</h2>
                    <p className='text-left mt-5'>{cuisine.description}</p>
                    <div className="card-actions mt-4">
                        <p className="text-left font-semibold mt-3 text-primary-500">{setCurrency(cuisine.price)}</p>
                        <button onClick={() => {
                            navigate('/detail-cuisine/' + cuisine.id)
                        }} className="btn bg-base-200 rounded-xl">Detail</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default card