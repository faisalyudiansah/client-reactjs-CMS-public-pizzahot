import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

let ModalAddCuisine = ({ fetchCuisines, setLoading, setSuccessMessage }) => {
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState('')

    let [categories, setCategories] = useState([])
    let [isError, setIsError] = useState(false)
    let [input, setInput] = useState({
        name: '',
        description: '',
        price: '',
        imgUrl: '',
        categoryId: ''
    })

    async function dataCategories() {
        try {
            let link = import.meta.env.VITE_BASE_URL + `/categories`
            let { data } = await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            setCategories(data.data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            })
        }
    }

    useEffect(() => {
        dataCategories()
    }, [])

    let changeInput = (e) => {
        let { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    async function saveSubmit(e) {
        e.preventDefault()
        try {
            let link = import.meta.env.VITE_BASE_URL + `/cuisines`
            await axios({
                method: 'post',
                url: link,
                data: input,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            setErrorMessage('')
            setSuccessMessage('Cuisine added successfully!')
            let modal = document.getElementById('addCuisineModal')
            modal.close()
            setInput({
                name: '',
                description: '',
                price: '',
                imgUrl: '',
                categoryId: ''
            })
            document.getElementById('categoryId').value = ''    // setinput bug
            setIsError(false)
            fetchCuisines()
            setLoading(true)
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage(error.response.data.message)
            setIsError(true)
        }
    }

    return (
        <>
            <dialog id="addCuisineModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add New Cuisine</h3>

                    <section className='m-10'>
                        <form className='' onSubmit={saveSubmit}>
                            <div className="py-4" >
                                <span htmlFor="name">Name</span>
                                <input
                                    type="text"
                                    className="w-full border input-bordered p-2 mt-2 rounded-md placeholder:text-inherit-300"
                                    placeholder='Name'
                                    name="name"
                                    id="name"
                                    value={input.name}
                                    onChange={changeInput}
                                />
                            </div>

                            <div className="" >
                                <span htmlFor="description">Description</span>
                                <textarea
                                    type="text"
                                    className="w-full border input-bordered p-2 mt-2 rounded-md placeholder:text-inherit-300"
                                    placeholder='Description'
                                    name="description"
                                    id="description"
                                    value={input.description}
                                    onChange={changeInput}
                                >
                                </textarea>
                            </div>

                            <div className="" >
                                <span htmlFor="price">Price</span>
                                <input
                                    type="number"
                                    className="w-full border input-bordered p-2 mt-2 rounded-md placeholder:text-inherit-300"
                                    placeholder='Price'
                                    name="price"
                                    id="price"
                                    value={input.price}
                                    onChange={changeInput}
                                />
                            </div>

                            <div className="py-4" >
                                <span htmlFor="imgUrl">Image Url</span>
                                <input
                                    type="text"
                                    className="w-full border input-bordered p-2 mt-2 rounded-md placeholder:text-inherit-300"
                                    placeholder='Image Url'
                                    name="imgUrl"
                                    id="imgUrl"
                                    value={input.imgUrl}
                                    onChange={changeInput}
                                />
                            </div>

                            <div className="mb-5">
                                <span htmlFor="categoryId">Category Id</span>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    name="categoryId"
                                    id="categoryId"
                                    onChange={changeInput}
                                    defaultValue="--Select--"
                                >
                                    <option disabled>--Select--</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {isError && (
                                <div role="alert" className="alert mb-3 alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{errorMessage}</span>
                                </div>
                            )}


                            <button type="submit" className="btn rounded-xl bg-base-200">Submit</button>
                        </form>
                    </section>
                </div>
            </dialog>
        </>
    )
}

export default ModalAddCuisine