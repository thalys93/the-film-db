import { Link } from 'react-router-dom'
import { SeriesProps } from '../../utils/api/movies'
import { Card } from 'react-bootstrap'

function SeriesCard({ series }: { series: SeriesProps }) {
    return (
        <Card className={'bg-slate-700 w-[15rem] h-[25rem] mb-5'}>
            <Card.Img className={'h-[10rem] w-[15rem] object-cover'}
                variant='top' src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : "https://placehold.co/600x500"} />
            <Card.Body className='select-none justify-evenly flex flex-col flex-nowrap'>
                <Card.Title className={'text-stone-50 font-monts'}>{series.name ? series.name : 'Carregando...'}</Card.Title>
                <Card.Text className={'text-stone-300 font-monts'}>Série de TV</Card.Text>
            </Card.Body>
            <Card.Footer>
                <section className='m-3 justify-center flex items-center '>
                    <Link to={`/serie/${series.id}`}>
                        <button className={series.id !== null ? 'bg-red-500 p-2 rounded hover:bg-red-300 text-stone-50 w-[10rem] mt-2' : 'bg-red-800 p-2 rounded select-none cursor-pointer text-stone-500 w-[10rem] mt-2'} disabled={series.id === null ? true : false}>Detalhes</button>
                    </Link>
                </section>
            </Card.Footer>
        </Card>
    )
}

export default SeriesCard