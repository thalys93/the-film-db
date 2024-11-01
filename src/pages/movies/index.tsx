import React, { useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import FilmCard from '../../components/filmCard'
import { MoviesProps, commonRequest, getBrasilianMovies, getBrasilianMoviesByGender } from '../../utils/api/movies'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Categories from '../../components/categoriesList';
import { SelectedGenderContext } from '../../utils/context/Gender';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { WindowSizeContext } from '../../utils/context/Responsive';
import { Info, Play, PlusCircle } from '@phosphor-icons/react';
import { FilmCardTypes } from '../../utils/helpers/enums';

function Movies() {
  const [moviesList, setMoviesList] = React.useState<MoviesProps[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { selectedFilmGender } = React.useContext(SelectedGenderContext);
  let timeoutValue = 1000
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

  async function handleShowMoreFilms(count: number) {
    setIsLoading(true)

    await getBrasilianMovies(count).then((res: commonRequest) => {
      if (res.results !== undefined) {
        setTimeout(() => {
          setMoviesList([...moviesList, ...res.results])
        }, timeoutValue)
      }
    }).catch((err) => {
      setTimeout(() => {
        setIsLoading(false)
      }, timeoutValue)
      console.log(err)
    }).finally(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, timeoutValue)
    })
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Parallax>
            <ParallaxBanner className='animate__animated animate__fadeIn -z-50 pb-[2rem] pt-[2rem]'>
              <Carousel showArrows={true} showStatus={true} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000} transitionTime={1000} stopOnHover={true} showIndicators={winSize < 768 ? false : true}>
                {moviesList.map((movie) => (
                  <section key={movie.id}>
                    <Row>
                      <Col>
                        <article className='absolute z-10 flex flex-col gap-1 items-start justify-start ml-[6rem] mt-[3rem]'>
                          <span className='text-stone-50 font-robt uppercase text-xl select-none'>{movie.release_date.split("-")[0]}</span>
                          <h1 className='text-stone-50 text-4xl font-robt uppercase'>{movie.title} / <b className='text-red-700'>{movie.original_title}</b></h1>
                          <p className='text-stone-300 font-robt capitalize text-md w-[35rem] text-left mb-3'>{movie.overview ? movie.overview.slice(0, 240) + '...' : 'Sem descrição disponível.'}</p>

                          {movie.video ? (
                            <button className='bg-red-500 w-[15rem] items-center flex flex-row justify-center gap-3 p-2 rounded-sm transition-all hover:bg-red-300'>
                              <Play size={25} color='white' className='transition-all hover:scale-95' />
                              <span className='text-stone-50 font-robt uppercase'> Veja o Trailer </span>
                            </button>
                          ) : (
                            <button className='bg-red-500 w-[15rem] items-center flex flex-row justify-center gap-3 p-2 rounded-sm transition-all hover:bg-red-300'>
                              <Info size={25} color='white' weight='fill' className='transition-all hover:scale-95' />
                              <span className='text-stone-50 font-robt uppercase'> Saiba Mais </span>
                            </button>
                          )}
                        </article>
                      </Col>
                      <Col>
                        <article className='absolute z-10 ml-[20rem] mt-[3rem]'>
                          <FilmCard film={movie} type={FilmCardTypes.header} />
                        </article>
                      </Col>
                    </Row>
                    <img className='h-[25rem] object-cover opacity-30' src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "https://placehold.co/600x500"} alt={movie.title} />
                  </section>
                ))}
              </Carousel>
            </ParallaxBanner>
          </Parallax>
        </Row>

        <Row className='animate__animated animate__fadeIn'>
          <Col>
            {winSize > 768 ? (
              <section className='flex flex-col gap-4 justify-end items-end'>
                <article className='flex flex-wrap gap-4 justify-center'>
                  {moviesList.map((movie) => (
                    <div key={movie.id}>
                      <FilmCard film={movie} type={FilmCardTypes.list} />
                    </div>
                  ))}
                </article>
                <button
                  disabled={isLoading}
                  onClick={() => handleShowMoreFilms(moviesList.length)}
                  className='bg-red-500 w-[10rem] h-[3rem] items-center flex flex-row justify-center gap-3 p-2 rounded transition-all hover:bg-red-300 mb-5 relative mr-[10rem] shadow-md'>
                  {isLoading ? (
                    <Spinner className='text-stone-50' />
                  ) : (
                    <>
                      <PlusCircle size={25} color='white' weight='fill' className='transition-all hover:scale-95' />
                      <span className='text-stone-50 font-robt uppercase'> Ver mais </span>
                    </>
                  )}
                </button>
              </section>
            ) : (
              <section>
                <Carousel                 
                showArrows={true} 
                showStatus={false} 
                showThumbs={false} 
                infiniteLoop={true}                 
                transitionTime={200}                 
                stopOnHover={true} 
                showIndicators={false}>
                  {moviesList.map((movie) => (
                    <section key={movie.id} className='flex justify-center items-center'>
                      <FilmCard film={movie} type={FilmCardTypes.carousel} />
                    </section>
                  ))}
                </Carousel>
                <article className='flex flex-row justify-center items-center gap-3'>
                  <button
                    disabled={isLoading}
                    onClick={() => handleShowMoreFilms(moviesList.length)}
                    className='bg-red-500 w-[10rem] h-[3rem] items-center flex flex-row justify-center gap-3 p-2 rounded transition-all hover:bg-red-300 mb-5 relative shadow-md'>
                    {isLoading ? (
                      <Spinner className='text-stone-50' />
                    ) : (
                      <>
                        <PlusCircle size={25} color='white' weight='fill' className='transition-all hover:scale-95' />
                        <span className='text-stone-50 font-robt uppercase'> Ver mais </span>
                      </>
                    )}
                  </button>

                  <button className='border-[1px] border-red-500 w-[10rem] h-[3rem] items-center flex flex-row justify-center gap-3 p-2 rounded transition-all hover:bg-red-300 mb-5 relative shadow-md group'>
                      <span className='text-red-500 font-robt uppercase group-hover:text-stone-50'> Ver Todos </span>
                  </button>
                </article>
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Movies