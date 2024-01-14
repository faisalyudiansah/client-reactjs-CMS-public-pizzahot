import React from 'react'
import DescAboutUs from './components/DescAboutUs'
import ImgAboutUs from './components/ImgAboutUs'

const AboutUs = () => {
    return (
        <>
            <section className="pb-12 pt-24 bg-base-200" id="aboutUs">
                <div className="container mx-auto px-4 space-y-12">
                    <div className="flex flex-wrap -mx-4 items-center">
                        <DescAboutUs />
                        <ImgAboutUs />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs