import React from 'react'
import './style/banner.css'
const Banner = () => {
    return (
        <>
            <section className="poster bg-base-500 min-h-[100vh]">
                <div className="container mx-auto pt-48">
                    <div className="-mx-4 flex flex-wrap items-center justify-center space-y-6 lg:space-y-0">
                        <div className="px-4 text-center w-full md:w-10/12 xl:w-9/12">
                            <p className="font-bold text-shadow-white font-serif mb-1 text-2xl text-shadow">Are You Hungry?</p>
                            <h1 className="capitalize text-shadow-white font-bold mb-6 text-4xl md:leading-tight md:text-5xl lg:leading-tight lg:text-6xl">Fill your tummy with the Yummiest pizza in town</h1>

                            <a href="#menus" className="bg-base-200 m-1 px-6 py-2 rounded-md inline-block hover:bg-base-100">Our Menus</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner