import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ModalEditCuisine = ({ fetchCuisines, selectedCuisineId, setLoading, setSuccessMessage }) => {
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState('')
    let [isError, setIsError] = useState(false)

    let [loadingModal, setLoadingModal] = useState(true)
    let [categories, setCategories] = useState([])
    let [input, setInput] = useState({
        name: '',
        description: '',
        price: '',
        imgUrl: '',
        categoryId: ''
    })

    async function getCuisineById(selectedCuisineId) {
        try {
            setLoadingModal(true)
            let link = import.meta.env.VITE_BASE_URL + `/cuisines/${selectedCuisineId}`
            let { data } = await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            setInput({
                name: data.name,
                description: data.description,
                price: data.price,
                imgUrl: data.imgUrl,
                categoryId: data.categoryId
            })
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setIsError(true)
        } finally {
            setLoadingModal(false)
        }
    }

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
            setErrorMessage(error.response.data.message)
            setIsError(true)
        }
    }

    useEffect(() => {
        if (selectedCuisineId !== null) {
            getCuisineById(selectedCuisineId)
        }
        dataCategories()
    }, [selectedCuisineId])

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
            let link = import.meta.env.VITE_BASE_URL + `/cuisines/${selectedCuisineId}`
            await axios({
                method: 'put',
                url: link,
                data: input,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            setSuccessMessage(`Cuisine "${input.name}" has been updated!`)
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
            setErrorMessage('')
            fetchCuisines()
            setLoading(true)
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setIsError(true)
        }
    }

    return (
        <>
            <dialog id="editCuisineModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Edit Cuisine</h3>

                    <section className='m-10'>
                        {loadingModal ? (
                            <div role="alert" className="alert ">
                                <span className="loading loading-bars loading-md"></span>
                                Loading...
                            </div>
                        ) : (
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
                                        value={input.categoryId}
                                    >
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
                        )}
                    </section>
                </div>
            </dialog>
        </>
    )
}

export default ModalEditCuisine