import React from 'react'

const ImgAboutUs = () => {
    return (
        <>
            <div className="p-4 w-full lg:w-6/12">
                <div className="-mx-4 flex items-center flex-wrap">
                    <div className="p-3 space-y-6 w-10/12 sm:w-6/12">
                        <img src="https://images.unsplash.com/photo-1504718855392-c0f33b372e72?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDQ0fHxyZXN0YXVyYW50fGVufDB8fHx8MTYzMTA4MTM3NQ&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=500&h=400&fit=crop" width="500" className="rounded-lg w-full" alt="..." height="400" />
                        <img src="https://images.unsplash.com/photo-1558138838-76294be30005?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDg0fHxwaXp6YXxlbnwwfHx8fDE2MzEwODA5NDA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=500&h=400&fit=crop" width="500" className="rounded-lg w-full" height="400" alt="..." />
                    </div>
                    <div className="p-3 w-10/12 sm:w-6/12">
                        <img src="https://images.unsplash.com/photo-1593504049359-74330189a345?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDQ2fHxwaXp6YXxlbnwwfHx8fDE2MzEwODA4NzU&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=500&h=650&fit=crop" width="500" className="rounded-lg w-full" height="650" alt="..." />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImgAboutUs