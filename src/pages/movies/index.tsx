import React, { useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import FilmCard from '../../components/filmCard'
import { GendersProps, MoviesProps, commonRequest, getBrasilianMovies, getBrasilianMoviesByGender, getFilmGenders } from '../../utils/api/movies'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { WindowSizeContext } from '../../utils/context/Responsive';
import { Info, Play, PlusCircle } from '@phosphor-icons/react';
import { FilmCardTypes } from '../../utils/helpers/enums';
import FilterNav from '../../components/filter-nav/FilterNav';
import { SloganContext } from '../../utils/context/Slogan';

function Movies() {
  const [moviesList, setMoviesList] = React.useState<MoviesProps[]>([])
  const [filteredList, setFilteredList] = React.useState<MoviesProps[]>([])
  const [searchTxt, setSearchTxt] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [genders, setGenders] = React.useState<GendersProps[]>([])
  const [selectedFilmGender, setSelectedFilmGender] = React.useState<number>(0)
  let timeoutValue = 1000
  const winSize = React.useContext(WindowSizeContext)

  useEffect(() => {
    const getMovies = async () => {

      if (selectedFilmGender !== 0) {
        await getBrasilianMoviesByGender(selectedFilmGender).then((res: commonRequest) => {
          if (res.results !== undefined) {
            setMoviesList(res.results)
            setFilteredList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        await getBrasilianMovies().then((res: commonRequest) => {
          if (res.results !== undefined) {
            setMoviesList(res.results)
            setFilteredList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }

    getMovies()
  }, [selectedFilmGender])

  useEffect(() => {
    async function getGenders() {
      await getFilmGenders().then((res) => {
        if (res !== null) {
          setGenders(res.genres)
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    getGenders()
  }, [])

  async function handleShowMoreFilms(count: number, mobile: boolean) {
    setIsLoading(true)

    if (mobile) {
      const scrollContainer = document.querySelector('#movieScrollBar');
      if (scrollContainer) {
        const contentWidth = scrollContainer.scrollWidth;
        const scrollLeft = contentWidth - scrollContainer.clientWidth;
        scrollContainer.scrollLeft = scrollLeft;
      }
    }
    await getBrasilianMovies(count).then((res: commonRequest) => {
      if (res.results !== undefined) {
        setTimeout(() => {
          setMoviesList([...moviesList, ...res.results])
          setFilteredList([...filteredList, ...res.results])
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

  function handleSearchFilms(text: string) {
    setSearchTxt(text)
    if (text !== '') {
      setFilteredList(moviesList.filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase())))
    } else {
      setFilteredList(moviesList)
    }
  }

  function handleSelectGender(id: number) {
    if (id !== selectedFilmGender) {
      setSelectedFilmGender(id)
    } else {
      setSelectedFilmGender(0)
    }
  }

  const { dynamicSlogan } = React.useContext(SloganContext)

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
                        <article className='absolute z-10 flex flex-col gap-1 lg:items-start items-start lg:justify-start lg:ml-[6rem] lg:mt-[3rem] mt-3 ml-3'>
                          <span className='text-stone-50 font-robt uppercase lg:text-xl text-sm select-none'>{movie.release_date.split("-")[0]}</span>
                          <h1 className='text-stone-50 lg:text-4xl font-robt uppercase'>{movie.title} / <b className='text-red-700'>{movie.original_title}</b></h1>
                          <p className='text-stone-300 font-robt capitalize lg:text-md lg:w-[35rem] m-3 lg:m-0 text-left lg:mb-3 mb-[5rem]'>{movie.overview ? movie.overview.slice(0, 240) + '...' : 'Sem descrição disponível.'}</p>
                          <article className='ml-4 lg:ml-0'>
                            {movie.video ? (
                              <button className={` ${dynamicSlogan.sloganCSS} bg-red-500 w-[15rem] items-center flex flex-row justify-center gap-3 p-2 rounded-sm transition-all hover:bg-red-300`}>
                                <Play size={25} color='white' className='transition-all hover:scale-95' />
                                <span className='text-stone-50 font-robt uppercase'> Veja o Trailer </span>
                              </button>
                            ) : (
                              <button className={` ${dynamicSlogan.sloganCSS} bg-red-500 w-[15rem] items-center flex flex-row justify-center gap-3 p-2 rounded-sm transition-all hover:bg-red-300`}>
                                <Info size={25} color='white' weight='fill' className='transition-all hover:scale-95' />
                                <span className='text-stone-50 font-robt uppercase'> Saiba Mais </span>
                              </button>
                            )}
                          </article>
                        </article>
                      </Col>
                      {winSize > 768 && (
                        <Col>
                          <article className='absolute z-10 ml-[20rem] mt-[3rem]'>
                            <FilmCard film={movie} type={FilmCardTypes.header} />
                          </article>
                        </Col>
                      )}
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
              <section className='flex flex-col gap-4'>
                <article className='ml-[5rem] mt-3'>
                  <FilterNav
                    type='movies'
                    genders={genders}
                    searchTerm={searchTxt}
                    onFilter={handleSelectGender}
                    onSearch={handleSearchFilms}
                  />
                </article>
                <article className='flex flex-wrap gap-4 justify-center'>
                  {filteredList.map((movie) => (
                    <div key={movie.id}>
                      <FilmCard film={movie} type={FilmCardTypes.list} />
                    </div>
                  ))}
                </article>
                <div className='w-[70%] bg-stone-50 h-[0.5px] mb-[4.5rem] absolute right-[22rem]'></div>
                <article className='items-end flex justify-end'>
                  <button
                    disabled={isLoading}
                    onClick={() => handleShowMoreFilms(moviesList.length, false)}
                    className={`${dynamicSlogan.sloganCSS} bg-red-500 w-[10rem] h-[3rem] items-center flex flex-row justify-center gap-3 p-2 rounded transition-all hover:bg-red-300 mb-5 relative mr-[10rem] shadow-md`}>
                    {isLoading ? (
                      <Spinner className='text-stone-50' />
                    ) : (
                      <>
                        <PlusCircle size={25} color='white' weight='fill' className='transition-all hover:scale-95' />
                        <span className='text-stone-50 font-robt uppercase'> Ver mais </span>
                      </>
                    )}
                  </button>

                  {/* por ora desativado, sem a necessidade de botão  */}
                  {/* <ButtonToolbar>
                    <ButtonGroup>
                      {moviesList.map((_, index) => (
                        <Button
                          key={index}
                          variant={index ? 'primary' : 'secondary'}
                          onClick={() => handleShowMoreFilms(index)}>
                          {index}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </ButtonToolbar> */}
                </article>
              </section>
            ) : (
              <section>
                <article id='movieScrollBar' className='flex flex-row overflow-x-scroll flex-nowrap gap-4'>
                  {moviesList.map((movie) => (
                    <article className='flex w-[16rem] gap-3'>
                      <FilmCard film={movie} key={movie.id} type={FilmCardTypes.mobile} />
                    </article>
                  ))}
                </article>
                <article className='flex flex-row justify-center items-center gap-3'>
                  <button
                    disabled={isLoading}
                    onClick={() => handleShowMoreFilms(moviesList.length, true)}
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

                  {/* <button className='border-[1px] border-red-500 w-[10rem] h-[3rem] items-center flex flex-row justify-center gap-3 p-2 rounded transition-all hover:bg-red-300 mb-5 relative shadow-md group'>
                    <span className='text-red-500 font-robt uppercase group-hover:text-stone-50'> Ver Todos </span>
                  </button> */}
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