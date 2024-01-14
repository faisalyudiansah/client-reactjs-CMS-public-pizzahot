import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const SearchCuisine = ({ fetchCuisines, setTotalData, setPageSize, setDataCuisines, sort, setLoading }) => {
    let [searchTerm, setSearchTerm] = useState('')
    const handleSearch = async () => {
        try {
            let link = import.meta.env.VITE_BASE_URL + `/cuisines?search=${searchTerm}&sort=${sort}`
            let { data } = await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            let dataCuisines = data.data
            setTotalData(data.totalData)
            setPageSize(data.pageSize)
            setDataCuisines(dataCuisines)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="join mb-4 ">
                <input
                    className="input input-bordered hover:bg-base-300 join-item bg-base-200"
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="mx-2 px-4 py-2 rounded-lg hover:bg-base-300 bg-base-200" onClick={handleSearch}>
                    Search
                </button>
                <button className="mx-2 px-4 py-2 rounded-lg hover:bg-base-300 bg-base-200" onClick={()=>{
                    fetchCuisines()
                    setSearchTerm('')
                }}>
                    <svg className="w-5 h-5 text-gray-400 dark:text-inherit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default SearchCuisine