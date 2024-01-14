import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ModalUploadImage = ({ fetchCuisines, selectedCuisineId, setLoading, setSuccessMessage }) => {
    let [input, setInput] = useState({
        name: '',
        imgUrl: ''
    })
    let [loadingModal, setLoadingModal] = useState(true)
    let [file, setFile] = useState(null)
    let [isError, setIsError] = useState(false)
    let [errorMessage, setErrorMessage] = useState('')

    async function findCuisineById(selectedCuisineId) {
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
                imgUrl: data.imgUrl
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingModal(false)
        }
    }

    useEffect(() => {
        if (selectedCuisineId !== null) {
            findCuisineById(selectedCuisineId)
        }
    }, [selectedCuisineId])

    const handleChange = (event) => {
        const image = event.target.files[0]
        console.log(image)
        setFile(image)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('imgUrl', file)
            const { data } = await axios({
                method: 'patch',
                url: import.meta.env.VITE_BASE_URL + `/cuisines/${selectedCuisineId}/img-url`,
                data: formData,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token,
                    "Content-Type": "multipart/form-data",
                }
            })
            setSuccessMessage(`Image "${input.name}" has been updated!`)
            let modal = document.getElementById('addCuisineModal')
            modal.close()
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
            <dialog id="uploadImageModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Setting Image Cuisine</h3>

                    <section className='m-10'>
                        {loadingModal ? (
                            <div role="alert" className="alert ">
                                <span className="loading loading-bars loading-md"></span>
                                Loading...
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitForm}>
                                <h3 className="font-bold text-lg">{input.name}</h3>
                                <img src={input.imgUrl} alt="image" />
                                <input onChange={handleChange} type="file" name="imgUrl" className="file-input bg-base-200 file-input-bordered w-full max-w-xs" />
                                {isError && (
                                    <div role="alert" className="alert mt-3 alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{errorMessage}</span>
                                    </div>
                                )}
                                <button type="submit" className="btn rounded-xl mt-4 bg-base-200">Upload</button>
                            </form>
                        )}
                    </section>
                </div>
            </dialog>
        </>
    )
}

export default ModalUploadImage