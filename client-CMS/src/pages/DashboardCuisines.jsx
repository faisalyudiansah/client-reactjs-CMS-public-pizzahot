import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TableCuisine from '../components/CuisineComponents/TableCuisine'
import ModalEditCuisine from '../components/CuisineComponents/ModalEditCuisine'
import SearchCuisine from '../components/CuisineComponents/SearchCuisine'
import ModalAddCuisine from '../components/CuisineComponents/ModalAddCuisine'
import ModalUploadImage from '../components/CuisineComponents/ModalUploadImage'
import Swal from 'sweetalert2'

let DashboardCuisines = () => {
  let [successMessage, setSuccessMessage] = useState('')
  let [errorMessage, setErrorMessage] = useState('')
  let [totalData, setTotalData] = useState(0)
  let [pageSize, setPageSize] = useState(10)
  let [pageNumber, setPageNumber] = useState(1)

  let [dataCuisines, setDataCuisines] = useState([])

  let [selectedCuisineId, setSelectedCuisineId] = useState(null)

  let [sort, setSort] = useState('new')
  let [loading, setLoading] = useState(true)

  //===================================================================================================

  async function fetchCuisines(categoryId) {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/cuisines?sort=${sort}`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      setTotalData(data.totalData)
      setPageSize(data.pageSize)
      setPageNumber(data.pageNumber + 1)
      setDataCuisines(data.data)

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

  useEffect(() => {
    fetchCuisines()
  }, [sort])

  //===================================================================================================

  let handleEditClick = (cuisineId) => {
    setSelectedCuisineId(cuisineId)
    document.getElementById('editCuisineModal').showModal()
  }

  let handleUpdateImage = (cuisineId) => {
    setSelectedCuisineId(cuisineId)
    document.getElementById('uploadImageModal').showModal()
  }

  //===================================================================================================

  async function filter(id) {
    try {
      let link
      if (id === 0) {
        link = import.meta.env.VITE_BASE_URL + `/cuisines?sort=${sort}`
      } else {
        link = import.meta.env.VITE_BASE_URL + `/cuisines?filter[categoryId]=${id}&sort=${sort}`
      }
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      setTotalData(data.totalData)
      setPageSize(data.pageSize)
      setDataCuisines(data.data)

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

  async function pagination(number) {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/cuisines?page[size]=${pageSize}&page[number]=${number}&sort=${sort}`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      setDataCuisines(data.data)
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
          className={`join-item btn ${pageNumber === i ? 'btn-active' : ''}`}
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

  //===================================================================================================

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
          <div className="overflow-x-auto m-10">
            <div className="mockup-window rounded-2xl mb-5 bg-base-200">
              <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl">List Cuisines</h2>
            </div>
            {successMessage && (
              <div role="alert" className="alert mb-3 alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div role="alert" className="alert mb-3 alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <SearchCuisine
              fetchCuisines={fetchCuisines}
              setDataCuisines={setDataCuisines}
              setTotalData={setTotalData}
              setPageSize={setPageSize}
              sort={sort}
              setLoading={setLoading}
            />

            <div className="collapse rounded-3xl hover:bg-base-300 shadow-md bg-base-200 mb-4">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Information
              </div>
              <div className="collapse-content mx-5">
                <h4>Total Data = {totalData}</h4>
                <h4>Size Data per-Page = {pageSize}</h4>
                <h4>Page Number = {pageNumber}</h4>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="sort">Sort by: </label>
              <select className='bg-base-200 hover:bg-base-300 cursor-pointer rounded-xl p-1' id="sort" onChange={(e) => setSort(e.target.value)} value={sort}>
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
              </select>
            </div>

            <div className="mb-5 flex flex-wrap justify-center">
              <button className="mx-2 w-20 px-4 py-2 hover:bg-base-300 rounded-lg bg-base-200" onClick={() => filter(0)}>All</button>
              <button className="mx-2 w-20 px-4 py-2 hover:bg-base-300 rounded-lg bg-base-200" onClick={() => filter(1)}>Pizza</button>
              <button className="mx-2 w-20 px-4 py-2 hover:bg-base-300 rounded-lg bg-base-200" onClick={() => filter(2)}>Pasta</button>
              <button className="mx-2 w-20 px-4 py-2 hover:bg-base-300 rounded-lg bg-base-200" onClick={() => filter(3)}>Rice</button>
              <button className="mx-2 w-20 px-4 py-2 hover:bg-base-300 rounded-lg bg-base-200" onClick={() => filter(4)}>Drink</button>
            </div>

            <div className="flex justify-right mb-5">
              <button className="px-4 py-2 hover:bg-base-300 rounded-lg bg-base-200" onClick={() => document.getElementById('addCuisineModal').showModal()}>
                Add Cuisine
              </button>
            </div>

            <TableCuisine
              dataCuisines={dataCuisines}
              fetchCuisines={fetchCuisines}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
              setLoading={setLoading}
              handleEditClick={handleEditClick}
              handleUpdateImage={handleUpdateImage}
            />

            <div className="join flex justify-center mt-7">
              {renderPaginationButtons()}
            </div>

            <ModalAddCuisine
              fetchCuisines={fetchCuisines}
              setLoading={setLoading}
              setSuccessMessage={setSuccessMessage}
            />

            <ModalEditCuisine
              fetchCuisines={fetchCuisines}
              selectedCuisineId={selectedCuisineId}
              setLoading={setLoading}
              setSuccessMessage={setSuccessMessage}
            />

            <ModalUploadImage
              fetchCuisines={fetchCuisines}
              selectedCuisineId={selectedCuisineId}
              setLoading={setLoading}
              setSuccessMessage={setSuccessMessage}
            />
          </div>
        </section>
      )}
    </>
  )
}

export default DashboardCuisines