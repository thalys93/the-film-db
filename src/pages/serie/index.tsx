import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Show, getBrasilianSerie } from '../../utils/api/movies'
import { useParams } from 'react-router-dom'
import { Star, Users } from '@phosphor-icons/react'

function Series_Details() {
  const { id } = useParams()
  const [SerieDetails, setSerieDetails] = React.useState<Show>()  

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
    <Container fluid>
      <Row className='border-0'>
        <img
          src={`https://image.tmdb.org/t/p/original${SerieDetails?.backdrop_path}`}
          className='w-screen h-screen absolute -z-50 opacity-15 object-cover rounded-xl shadow-md mt-3' />
          <Col>
          <section className='flex flex-col items-start justify-start justify-items-center mt-5 lg:pb-[20%] content-center lg:mx-[10rem]'>
            <article>
              <h1 className='text-stone-50 uppercase font-monts select-none mb-3 underline underline-offset-4'>{SerieDetails?.name}</h1>
              <p className='text-stone-50 lg:w-[30rem]'>{SerieDetails?.overview}</p>
            </article>
            <article className='flex flex-col lg:flex-row lg:gap-3 items-start justify-start'>
              <img className='h-[20rem] w-[25rem] lg:w-[15rem] object-cover mt-4 lg:mt-2 rounded-lg shadow-md shadow-black' src={`https://image.tmdb.org/t/p/original${SerieDetails?.poster_path}`} alt={SerieDetails?.name} />
              <section className='flex flex-col items-start justify-start lg:mt-5 mt-3 pb-5'>
                <article className='flex flex-col justify-start'>
                  <div className='flex flex-row text-stone-50 gap-3 font-robt font-bold uppercase items-center'>
                    <h1>Popularidade : </h1>
                    <Users weight='fill' size={30} color='red' />
                  </div>
                  <p className='text-red-500 font-bold font-robt select-none'>{SerieDetails?.popularity}</p>
                </article>

                <article className='flex flex-col justify-start'>
                  <div className='flex flex-row text-stone-50 gap-1 font-robt font-bold uppercase items-center'>
                    <h1>Avaliação :</h1>
                    {countStars(SerieDetails?.vote_average)}
                  </div>
                  <p className='text-red-500 font-bold font-robt select-none'>{SerieDetails?.vote_average}</p>
                </article>
              </section>
            </article>
          </section>
          </Col>
      </Row>
      
    </Container>
  )
}

export default Series_Details