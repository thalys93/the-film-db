import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import NavigationBar from '../../components/navbar'
import { ArrowLeft } from '@phosphor-icons/react'
import { MoviesProps, commonRequest, getBrasilianMoviesByGender } from '../../utils/api/movies'
import FilmCard from '../../components/filmCard'
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import Search_Bar from '../../components/searchBar'

function Movies_Gender() {
  const { gender, id } = useParams()
  const [moviesList, setMoviesList] = React.useState<commonRequest>()
  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    const getFilmsByGender = async () => {
      await getBrasilianMoviesByGender(Number(id)).then((res: commonRequest) => {
        setMoviesList(res)
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }

    getFilmsByGender()
  }, [id])

  const filteredMovies = moviesList?.results.filter((movie: MoviesProps) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const randomNumber = Math.floor(Math.random() * 20)

  return (
    <>
      <Parallax>
        <NavigationBar />
        <Container>
          <Row>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image={`https://image.tmdb.org/t/p/original${moviesList?.results[randomNumber].backdrop_path}`} speed={-30} className='opacity-20 ' />
            </section>

            <section className='lg:m-5 mt-4 mb-5 flex flex-row gap-3 items-center'>
              <Link to="/movies">
                <button className='bg-slate-500 rounded-full hover:bg-slate-400 p-1'>
                  <ArrowLeft className='text-slate-50' size={25} />
                </button>
              </Link>
              <h1 className='text-stone-50 uppercase font-monts select-none'>Filmes de {gender}</h1>
              <div className='h-[0.5px] w-[10rem] bg-stone-500'></div>
            </section>
          </Row>

          <Row>
            <Search_Bar text='Busque pelo Filme' onSearch={handleSearchTermChange} />
          </Row>

          <Row>
            <section className='flex flex-row flex-wrap gap-4 justify-center items-center'>
              {filteredMovies?.length === 0 && <h1 className='text-stone-50 m-5 text-xl font-monts select-none uppercase'>Nenhum filme encontrado</h1>}
              {searchTerm.length > 0 ? filteredMovies?.map((movie: MoviesProps) => (
                <div key={movie.id} >
                  <FilmCard film={movie} />
                </div>
              )) : (
                moviesList?.results.map((movie: MoviesProps) => (
                  <div key={movie.id} >
                    <FilmCard film={movie} />
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

export default Movies_Gender