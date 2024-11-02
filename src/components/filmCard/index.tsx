import { Card } from 'react-bootstrap'
import { MoviesProps } from '../../utils/api/movies'
import { Link } from 'react-router-dom'
import { FilmCardTypes } from '../../utils/helpers/enums'
import { Star } from '@phosphor-icons/react'
import { SloganContext } from '../../utils/context/Slogan'
import React from 'react'

function FilmCard({ film, type }: { film: MoviesProps, type: FilmCardTypes }) {
    function getStars(average: number) {
        let stars = Math.floor(average / 100);
        stars = Math.min(stars, 5);
        return Array.from({ length: stars }, (_, i) =>
            <Star key={i} className='text-yellow-500' weight='fill' size={30} />);
    }

    const { dynamicSlogan } = React.useContext(SloganContext)

    switch (type) {
        case FilmCardTypes.header:
            return (
                <Link to={`/movie/${film.id}`}>
                    <Card                                                
                        className={film.overview !== '' ? `${dynamicSlogan.sloganCSS} bg-red-700 transition-all hover:scale-95  w-[11rem] h-[17rem] border-0 rounded shadow-md` : "transition-all hover:scale-95 bg-red-900 w-[11rem] h-[17rem] border-0 rounded shadow-md"}>
                        <Card.Img className={film.overview !== '' ? 'h-[10rem] w-[15rem] object-cover' : 'h-[10rem] w-[15rem] object-cover filter grayscale'}
                            variant='top' src={film.poster_path !== "" ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : "https://placehold.co/600x500"} />
                        <Card.Body className='select-none justify-around flex flex-row items-center gap-1'>
                            <Card.Title className={film.overview !== '' ? 'text-stone-50 font-monts mt-2 text-sm text-left' : 'text-stone-500 font-monts mt-2 text-sm text-left'}>{film.title ? film.title : 'Carregando...'}</Card.Title>
                            {getStars(film.vote_count)}
                        </Card.Body>
                    </Card>
                </Link>
            )
        case FilmCardTypes.list:
            return (
                <Card                    
                    className={film.overview !== '' ? `${dynamicSlogan.sloganCSS} bg-red-700 w-[13rem] h-[25rem] mb-5 border-0 rounded shadow-md` : "bg-slate-900 w-[13rem] h-[25rem] mb-5 border-0 rounded shadow-md"}>
                    <Card.Img className={film.overview !== '' ? 'h-[10rem] w-[15rem] object-cover' : 'h-[10rem] w-[15rem] object-cover filter grayscale'}
                        variant='top' src={film.poster_path !== "" ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : "https://placehold.co/600x500"} />
                    <Card.Body className='select-none justify-evenly flex flex-col'>
                        <Card.Title className={film.overview !== '' ? 'text-stone-50 font-monts text-sm' : 'text-stone-500 font-monts text-sm'}>{film.title ? film.title : 'Carregando...'}</Card.Title>
                        <Card.Text className={film.overview !== '' ? 'text-stone-300 font-robt' : 'text-stone-500 font-robt'}>{film.overview ? film.overview.slice(0, 50) + '...' : 'Sem descrição disponível.'}</Card.Text>
                    </Card.Body>
                    <section className='m-3 justify-center flex items-center '>
                        <Link to={`/movie/${film.id}`}>
                            <button 
                            style={{backgroundColor: dynamicSlogan?.backgroundColor}}
                            className={film.id !== null ? 'bg-red-500 p-2 rounded hover:bg-red-300 text-stone-50 w-[10rem] mt-[-1rem]' : 'bg-red-800 p-2 rounded select-none cursor-pointer text-stone-500 w-[10rem] mt-2'} disabled={film.id === null ? true : false}>Ver Mais</button>
                        </Link>
                    </section>
                </Card>
            )
        case FilmCardTypes.carousel:
            return (
                <Card                    
                    className={film.overview !== '' ? `${dynamicSlogan.sloganCSS} bg-red-700 mb-5 border-0 rounded shadow-md h-[22rem] w-[19rem]` : "bg-red-900 mb-5 border-0 rounded shadow-md h-[22rem] w-[15rem]"}>
                    <Card.Img className={film.overview !== '' ? 'h-[10rem] w-[15rem] object-cover' : 'h-[10rem] w-[15rem] object-cover filter grayscale'}
                        variant='top' src={film.poster_path !== "" ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : "https://placehold.co/600x500"} />
                    <Card.Body className='select-none justify-evenly flex flex-col'>
                        <Card.Title className={film.overview !== '' ? 'text-stone-50 font-monts text-sm' : 'text-stone-500 font-monts text-sm'}>{film.title ? film.title : 'Carregando...'}</Card.Title>
                        <Card.Text className={film.overview !== '' ? 'text-stone-300 font-robt' : 'text-stone-500 font-robt'}>{film.overview ? film.overview.slice(0, 50) + '...' : 'Sem descrição disponível.'}</Card.Text>
                    </Card.Body>
                    <section className='m-3 justify-center flex items-center '>
                        <Link to={`/movie/${film.id}`}>
                            <button className={film.id !== null ? 'bg-red-500 p-2 rounded hover:bg-red-300 text-stone-50 w-[10rem] mt-[-1rem]' : 'bg-red-800 p-2 rounded select-none cursor-pointer text-stone-500 w-[10rem] mt-2'} disabled={film.id === null ? true : false}>Ver Mais</button>
                        </Link>
                    </section>
                </Card>
            )
    }
}

export default FilmCard