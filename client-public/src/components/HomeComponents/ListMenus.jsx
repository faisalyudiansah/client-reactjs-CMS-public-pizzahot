import React from 'react'
import axios from "axios"
import { useEffect, useState } from 'react'
import CardCuisine from './components/CardCuisine'
import Swal from 'sweetalert2'

let ListMenus = () => {
    let [totalData, setTotalData] = useState(0)
    let [pageSize, setPageSize] = useState(10)
    let [pageNumber, setPageNumber] = useState(1)

    let [cuisines, setCuisines] = useState([])

    let [searchTerm, setSearchTerm] = useState('')

    let [sort, setSort] = useState('new')
    let [loading, setLoading] = useState(true)

    async function filter(id) {
        try {
            let link
            if (id === 0) {
                link = import.meta.env.VITE_BASE_URL + `/pub/cuisines?sort=${sort}`
            } else {
                link = import.meta.env.VITE_BASE_URL + `/pub/cuisines?filter[categoryId]=${id}&sort=${sort}`
            }
            let { data } = await axios({
                method: 'get',
                url: link
            })
            setTotalData(data.totalData)
            setPageSize(data.pageSize)
            setCuisines(data.data)

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

    //===================================================================================================

    async function fetchData(categoryId) {
        try {
            let link = import.meta.env.VITE_BASE_URL + `/pub/cuisines?sort=${sort}`
            if (categoryId && typeof categoryId === 'number') {
                link = import.meta.env.VITE_BASE_URL + `/pub/cuisines?filter[categoryId]=${categoryId}&sort=${sort}`
            }
            let { data } = await axios({
                method: 'get',
                url: link,
            })
            setTotalData(data.totalData)
            setPageSize(data.pageSize)
            setPageNumber(data.pageNumber + 1)
            setCuisines(data.data)

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

    let handleSearch = async () => {
        try {
            let link = import.meta.env.VITE_BASE_URL + `/pub/cuisines?search=${searchTerm}&sort=${sort}`
            let { data } = await axios({
                method: 'get',
                url: link,
            })
            let dataCuisines = data.data
            setTotalData(data.totalData)
            setPageSize(data.pageSize)
            setCuisines(dataCuisines)
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

    let handleReset = () => {
        setSearchTerm('');
        fetchData();
    };

    useEffect(() => {
        fetchData()
    }, [sort])

    //=======================================================================================================

    async function pagination(number) {
        try {
            let link = import.meta.env.VITE_BASE_URL + `/pub/cuisines?page[size]=${pageSize}&page[number]=${number}&sort=${sort}`
            let { data } = await axios({
                method: 'get',
                url: link
            })
            setCuisines(data.data)
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

    let renderPaginationButtons = () => {
        let totalPages = Math.ceil(totalData / pageSize)
        let buttons = []
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`join-item rounded-lg btn ${pageNumber === i ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            )
        }
        return buttons
    }

    let handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber)
    }

    useEffect(() => {
        pagination(pageNumber)
    }, [pageNumber])

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
                <section className="text-center bg-base-300" id='menus'>
                    <div className="px-12 py-12 -mb-12">

                        <div className="-mx-4 flex flex-wrap items-center justify-center mb-12">
                            <div className="px-4 text-center w-full md:w-10/12 xl:w-9/12">
                                <h2 className="font-medium mb-1 text-primary-500">Our Menus</h2>
                                <h3 className="capitalize font-bold text-4xl font-serif">Lovely Cuisines Lovely Food!</h3>
                            </div>
                        </div>
                        <div className="join mb-4 ">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="input  rounded-lg hover:bg-base-100 input-bordered join-item bg-base-200 placeholder:text-inherit"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <div className="wrap">
                                <button className="mx-2 px-4 py-2 rounded-lg  hover:bg-base-100 bg-base-200" onClick={handleSearch}>
                                    Search
                                </button>
                                <button className="mx-1 px-4 py-2 rounded-lg  hover:bg-base-100 bg-base-200" onClick={handleReset}>
                                    <svg className="w-5 h-5 text-gray-400 dark:text-inherit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <button className="mx-2 w-20 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-100" onClick={() => filter(0)}>All</button>
                            <button className="mx-2 w-20 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-100" onClick={() => filter(1)}>Pizza</button>
                            <button className="mx-2 w-20 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-100" onClick={() => filter(2)}>Pasta</button>
                            <button className="mx-2 w-20 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-100" onClick={() => filter(3)}>Rice</button>
                            <button className="mx-2 w-20 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-100" onClick={() => filter(4)}>Drink</button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sort">Sort by: </label>
                            <select className='bg-base-200  hover:bg-base-100 cursor-pointer rounded-xl p-1' id="sort" onChange={(e) => setSort(e.target.value)} value={sort}>
                                <option value="new">Newest</option>
                                <option value="old">Oldest</option>
                            </select>
                        </div>

                        <div className="flex flex-wrap justify-center ">
                            {cuisines && cuisines.map(cuisine => {
                                return <CardCuisine key={cuisine.id} cuisine={cuisine} />
                            })}
                        </div>
                    </div>
                    <div className="py-12 ">
                        {renderPaginationButtons()}
                    </div>
                </section>
            )}
        </>
    )
}

export default ListMenus