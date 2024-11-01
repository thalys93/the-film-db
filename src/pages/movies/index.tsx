import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FilmCard from '../../components/filmCard'
import { MoviesProps, commonRequest, getBrasilianMovies, getBrasilianMoviesByGender } from '../../utils/api/movies'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Categories from '../../components/categoriesList';
import { SelectedGenderContext } from '../../utils/context/Gender';
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { WindowSizeContext } from '../../utils/context/Responsive';
import { Play } from '@phosphor-icons/react';

function Movies() {
  const [moviesList, setMoviesList] = React.useState<MoviesProps[]>([])
  const { selectedFilmGender } = React.useContext(SelectedGenderContext);
  const winSize = React.useContext(WindowSizeContext)

  useEffect(() => {
    const getMovies = async () => {

      if (selectedFilmGender !== 0) {
        await getBrasilianMoviesByGender(selectedFilmGender).then((res: commonRequest) => {
          if (res.results !== undefined) {
            setMoviesList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        await getBrasilianMovies().then((res: commonRequest) => {
          if (res.results !== undefined) {
            setMoviesList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }

    getMovies()
  }, [selectedFilmGender])

  return (
    <>
      <Container fluid>
        <Row>
          <Parallax>
            <ParallaxBanner className='animate__animated animate__fadeIn -z-50 pb-[2rem] pt-[2rem]'>
              <Carousel showArrows={true} showStatus={false} showThumbs={false} infiniteLoop={true} autoPlay={false} interval={5000} transitionTime={1000} stopOnHover={true} showIndicators={false}>
                {moviesList.map((movie) => (
                  <section key={movie.id}>
                    <article className='absolute z-10 flex flex-col gap-1 items-start justify-start ml-[6rem] mt-[3rem]'>
                      <span className='text-stone-50 font-robt uppercase'>{movie.release_date.split("-")[0]}</span>
                      <h1 className='text-stone-50 text-4xl font-robt uppercase'>{movie.title}</h1>
                      <p className='text-stone-50 font-robt uppercase text-md w-[45rem] text-left'>{movie.overview ? movie.overview : 'Sem descrição disponível.'}</p>

                      {!movie.video && (
                        <article>
                          <button className='bg-red-500 w-[15rem] items-center flex flex-row justify-center gap-3 p-2 rounded-sm transition-all hover:bg-red-300'>
                            <Play size={25} color='white' className='transition-all hover:scale-95'/>
                            <span className='text-stone-50 font-robt uppercase'> Veja o Trailer </span>
                          </button>
                        </article>
                      )}
                    </article>

                    <img className='h-[25rem] object-cover opacity-30' src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "https://placehold.co/600x500"} alt={movie.title} />
                  </section>
                ))}
              </Carousel>
            </ParallaxBanner>
          </Parallax>
        </Row>

        <Row className='animate__animated animate__fadeIn'>
          <Col>
            <Categories type='movies' />
          </Col>
          <Col xs={8}>
            {winSize > 768 ? (
              <section className='flex overflow-x-scroll overflow-y-hidden gap-4'>
                {moviesList.map((movie) => (
                  <div key={movie.id}>
                    <FilmCard film={movie} />
                  </div>
                ))}
              </section>
            ) : (
              <section className='flex flex-col mt-3 justify-center align-middle items-center ml-[7rem]'>
                {moviesList.map((movie) => (
                  <div key={movie.id}>
                    <FilmCard film={movie} />
                  </div>
                ))}
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Movies