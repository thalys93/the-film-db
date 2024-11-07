import { Link } from 'react-router-dom'
import { SeriesProps } from '../../utils/api/movies'
import { Card } from 'react-bootstrap'
import { SerieCardTypes } from '../../utils/helpers/enums'
import { SloganContext } from '../../utils/context/Slogan'
import React from 'react'
import { Star } from '@phosphor-icons/react'

function SeriesCard({ series, type }: { series: SeriesProps, type: SerieCardTypes }) {

    const { dynamicSlogan } = React.useContext(SloganContext)

    function getStars(average: number) {
        let stars = Math.floor(average / 100);
        stars = Math.min(stars, 5);
        return Array.from({ length: stars }, (_, i) =>
            <Star key={i} className='text-yellow-500' weight='fill' size={30} />);
    }

    switch (type) {
        case SerieCardTypes.header:
            return (
                <Link to={`/serie/${series.id}`}>
                    <Card
                        className={`${dynamicSlogan.sloganCSS} bg-red-700 transition-all hover:scale-95  w-[11rem] h-[17rem] border-0 rounded shadow-md`}>
                        <Card.Img className={'h-[10rem] w-[15rem] object-cover'}
                            variant='top' src={series.poster_path !== "" ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : "https://placehold.co/600x500"} />
                        <Card.Body className='select-none justify-around flex flex-row items-center gap-1'>
                            <Card.Title className={'text-stone-50 font-monts mt-2 text-sm text-left'}>{series.name ? series.name : 'Carregando...'}</Card.Title>
                            {getStars(series.vote_count)}
                        </Card.Body>
                    </Card>
                </Link>
            )
        case SerieCardTypes.list:
            return (
                <Card
                    className={`${dynamicSlogan.sloganCSS} bg-red-700 w-[13rem] h-[25rem] mb-5 border-0 rounded shadow-md`}>
                    <Card.Img className={'h-[10rem] w-[15rem] object-cover'}
                        variant='top' src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : "https://placehold.co/600x500"} />
                    <Card.Body className='select-none justify-evenly flex flex-col flex-nowrap'>
                        <Card.Title className={'text-stone-50 font-monts'}>{series.name ? series.name : 'Carregando...'}</Card.Title>
                        <Card.Text className={'text-stone-300 font-monts'}>Série de TV</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <section className='m-3 justify-center flex items-center '>
                            <Link to={`/serie/${series.id}`}>
                                <button style={{ backgroundColor: dynamicSlogan?.backgroundColor }}
                                    className={series.id !== null ? 'bg-red-500 p-2 rounded hover:bg-red-300 text-stone-50 w-[10rem] mt-[-1rem]' : 'bg-red-800 p-2 rounded select-none cursor-pointer text-stone-500 w-[10rem] mt-2'} 
                                    disabled={series.id === null ? true : false}>
                                Detalhes
                            </button>
                            </Link>
                        </section>
                    </Card.Footer>
                </Card>
            )
        case SerieCardTypes.mobile:
            return (
                <Card
                    className={`${dynamicSlogan.sloganCSS} bg-red-700 w-[22rem] h-[23rem] mb-5 border-0 rounded shadow-md`}>
                    <Card.Img className={'h-[10rem] w-[22rem] object-cover'}
                        variant='top' src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : "https://placehold.co/600x500"} />
                    <Card.Body className='select-none justify-evenly flex flex-col flex-nowrap'>
                        <Card.Title className={'text-stone-50 font-monts'}>{series.name ? series.name : 'Carregando...'}</Card.Title>
                        <Card.Text className={'text-stone-300 font-monts'}>Série de TV</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <section className='m-3 justify-center flex items-center '>
                            <Link to={`/serie/${series.id}`}>
                                <button className={series.id !== null ? 'bg-red-500 p-2 rounded hover:bg-red-300 text-stone-50 w-[10rem] mt-[-1rem]' : 'bg-red-800 p-2 rounded select-none cursor-pointer text-stone-500 w-[10rem] mt-2'} disabled={series.id === null ? true : false}>
                                Detalhes
                            </button>
                            </Link>
                        </section>
                    </Card.Footer>
                </Card>
            )
    }
}

export default SeriesCard