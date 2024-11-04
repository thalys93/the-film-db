import React, { useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GendersProps, SeriesProps, commonRequest, getBrasilianSeries, getBrasilianSeriesByGender, getSeriesGenders } from '../../utils/api/movies';
import SeriesCard from '../../components/seriesCard';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { WindowSizeContext } from '../../utils/context/Responsive';
import { SloganContext } from '../../utils/context/Slogan';
import { Info, PlusCircle } from '@phosphor-icons/react';
import { SerieCardTypes } from '../../utils/helpers/enums';
import FilterNav from '../../components/filter-nav/FilterNav';
import { Link } from 'react-router-dom';


function Series() {
  const [seriesList, setSeriesList] = React.useState<SeriesProps[]>([])
  const [selectedSeriesGender, setSelectedSeriesGender] = React.useState<number>(0)
  const [genders, setGenders] = React.useState<GendersProps[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [searchTxt, setSearchTxt] = React.useState<string>('')
  const [filteredList, setFilteredList] = React.useState<SeriesProps[]>([])

  let timeoutValue = 1000

  const winSize = React.useContext(WindowSizeContext)

  useEffect(() => {
    const getSeries = async () => {
      if (selectedSeriesGender !== 0) {
        await getBrasilianSeriesByGender(selectedSeriesGender).then((res: commonRequest) => {
          if (res.results !== undefined) {
            setSeriesList(res.results)
            setFilteredList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        await getBrasilianSeries().then((res: commonRequest) => {
          if (res.results !== undefined) {
            setSeriesList(res.results)
            setFilteredList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
    getSeries();
  }, [selectedSeriesGender])

  useEffect(() => {
    async function getGenders() {
      await getSeriesGenders().then((res) => {
        if (res !== null) {
          setGenders(res.genres)
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    getGenders();
  }, [])

  async function handleShowMoreSeries(count: number, mobile: boolean) {
    setIsLoading(true)

    if (mobile) {
      const scrollContainer = document.querySelector('#movieScrollBar');
      if (scrollContainer) {
        const contentWidth = scrollContainer.scrollWidth;
        const scrollLeft = contentWidth - scrollContainer.clientWidth;
        scrollContainer.scrollLeft = scrollLeft;
      }
    }

    await getBrasilianSeries(count).then((res: commonRequest) => {
      if (res.results !== undefined) {
        setTimeout(() => {
          setSeriesList([...seriesList, ...res.results])
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

  function handleSearchSeries(text: string) {
    setSearchTxt(text)
    if (text !== '') {
      setFilteredList(seriesList.filter((series) => series.name.toLowerCase().includes(text.toLowerCase())))
    } else {
      setFilteredList(seriesList)
    }
  }

  function handleFilterGenders(id: number) {
    if (id !== selectedSeriesGender) {
      setSelectedSeriesGender(id)
    } else {
      setSelectedSeriesGender(0)
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
                {seriesList.map((serie) => (
                  <section key={serie.id}>
                    <Row>
                      <Col>
                        <article className='absolute z-10 flex flex-col gap-1
                        items-center justify-center ml-[3rem] mt-[3rem]
                        lg:items-start lg:justify-start lg:ml-[6rem] lg:mt-[3rem]'>
                          <span className='text-stone-50 font-robt uppercase lg:text-xl text-sm select-none'>{serie.first_air_date.split("-")[0]}</span>
                          <h1 className='text-stone-50 lg:text-4xl text-2xl font-robt uppercase'>{serie.name} / <b className='text-red-700'>{serie.original_language}</b></h1>
                          <article className='ml-4 lg:ml-0'>
                            <Link to={`/serie/${serie.id}`} className={` ${dynamicSlogan.sloganCSS} bg-red-500 w-[15rem] items-center flex flex-row justify-center gap-3 p-2 rounded-sm transition-all hover:bg-red-300 mt-[5rem]`}>
                              <Info size={25} color='white' weight='fill' className='transition-all hover:scale-95' />
                              <span className='text-stone-50 font-robt uppercase'> Saiba Mais </span>
                            </Link>
                          </article>
                        </article>
                      </Col>
                      {winSize > 768 && (
                        <Col>
                          <article className='absolute z-10 ml-[20rem] mt-[3rem]'>
                            <SeriesCard series={serie} type={SerieCardTypes.header} />
                          </article>
                        </Col>
                      )}
                    </Row>
                    <img className='h-[25rem] object-cover opacity-30' src={serie.poster_path ? `https://image.tmdb.org/t/p/original${serie.backdrop_path}` : "https://placehold.co/600x500"} alt={serie.name} />
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
                  <FilterNav type='series' genders={genders} searchTerm={searchTxt} onFilter={handleFilterGenders} onSearch={handleSearchSeries} />
                </article>
                <article className='flex flex-wrap gap-4 justify-center'>
                  {filteredList.map((serie) => (
                    <div key={serie.id}>
                      <SeriesCard series={serie} type={SerieCardTypes.list} />
                    </div>
                  ))}
                </article>
                <div className='w-[70%] bg-stone-50 h-[0.5px] mb-[4.5rem] absolute right-[22rem]'></div>
                <article className='items-end flex justify-end'>
                  <button
                    disabled={isLoading}
                    onClick={() => handleShowMoreSeries(seriesList.length, false)}
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
                </article>
              </section>
            ) : (
              <section>
                <section>
                  <article id='movieScrollBar' className='flex flex-row overflow-x-scroll flex-nowrap gap-4'>
                    {seriesList.map((serie) => (
                      <article className='flex w-[16rem] gap-3'>
                        <SeriesCard series={serie} key={serie.id} type={SerieCardTypes.mobile} />
                      </article>
                    ))}
                  </article>
                  <article className='flex flex-row justify-center items-center gap-3'>
                    <button
                      disabled={isLoading}
                      onClick={() => handleShowMoreSeries(seriesList.length, true)}
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
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Series