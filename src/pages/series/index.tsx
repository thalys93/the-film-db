import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SeriesProps, commonRequest, getBrasilianSeries, getBrasilianSeriesByGender } from '../../utils/api/movies';
import SeriesCard from '../../components/seriesCard';
import { SelectedGenderContext } from '../../utils/context/Gender';
import Categories from '../../components/categoriesList';
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax';
import NavigationBar from '../../components/navbar';
import { WindowSizeContext } from '../../utils/context/Responsive';


function Series() {
  const [seriesList, setSeriesList] = React.useState<SeriesProps[]>([])
  const { selectedSeriesGender } = React.useContext(SelectedGenderContext);
  const winSize = React.useContext(WindowSizeContext)

  useEffect(() => {
    const getSeries = async () => {
      if (selectedSeriesGender !== 0) {
        await getBrasilianSeriesByGender(selectedSeriesGender).then((res: commonRequest) => {
          if (res.results !== undefined) {
            setSeriesList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        await getBrasilianSeries().then((res: commonRequest) => {
          if (res.results !== undefined) {
            setSeriesList(res.results)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
    getSeries();
  }, [selectedSeriesGender])

  return (
    <>
      <Parallax>
        {/* <NavigationBar /> */}
        <Container>
          <Row>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image={`/img/parallax7.jpg`} speed={-30} className='opacity-20 ' />
            </section>
            <section className='lg:m-5 mt-3 mb-3 flex flex-row gap-3 items-center'>
              <h1 className='text-stone-500 uppercase font-monts select-none'> Veja suas Series Favoritas </h1>
              <div className='h-[0.5px] w-[9rem] bg-stone-500'></div>
            </section>
          </Row>
          <Row className='mb-5 animate__animated animate__fadeIn animate__slower'>
            <Carousel showArrows={true} showStatus={false} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000} transitionTime={1000} stopOnHover={true} showIndicators={false}>
              {seriesList.map((series) => (
                <div key={series.id}>
                  <img className='h-[25rem] object-cover' src={series.poster_path ? `https://image.tmdb.org/t/p/original${series.backdrop_path}` : "https://placehold.co/600x500"} alt={series.name} />
                  <h1 className='text-3xl font-monts text-stone-50 bg-slate-700 pt-3 pb-3 relative bottom-[40px] mt-3 z-10 select-none truncate'>{series.name}</h1>
                </div>
              ))}
            </Carousel>
          </Row>

          <Row className='animate__animated animate__fadeIn'>
            <Col>
              <Categories type="series" />
            </Col>
            <Col xs={8}>
              {winSize > 768 ? (
                <section className='flex overflow-x-scroll overflow-y-hidden gap-4'>
                  {seriesList.map((series) => (
                    <div key={series.id}>
                      <SeriesCard series={series} />
                    </div>
                  ))}
                </section>
              ) : (
                <section className='flex flex-col mt-3 justify-center align-middle items-center ml-[7rem]'>
                  {seriesList.map((series) => (
                    <div key={series.id}>
                      <SeriesCard series={series} />
                    </div>
                  ))}
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </Parallax>
    </>
  )
}

export default Series