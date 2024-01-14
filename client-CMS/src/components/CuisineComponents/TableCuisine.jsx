import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'

const TableCuisine = ({ dataCuisines, fetchCuisines, handleEditClick, handleUpdateImage, setLoading, setSuccessMessage, setErrorMessage }) => {
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

    const handleDelete = async (cuisineId, nameCuisine) => {
        Swal.fire({
            title: "Do you want to delete this data?",
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let link = import.meta.env.VITE_BASE_URL + `/cuisines/${cuisineId}`
                    await axios({
                        method: 'delete',
                        url: link,
                        headers: {
                            Authorization: 'Bearer ' + localStorage.access_token
                        }
                    })
                    setErrorMessage('')
                    Swal.fire("Deleted!", "", "success");
                    setSuccessMessage(`${nameCuisine} : Has Been Deleted`)
                    fetchCuisines()
                } catch (error) {
                    setSuccessMessage('')
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${error.response.data.message}`,
                    })
                    setErrorMessage(error.response.data.message)
                }
            }
        })
    }

    return (
        <>
            <div className="table-container overflow-x-auto">
                <table className="min-w-full table-auto text-center">
                    <thead>
                        <tr className='bg-base-200'>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCuisines.map(cuisine => {
                            return (
                                <tr key={cuisine.id} className='bg-base-300 '>
                                    <td>{cuisine.name}</td>
                                    <td>{cuisine.description}</td>
                                    <td>{setCurrency(cuisine.price)}</td>
                                    <td>
                                        <img
                                            src={cuisine.imgUrl}
                                            alt={`Image of ${cuisine.name}`}
                                            className="w-40 object-cover rounded-md"
                                        />
                                    </td>
                                    <td>{setCategoryById(cuisine.categoryId)}</td>
                                    <td>{cuisine.User.username}</td>
                                    <td>
                                        <button className="btn rounded-lg btn-sm bg-base-200 hover:bg-base-300" onClick={() => handleEditClick(cuisine.id)}>
                                            Edit
                                        </button>
                                        <button className="btn rounded-lg m-2 btn-sm text-primary-content bg-orange-700 hover:bg-orange-900" onClick={() => handleUpdateImage(cuisine.id)}>
                                            Image
                                        </button>
                                        <button onClick={() => {
                                            handleDelete(cuisine.id, cuisine.name)
                                        }} className="btn rounded-lg btn-sm bg-rose-700 text-primary-content hover:bg-rose-900 m-2 ">Delete </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableCuisine