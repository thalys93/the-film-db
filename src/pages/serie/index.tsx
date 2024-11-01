import React, { useEffect } from 'react'
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import NavigationBar from '../../components/navbar'
import { Col, Container, Row } from 'react-bootstrap'
import { Show, getBrasilianSerie } from '../../utils/api/movies'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Star, Users } from '@phosphor-icons/react'
import { WindowSizeContext } from '../../utils/context/Responsive'

function Series_Details() {
  const { id } = useParams()
  const [SerieDetails, setSerieDetails] = React.useState<Show>()

  const winSize = React.useContext(WindowSizeContext)

  useEffect(() => {
    const getShowDetails = async () => {
      await getBrasilianSerie(Number(id)).then((res) => {
        if (res !== null) {
          setSerieDetails(res)
        }
      }).catch((e) => {
        console.log(e)
      })
    }
    getShowDetails()
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
        {/* <NavigationBar /> */}
        <Container>
          <Row>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image={`https://image.tmdb.org/t/p/original${SerieDetails?.backdrop_path}`} speed={-30} className='opacity-20 ' />
            </section>

            <section className='lg:m-5 mt-4 mb-5 flex flex-row gap-3 items-center'>
              <Link to="/series">
                <button className='bg-slate-500 rounded-full hover:bg-slate-400 p-1'>
                  <ArrowLeft className='text-slate-50' size={30} />
                </button>
              </Link>
              <h1 className='text-stone-50 uppercase font-monts select-none'>Detalhes do Programa</h1>
              <div className='h-[0.5px] w-[10rem] bg-stone-500'></div>
            </section>
          </Row>

          <Row>
            <Col>
              <section className='animate__animated animate__fadeIn animate__slower'>
                <article className='flex flex-col lg:flex-row gap-3 lg:items-start justify-center lg:justify-start'>
                  <img className='h-[25rem] object-cover' src={`https://image.tmdb.org/t/p/original${SerieDetails?.backdrop_path}`} alt={SerieDetails?.name} />
                  <div>
                    <h1 className='text-stone-50 uppercase font-monts select-none mb-3 underline underline-offset-4'>{SerieDetails?.name}</h1>
                    <p className='text-stone-50 lg:w-[30rem]'>Esta é uma série de TV intrigante e emocionante. A história se desenrola em um mundo de suspense e mistério, onde cada episódio traz novas reviravoltas e surpresas. Fique ligado para mais detalhes em breve!</p>
                    <div className='flex flex-col lg:flex-row gap-4 mt-5'>
                      <div className='flex flex-row items-center gap-3'>
                        {countStars(SerieDetails?.vote_count)}
                        <p className='text-stone-50 text-xl'>Nota: {SerieDetails?.vote_count}</p>
                      </div>
                      {winSize < 768 && <div className='w-[18rem] bg-stone-50 h-[0.2rem]'></div>}
                      <div className='flex flex-row items-center gap-3'>
                        <Users className='text-sky-500' weight='fill' size={30} />
                        <p className='text-stone-50 text-xl'>Popularidade: {SerieDetails?.popularity}</p>
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

export default Series_Details