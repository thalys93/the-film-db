import React, { useEffect } from 'react'
import { SeriesProps, commonRequest, getBrasilianSeriesByGender } from '../../utils/api/movies';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import { Container, Row } from 'react-bootstrap';
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax';
import NavigationBar from '../../components/navbar';
import Search_Bar from '../../components/searchBar';
import SeriesCard from '../../components/seriesCard';

function Series_Gender() {
  const { gender, id } = useParams()
  const [SeriesList, setMoviesList] = React.useState<commonRequest>()
  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    const getFilmsByGender = async () => {
      await getBrasilianSeriesByGender(Number(id)).then((res: commonRequest) => {
        setMoviesList(res)
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }

    getFilmsByGender()
  }, [id])

  const filteredSeries = SeriesList?.results.filter((serie: SeriesProps) =>
    serie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const randomNumber = Math.floor(Math.random() * 20)

  return (
    <>
      <Parallax>
        {/* <NavigationBar /> */}
        <Container>
          <Row>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image={`https://image.tmdb.org/t/p/original${SeriesList?.results[randomNumber].backdrop_path}`} speed={-30} className='opacity-20 ' />
            </section>

            <section className='lg:m-5 mt-4 mb-5 flex flex-row gap-3 items-center'>
              <Link to="/movies">
                <button className='bg-slate-500 rounded-full hover:bg-slate-400 p-1'>
                  <ArrowLeft className='text-slate-50' size={25} />
                </button>
              </Link>
              <h1 className='text-stone-50 uppercase font-monts select-none'>Séries de {gender}</h1>
              <div className='h-[0.5px] w-[10rem] bg-stone-500'></div>
            </section>
          </Row>

          <Row>
            <Search_Bar text='Busque pelo Filme' onSearch={handleSearchTermChange} />
          </Row>

          <Row>
            <section className='flex flex-row flex-wrap gap-4 justify-center items-center'>
              {filteredSeries?.length === 0 && <h1 className='text-stone-50 m-5 text-xl font-monts select-none uppercase'>Nenhuma serie encontrada</h1>}
              {searchTerm.length > 0 ? filteredSeries?.map((series: SeriesProps) => (
                <div key={series.id} >
                  <SeriesCard series={series} />
                </div>
              )) : (
                SeriesList?.results.map((series: SeriesProps) => (
                  <div key={series.id} >
                    <SeriesCard series={series} />
                  </div>
                ))
              )}
            </section>
          </Row>
        </Container>
      </Parallax>
    </>
  )
}

export default Series_Gender