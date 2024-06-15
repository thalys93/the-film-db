import { Card, Placeholder, PlaceholderButton } from 'react-bootstrap'

function FilmCard_Placeholder() {
    return (
        <Card className='bg-slate-700 w-[15rem] h-[25rem] mb-5'>
            <Placeholder animation='glow'>
                <Placeholder className="bg-stone-400 w-[15rem] h-[10rem]" />
            </Placeholder>            
            <Card.Body className='select-none justify-evenly flex flex-col flex-nowrap'>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={9} className="bg-stone-50" />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} className="bg-stone-50" />
                    <Placeholder xs={6} className="bg-stone-50" />
                </Placeholder>
            </Card.Body>
            <section className='m-3 justify-center flex items-center '>
                <PlaceholderButton xs={9} className="bg-stone-50 h-[2rem]" variant='danger' animation='wave'/>                
            </section>
        </Card>
    )
}

export default FilmCard_Placeholder