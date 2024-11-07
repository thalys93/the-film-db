import React, { useContext } from 'react'
import { WindowSizeContext } from '../../utils/context/Responsive'
import { Container, Navbar, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { List } from '@phosphor-icons/react'
import { useLocation } from 'react-router-dom'
import { SloganContext } from '../../utils/context/Slogan'

function NavigationBar() {
    const options = [
        { name: "Filmes", link: "/movies" },
        { name: "Séries", link: "/series" },
        { name: "Sobre", link: "/about" },
    ]

    const [show, setShow] = React.useState(false)

    const showMenu = () => {
        setShow(true)
    }

    const closeMenu = () => {
        setShow(false)
    }

    const location = useLocation()
    const winSize = useContext(WindowSizeContext)
    const { dynamicSlogan } = React.useContext(SloganContext)

    return winSize < 768 ? (
        <Navbar sticky='top' className={`${dynamicSlogan.sloganCSS}`}>
            <Container>
                {!show && (
                    <>
                        <Navbar.Brand className='animate__animated animate__fadeIn'>
                            <Link to='/' className='flex flex-row gap-1 items-center text-slate-200 hover:text-red-400 transition-all font-monts ml-3'>
                                <img src='/png/favicon.png' className='w-[2rem] object-cover' />
                                The Film DB
                            </Link>
                        </Navbar.Brand>
                        <button className='animate__animated animate__fadeIn text-slate-200 hover:text-red-400 transition-all border-0 m-2' onClick={() => showMenu()}>
                            <List className='hover:text-yellow-200' />
                        </button>
                    </>
                )}
                <Offcanvas show={show} onhide={() => closeMenu()} className={`${dynamicSlogan.sloganCSS}`} bsPrefix='offcanvas' scroll backdrop>
                    <Offcanvas.Header closeButton={false} className='flex flex-row items-start justify-start'>
                        <Offcanvas.Title >
                            <div className='flex flex-row gap-1 text-slate-200 hover:text-red-400 transition-all font-monts items-center justify-center'>
                                <img src='/png/favicon.png' className='w-[2rem] object-cover' />
                                The Film DB
                            </div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <ul className='flex flex-col gap-2 justify-around items-start mt-3 ml-5'>
                        {options.map((opt, index) => (
                            <Link
                                to={opt.link}
                                key={index}
                                onClick={() => closeMenu()}
                                className='gap-3 flex flex-col w-[10rem]'>
                                <span
                                    style={{ backgroundColor: dynamicSlogan?.backgroundColor }}
                                    className='text-slate-200 hover:text-stone-50 transition-all font-monts uppercase p-2 bg-red-500 hover:bg-red-600 shadow-lg'>
                                    {opt.name}
                                </span>
                            </Link>
                        ))}                       
                        <button className='gap-3 flex flex-col mt-[25rem]' onClick={() => closeMenu()}>
                            <span
                                style={{ borderColor: dynamicSlogan?.backgroundColor, color: 'white' }}
                                className='w-[10rem] text-left text-red-500 hover:text-red-50 transition-all font-monts uppercase p-2 border-[2px] border-red-500 hover:bg-red-600 shadow-lg'>
                                Fechar
                            </span>
                        </button>
                    </ul>
                </Offcanvas>
            </Container>
        </Navbar>
    ) : (
        <Container className='font-inter uppercase'>
            <nav className='flex flex-row justify-start gap-5 pt-3 items-center'>
                <div className='flex flex-row gap-2 items-center text-stone-50 hover:text-red-400 transition-all select-none'>
                    <img src='/png/favicon.png' className='w-[2rem] object-cover' />
                    <Link to='/' className={location.pathname === '/' ? "text-red-400 uppercase font-semibold" : "uppercase font-semibold text-stone-50"}>The Film DB</Link>
                    <div className='flex flex-row gap-4 ml-[4rem]'>
                        {options.map((opt, index) =>
                            <Link to={opt.link} key={index}>
                                <span className={location.pathname === opt.link ? "text-red-400 hover:text-red-300 transition-all underline underline-offset-4 " : 'text-stone-50 hover:text-red-400 transition-all'}>
                                    {opt.name}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>                
            </nav>
        </Container>
    )
}

export default NavigationBar