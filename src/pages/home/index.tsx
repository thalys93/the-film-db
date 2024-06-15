import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import { slogans, slogansInterface } from '../../utils/data/slogans'
import NavigationBar from '../../components/navbar'
import { Link } from 'react-router-dom'

function Home() {
  const [dynamicSlogan, setDynamicSlogan] = React.useState<string>('')
  const [dynamicDescription, setDynamicDescription] = React.useState<string>('')
  const [actualDay, setActualDay] = React.useState<string>('')
  const [dayNumber, setDayNumber] = React.useState<number>(1)

  const checkDay = () => {
    const date = new Date()
    date.getDay()
    const dayName = date.toLocaleString('pt-BR', { weekday: 'long' })
    const slogan = slogans.find((slogan: slogansInterface) => slogan.day.toLocaleLowerCase() === dayName)
    if (slogan) {
      setDynamicSlogan(slogan.slogan)
      setDynamicDescription(slogan.shortdescription)
      setActualDay(slogan.day)
    }

    switch (actualDay) {
      case 'Segunda-feira':
        setDayNumber(1)
        break
      case 'Terça-feira':
        setDayNumber(2)
        break
      case 'Quarta-feira':
        setDayNumber(3)
        break
      case 'Quinta-feira':
        setDayNumber(4)
        break
      case 'Sexta-feira':
        setDayNumber(5)
        break
      case 'Sábado':
        setDayNumber(6)
        break
      case 'Domingo':
        setDayNumber(7)
        break
      default:
        setDayNumber(1)
        break
    }
  }

  useEffect(() => {
    checkDay()
  }, [dynamicSlogan])


  return (
    <>
      <Parallax>
        <NavigationBar />
        <Container>
          <Row className='m-2 lg:m-5 lg:pt-2'>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image={`/img/parallax${dayNumber}.jpg`} speed={-30} className='opacity-20 ' />
            </section>

            <section className='flex flex-col gap-5 items-start justify-start mt-[5rem] lg:mt-[10rem]'>
              <article className='flex flex-row gap-3 items-center'>
                <h3 className='text-stone-500 text-xl uppercase select-none'>Bem Vindo</h3>
                <div className='h-[0.5px] w-[9rem] bg-stone-500'></div>
              </article>

              <article className='select-none'>
                <h1 className='text-stone-50 text-3xl'>{dynamicSlogan}</h1>
                <span className='text-stone-300 text-lg'>{dynamicDescription}</span>
              </article>

              <article className='flex flex-row gap-4 items-center justify-center'>
                <Link to="/pricing">
                  <button className='border-red-500 border-[1px] w-[10rem] text-red-500 p-3 items-center justify-center hover:border-red-300 hover:text-red-300 transition-all'>
                    <span>
                      Preços
                    </span>
                  </button>
                </Link>

                <Link to="/about">
                  <button className='bg-red-500 text-stone-50 p-3 w-[10rem] items-center justify-center hover:bg-red-300 transition-all'>
                    <span>
                      Saiba Mais
                    </span>
                  </button>
                </Link>
              </article>
            </section>

          </Row>
        </Container>
      </Parallax>
    </>
  )
}

export default Home