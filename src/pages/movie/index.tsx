import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MovieInt, getBrasilianMovie } from '../../utils/api/movies'
import { useParams } from 'react-router-dom'
import { Star, Users } from '@phosphor-icons/react'

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

    return (
        <Container fluid>
            <Row className='border-0'>
                <img
                    src={`https://image.tmdb.org/t/p/original${filmDetails?.backdrop_path}`}
                    className='w-screen h-screen absolute -z-50 opacity-15 object-cover rounded-xl shadow-md mt-3' />
                <Col>
                    <section className='flex flex-col items-start justify-start justify-items-center mt-5 lg:pb-[20%] content-center lg:mx-[10rem]'>
                        <article>
                            <h1 className='text-stone-50 uppercase font-monts select-none mb-3 underline underline-offset-4'>{filmDetails?.title}</h1>
                            <p className='text-stone-50 lg:w-[30rem]'>{filmDetails?.overview}</p>
                        </article>
                        <article className='flex flex-col lg:flex-row lg:gap-3 items-start justify-start'>
                            <img className='h-[20rem] w-[25rem] lg:w-[15rem] object-cover mt-4 rounded-lg shadow-md shadow-black' src={`https://image.tmdb.org/t/p/original${filmDetails?.poster_path}`} alt={filmDetails?.title} />
                            <section className='flex flex-col items-start justify-start lg:mt-5 mt-3 pb-5'>
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