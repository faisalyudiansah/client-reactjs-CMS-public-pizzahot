import React from 'react'

const TableCategory = ({ dataCategories }) => {
    return (
        <>
            <table className="table text-center">
                <thead>
                    <tr className='bg-base-200'>
                        <th>Category Id</th>
                        <th>Name Category</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCategories.map(cuisine => {
                        return (
                            <tr key={cuisine.id} className='bg-base-300'>
                                <td>{cuisine.id}</td>
                                <td>{cuisine.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TableCategory