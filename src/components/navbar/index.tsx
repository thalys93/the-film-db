import React, { useContext } from 'react'
import { WindowSizeContext } from '../../utils/context/Responsive'
import { Container, Navbar, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FilmReel, List } from '@phosphor-icons/react'
import { useLocation } from 'react-router-dom'

function NavigationBar() {
    const options = [
        { name: "Filmes", link: "/movies" },
        { name: "Séries", link: "/series" },
        { name: "Planos", link: "/pricing" },
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
    return winSize < 768 ? (
        <Navbar expand="lg">
            <Container>
                {!show && (
                    <>
                        <Navbar.Brand className='animate__animated animate__fadeIn'>
                            <Link to='/' className='flex flex-row gap-1 items-center text-slate-200 hover:text-red-400 transition-all font-monts'>
                                <FilmReel className='text-2xl' />
                                The Film DB
                            </Link>
                        </Navbar.Brand>
                        <button className='animate__animated animate__fadeIn text-slate-200 hover:text-red-400 transition-all border-0 m-2' onClick={() => showMenu()}>
                            <List className='hover:text-yellow-200' />
                        </button>
                    </>
                )}
                <Offcanvas show={show} onhide={() => closeMenu()} className="bg-slate-700 bg-opacity-50">
                    <Offcanvas.Header closeButton onClick={() => closeMenu()}>
                        <Offcanvas.Title>
                            <div className='flex flex-row gap-1 items-center text-slate-200 hover:text-red-400 transition-all font-monts'>
                                <FilmReel className='text-2xl' />
                                The Film DB
                            </div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <ul className='flex flex-col gap-2 justify-start items-start mt-3 ml-5'>
                        {options.map((opt, index) => (
                            <Link to={opt.link} key={index} className='gap-3 flex flex-col w-[10rem]'>
                                <span className='text-slate-200 hover:text-stone-50 transition-all font-monts uppercase p-2 bg-red-500 hover:bg-red-600 shadow-lg'>
                                    {opt.name}
                                </span>
                            </Link>
                        ))}
                    </ul>
                </Offcanvas>
            </Container>
        </Navbar>
    ) : (
        <Container>
            <nav className='flex flex-row justify-start gap-5 pt-3 ml-3 lg:ml-[5rem] lg:mr-[5rem]'>
                <div className='flex flex-row gap-2 items-center text-slate-200 hover:text-red-400 transition-all font-monts select-none'>
                    <FilmReel className={location.pathname === '/' ? 'text-red-400 text-2xl' : 'text-2xl'} />
                    <Link to='/' className={location.pathname === '/' ? "text-red-400" : ""}>The Film DB</Link>
                    <span className='ml-5 text-stone-50'>|</span>
                </div>
                <div className='flex flex-row gap-4'>
                    {options.map((opt, index) => (
                        <Link to={opt.link} key={index}>
                            <span className={location.pathname === opt.link ? "text-red-400 hover:text-red-300 transition-all font-monts underline underline-offset-4 " : 'text-slate-200 hover:text-red-400 transition-all font-monts'}>
                                {opt.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </Container>
    )
}

export default NavigationBar