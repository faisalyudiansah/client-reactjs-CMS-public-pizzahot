import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TableCategory from '../components/CategoryComponents/TableCategory'
import Swal from 'sweetalert2'


function DashboardCategory() {
  let [dataCategories, setDataCategories] = useState([])
  let [loading, setLoading] = useState(true)

  async function fetchCategories() {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/categories`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      setDataCategories(data.data)
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
    fetchCategories()
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
          <div className="overflow-x-auto m-10">
            <div className="mockup-window rounded-2xl mb-5 bg-base-200">
              <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl">List Categories</h2>
            </div>
            <TableCategory dataCategories={dataCategories} />

          </div>
        </section>
      )}
    </>
  );
}

export default DashboardCategory