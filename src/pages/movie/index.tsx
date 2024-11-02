import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MovieInt, getBrasilianMovie } from '../../utils/api/movies'
import { useParams } from 'react-router-dom'
import { Star, Users } from '@phosphor-icons/react'
import { WindowSizeContext } from '../../utils/context/Responsive'

function Movie_Details() {
    const { id } = useParams()
    const [filmDetails, setFilmDetails] = React.useState<MovieInt>()
        
    useEffect(() => {
        const getFilmDetails = async () => {
            await getBrasilianMovie(Number(id)).then((res) => {
                if (res !== null) {
                    setFilmDetails(res)
                }
            }).catch((e) => {
                console.log(e)
            })
        }
        getFilmDetails()
    }, [id])

    const countStars = (vote: number = 0) => {
        let stars = Math.floor(vote / 2);
        stars = Math.min(stars, 5);
        return (
            Array.from({ length: stars }, (_, i) => (
                <Star key={i} className='text-yellow-500' weight='fill' size={25} />
            ))
        );
    }

    // image = {`https://image.tmdb.org/t/p/original${filmDetails?.backdrop_path}`

    return (
        <Container className='h-screen'>
            <Row>
                <Col>
                    <section className='flex flex-col items-start justify-start mt-5'>
                        <article>
                            <h1 className='text-stone-50 uppercase font-monts select-none mb-3 underline underline-offset-4'>{filmDetails?.title}</h1>
                            <p className='text-stone-50 lg:w-[30rem]'>{filmDetails?.overview}</p>
                        </article>
                        <article className='flex flex-row gap-3 items-start justify-start'>
                            <img className='h-[20rem] object-cover mt-2 rounded-lg shadow-md shadow-black' src={`https://image.tmdb.org/t/p/original${filmDetails?.backdrop_path}`} alt={filmDetails?.title} />
                            <section className='flex flex-col items-start justify-start mt-5'>
                                <article className='flex flex-col justify-start'>
                                    <div className='flex flex-row text-stone-50 gap-3 font-robt font-bold uppercase items-center'>
                                        <h1>Popularidade : </h1>
                                        <Users weight='fill' size={30} color='red' />
                                    </div>
                                    <p className='text-red-500 font-bold font-robt select-none'>{filmDetails?.popularity}</p>
                                </article>

                                <article className='flex flex-col justify-start'>
                                    <div className='flex flex-row text-stone-50 gap-1 font-robt font-bold uppercase items-center'>
                                        <h1>Avaliação :</h1>
                                        {countStars(filmDetails?.vote_average)}
                                    </div>
                                    <p className='text-red-500 font-bold font-robt select-none'>{filmDetails?.vote_average}</p>
                                </article>
                            </section>
                        </article>
                    </section>
                </Col>


            </Row>
        </Container>
    )
}

export default Movie_Details