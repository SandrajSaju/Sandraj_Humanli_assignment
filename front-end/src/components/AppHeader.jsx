import React from 'react'
import { Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <>
      <header className="fixed z-50 w-full text-white body-font bg-gray-800 top-0">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <div className="flex title-font items-center text-gray-900 mb-4 md:mb-0">
                <img className='md:ml-9 h-10 w-10' src={process.env.PUBLIC_URL + '/movie-drive logo.png'} alt="Logo" />
                    <span className="ml-2 text-xl text-white font-extrabold tracking-wider">HUMANLI . AI</span>
                </div>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to='/home' className="mr-5 hover:text-gray-900">Home</Link>
                    <Link to='/services' className="mr-5 hover:text-gray-900">Services</Link>
                    <Link to='/about' className="mr-5 hover:text-gray-900">About Us</Link>
                    <Link to='/contact' className="mr-5 hover:text-gray-900">Contact</Link>
                </nav>  
            </div>
        </header>
    </>
  )
}

export default AppHeader
