import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DetailSection = () => {
    let { idCuisine } = useParams()
    let [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)

    async function fetchById() {
        try {
            let data = await axios({
                method: 'get',
                url: `https://pizzahot-api.faisalyudiansah.site/pub/cuisines/${idCuisine}`
            })
            setItem(data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    function setCategoryById(categoryId) {
        if (categoryId === 1) {
            return `Pizza`
        }
        if (categoryId === 2) {
            return `Pasta`
        }
        if (categoryId === 3) {
            return `Rice`
        }
        if (categoryId === 4) {
            return `Drink`
        }
    }

    function setCurrency(price) {
        return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    }

    useEffect(() => {
        fetchById()
    }, [])

    return (
        <>
            {loading ? (
                <div className="m-10">
                    <div className="mockup-window border bg-base-200 p-10 flex flex-col items-center">
                        <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">Loading...</h2>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            ) : (
                <section>
                    <div className="m-10">
                        <div className="mockup-window border bg-base-200 p-10">
                            <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">{item.name}</h2>
                        </div>
                        <div className="card border lg:card-side mt-4 shadow-xl">
                            <figure><img src={item.imgUrl} alt="pizza-image" /></figure>
                            <div className="card-body bg-base-200">
                                <div className="indicator mb-10">
                                    <div className="indicator-item indicator-botto bg-base-100m">
                                        <span className="indicator-item badge rounded-lg badge-secondary text-purple-300 p-3 bg-base-100">Best Offer!</span>
                                    </div>
                                    <div className="card border">
                                        <div className="card-body">
                                            <h1 className="card-title">Price : {setCurrency(item.price)}</h1>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="card-title">Category : {setCategoryById(item.categoryId)}</h1>
                                <p>Description : {item.description}</p>
                                <div className="card-actions justify-left">
                                    <Link className="btn bg-base-100 rounded-xl" to={"/"}>Back To Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default DetailSection