import { GithubLogo, InstagramLogo, LinkedinLogo, ReadCvLogo } from '@phosphor-icons/react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function FooterBar() {
    const actualYear = new Date().getFullYear()
    const options = [
        { route: "https://github.com/thalys93", icon: <GithubLogo weight='fill' color='white' size={25} className='transition-all hover:scale-95' /> },
        { route: "https://www.instagram.com/luiss_xavierr/", icon: <InstagramLogo weight='fill' color='white' size={25} className='transition-all hover:scale-95' /> },
        { route: "https://www.linkedin.com/in/thalys-dev202/", icon: <LinkedinLogo weight='fill' color='white' size={25} className='transition-all hover:scale-95' /> },
        { route: "https://portifolio-luis-thalys.web.app/home", icon: <ReadCvLogo weight='fill' color='white' size={25} className='transition-all hover:scale-95' /> },
    ]
    return (
        <Navbar sticky='bottom' className='bg-[#1c1917]'>
            <Container className='flex flex-row justify-evenly'>
                <Navbar.Brand className='animate__animated animate__fadeIn'>
                    <Link to='/' className='flex flex-row gap-1 items-center text-slate-200 hover:text-red-400 transition-all font-inter uppercase ml-3 text-sm lg:text-lg'>
                        <img src='/png/favicon.png' className='w-[2rem] object-cover' />
                        The Film DB &copy; {actualYear}
                    </Link>
                </Navbar.Brand>


                <div className='flex flex-row items-center gap-2'>
                    {options.map((option) => (
                        <a href={option.route} target='_blank' rel='noopener noreferrer'>
                            {option.icon}
                        </a>
                    ))}
                </div>
            </Container>
        </Navbar>
    )
}

export default FooterBar