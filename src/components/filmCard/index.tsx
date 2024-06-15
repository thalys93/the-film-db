import { Card } from 'react-bootstrap'
import { MoviesProps } from '../../utils/api/movies'
import { Link } from 'react-router-dom'

function FilmCard({ film }: { film: MoviesProps }) {
    const truncateAndFormatOverview = (overview: string) => {     
        if (overview.length > 50) {
            return overview.substring(0, 65) + '...'            
        } else {
            return overview
        }
    }

    return (
        <Card className={film.overview !== '' ? 'bg-slate-700 w-[15rem] h-[25rem] mb-5' : "bg-slate-900 w-[15rem] h-[25rem] mb-5"}>
            <Card.Img className={film.overview !== '' ? 'h-[10rem] w-[15rem] object-cover' : 'h-[10rem] w-[15rem] object-cover filter grayscale'}
                variant='top' src={film.poster_path !== "" ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : "https://placehold.co/600x500"} />
            <Card.Body className='select-none justify-evenly flex flex-col flex-nowrap'>
                <Card.Title className={film.overview !== '' ? 'text-stone-50 font-monts' : 'text-stone-500 font-monts'}>{film.title ? film.title : 'Carregando...'}</Card.Title>
                <Card.Text className={film.overview !== '' ? 'text-stone-300 font-robt': 'text-stone-500 font-robt'}>{film.overview ? truncateAndFormatOverview(film.overview) : 'Sem descrição disponível.'}</Card.Text>
            </Card.Body>
            <section className='m-3 justify-center flex items-center '>
                <Link to={`/movie/${film.id}`}>
                    <button className={film.id !== null ? 'bg-red-500 p-2 rounded hover:bg-red-300 text-stone-50 w-[10rem] mt-2' : 'bg-red-800 p-2 rounded select-none cursor-pointer text-stone-500 w-[10rem] mt-2'} disabled={film.id === null ? true : false}>Ver Mais</button>
                </Link>
            </section>
        </Card>
    )
}

export default FilmCard