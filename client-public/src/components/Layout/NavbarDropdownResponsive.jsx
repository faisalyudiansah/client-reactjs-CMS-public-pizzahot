import React from 'react'

const NavbarDropdownResponsive = () => {
    return (
        <>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                    <li><a href="/#home" className="p-4 text-lg">Home</a></li>
                    <li><a href="/#menus" className="p-4 text-lg">Menu</a></li>
                    <li><a href="/#aboutUs" className="p-4 text-lg">Abous Us</a></li>
                </ul>
            </div>
        </>
    )
}

export default NavbarDropdownResponsive