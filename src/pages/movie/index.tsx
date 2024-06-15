import React, { useEffect } from 'react'
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import NavigationBar from '../../components/navbar'
import { Col, Container, Row } from 'react-bootstrap'
import { MovieInt, getBrasilianMovie } from '../../utils/api/movies'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Star, Users } from '@phosphor-icons/react'
import { WindowSizeContext } from '../../utils/context/Responsive'

function Movie_Details() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [filmDetails, setFilmDetails] = React.useState<MovieInt>()

    const winSize = React.useContext(WindowSizeContext)

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
        let stars = Math.floor(vote / 100);
        stars = Math.min(stars, 5);
        return (
            <>
                {Array.from({ length: stars }, (_, i) => (
                    <Star key={i} className='text-yellow-500' weight='fill' size={30} />
                ))}
            </>
        );
    }

    return (
        <>
            <Parallax>
                <NavigationBar />
                <Container>
                    <Row>                     
                        <section className='animate__animated animate__fadeIn -z-50'>
                            <ParallaxBannerLayer image={`https://image.tmdb.org/t/p/original${filmDetails?.backdrop_path}`} speed={-30} className='opacity-20 ' />
                        </section>

                        <section className='lg:m-5 mt-4 mb-5 flex flex-row gap-3 items-center'>                            
                                <button className='bg-slate-500 rounded-full hover:bg-slate-400 p-1' onClick={() => navigate(-1)}>
                                    <ArrowLeft className='text-slate-50' size={30} />
                                </button>                            
                            <h1 className='text-stone-50 uppercase font-monts select-none'>Detalhes do Filme</h1>
                            <div className='h-[0.5px] w-[10rem] bg-stone-500'></div>
                        </section>
                    </Row>

                    <Row>
                        <Col>
                            <section className='animate__animated animate__fadeIn animate__slower'>
                                <article className='flex flex-col lg:flex-row gap-3 lg:items-start justify-center lg:justify-start'>
                                    <img className='h-[25rem] object-cover' src={`https://image.tmdb.org/t/p/original${filmDetails?.backdrop_path}`} alt={filmDetails?.title} />
                                    <div>
                                        <h1 className='text-stone-50 uppercase font-monts select-none mb-3 underline underline-offset-4'>{filmDetails?.title}</h1>
                                        <p className='text-stone-50 lg:w-[30rem]'>{filmDetails?.overview}</p>

                                        <div className='flex flex-col lg:flex-row gap-4 mt-5'>
                                            <div className='flex flex-row items-center gap-3'>
                                                {countStars(filmDetails?.vote_count)}
                                                <p className='text-stone-50 text-xl'>Nota: {filmDetails?.vote_count}</p>
                                            </div>
                                            {winSize < 768 && <div className='w-[18rem] bg-stone-50 h-[0.2rem]'></div>}
                                            <div className='flex flex-row items-center gap-3'>
                                                <Users className='text-sky-500' weight='fill' size={30} />
                                                <p className='text-stone-50 text-xl'>Popularidade: {filmDetails?.popularity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </Col>
                    </Row>
                </Container>
            </Parallax>
        </>
    )
}

export default Movie_Details