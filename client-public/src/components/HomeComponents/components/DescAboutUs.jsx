import React from 'react'

const DescAboutUs = () => {
    return (
        <>
            <div className="p-4 w-full lg:w-6/12">
                <h2 className="font-bold font-serif mb-2 text-2xl text-primary-500">Welcom to Pizza Hot</h2>
                <h3 className="font-bold mb-2 text-4xl text-inherit">Indulge Yourself With the Delicacy of Our Pizza</h3>
                <p className="mb-6 mt-5 text-justify">Pizzah Hot is not just a pizzeria, it's a celebration of authentic taste and a testament to our unwavering dedication to quality. Join us in savoring the essence of tradition, the thrill of innovation, and the joy of a perfect slice.</p>

                <a href="#menus" className="bg-base-100 m-1 px-6 py-2 rounded inline-block hover:bg-base-300">Menus</a>
            </div>
        </>
    )
}

export default DescAboutUs