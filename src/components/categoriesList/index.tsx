import React, { useEffect } from 'react'
import { Container, ListGroup, Row } from 'react-bootstrap'
import { GendersProps, getFilmGenders, getSeriesGenders } from '../../utils/api/movies'
import { SelectedGenderContext } from '../../utils/context/Gender'
import { Link } from 'react-router-dom'

function Categories({ type }: { type: 'movies' | 'series' }) {

  const [gendersList, setGendersList] = React.useState<GendersProps[]>([])
  const [selected, setSelected] = React.useState<number>(null)

  const { setSelectedFilmGender, setSelectedSeriesGender } = React.useContext(SelectedGenderContext);

  useEffect(() => {
    const getGenders = async () => {
      switch (type) {
        case "movies":
          await getFilmGenders().then((res) => {
            if (res !== null) {
              setGendersList(res.genres.slice(0, 8))
            }
          }).catch((err) => {
            console.log(err)
          })
          break
        case "series":
          await getSeriesGenders().then((res) => {
            setGendersList(res.genres.slice(0, 8))
          }).catch((err) => {
            console.log(err)
          })
          break
        default:
          break
      }
    }

    getGenders()
  }, [])

  const selectGender = async (genderID: number, index: number) => {
    setSelected(index)
    if (type === 'movies') setSelectedFilmGender(genderID)
    if (type === 'series') setSelectedSeriesGender(genderID)

    localStorage.setItem('selectedGender', index.toString());
  }

  useEffect(() => {
    const storedGender = localStorage.getItem('selectedGender')
    if (storedGender) {
      setSelected(Number(storedGender));
    }
  }, [])

  return (
    <Container>
      <Row>
        <section className='flex flex-row gap-3 items-center'>
          <h1 className='text-stone-500 uppercase font-monts select-none'> Gêneros </h1>
          <div className='h-[0.5px] w-[9rem] bg-stone-500'></div>
        </section>

        <section className='mt-2'>
          <article>
            {gendersList.map((gender, index) => (
              <ListGroup>
                <button onClick={() => selectGender(gender.id, index)} key={index}>
                  <Link to={`/${type}/${gender.name}/${gender.id}`}>
                    <ListGroup.Item key={gender.id} className={selected === index ? "flex flex-row mb-2 items-center justify-between bg-red-300 border-0 hover:bg-red-300" : 'flex flex-row mb-2 items-center justify-between bg-red-500 border-0 hover:bg-red-300'}>
                      <h3 className='text-stone-50 uppercase font-monts select-none'>
                        {gender.name}
                      </h3>
                    </ListGroup.Item>
                  </Link>
                </button>
              </ListGroup>
            ))}
          </article>
        </section>
      </Row>
    </Container>
  )
}

export default Categories