import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BillingCard from '../../components/pricingCard'
import { billingList, billingProps } from '../../utils/api/billing'
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'
import { SloganContext } from '../../utils/context/Slogan'

function Home() {  
  const { dynamicSlogan} = React.useContext(SloganContext)
  function handleGoToPricing() {
    let section = document.querySelector('#pricing');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  return (
    <Container fluid >
      <Row className='ml-[5%] lg:ml-[12%] lg:mt-[5%]'>
        <Col sm>
          <section className='flex flex-col gap-5 items-start justify-start mt-[5rem] lg:mt-[10rem]'>
            <article className='select-none'>
              <h1 className='text-stone-50 text-4xl w-[50%]'>{dynamicSlogan.slogan}</h1>
            </article>

            <article className='flex flex-row gap-4 items-center justify-center'>
              <a href='https://github.com/thalys93/the-film-db/tree/main' target='_blank' rel='noopener'> {/* todo: mudar o link do github */}
                <button style={{ backgroundColor: dynamicSlogan?.sloganGradient?.background }} className='bg-red-500 text-stone-50 p-2 w-[10rem] items-center justify-center hover:bg-red-300 transition-all'>
                  <span className='uppercase '>
                    Saiba Mais
                  </span>
                </button>
              </a>

              <div className='h-[3rem] w-[0.5px] bg-stone-50 select-none'></div>

              <button onClick={() => handleGoToPricing()} className='w-[5rem] items-start justify-start'>
                <span className='text-gray-50 text-sm text-left hover:border-red-300 hover:text-red-300 transition-all uppercase'>
                  Planos e Assinatura
                </span>
              </button>
            </article>
          </section>
        </Col>

        <Col sm>
          <img src={dynamicSlogan.sloganImage} className='bg-blend-lighten mix-blend-lighten mt-5 h-[30rem] object-cover rounded-lg opacity-50' />
        </Col>
      </Row>

      <Row className='mt-[18%]' id='pricing'>
        <Parallax className='pt-4 pb-5'>
          <ParallaxBanner className='rounded-lg'>
            <ParallaxBannerLayer image={`/img/parallax5.jpg`} speed={-10} className='opacity-10 mix-blend-color-dodge' />
            <section className='flex flex-col justify-center items-center pt-3 pb-3'>
              <article className='flex justify-center items-center'>
                <h1 className='text-3xl text-stone-50 uppercase'> Nossos Planos </h1>
              </article>

              <article className='flex flex-col lg:flex-row gap-3 items-center justify-center flex-nowrap mt-[5rem]'>
                {billingList.map((bil: billingProps) => (
                  <div key={bil.id}>
                    <BillingCard bill={bil} />
                    <div className='flex flex-row justify-between items-center ml-6 mt-3'>
                      <span className='text-stone-50 text-md font-robtMono uppercase'>{bil.name.slice(5, 20)}</span>
                      <span className='text-stone-50 text-md font-robtMono'>R$ {bil.price}</span>
                    </div>
                  </div>
                ))}
              </article>
              <button className='bg-red-500 p-3 w-[15rem] items-center justify-center mt-10 rounded-sm shadow-lg transition-all hover:bg-red-300 z-50'>
                <span className='text-xl font-robtMono text-stone-50 transition-all uppercase'> Quero Assinar</span>
              </button>

              <span className='text-stone-600 select-none font-robtMono text-center mt-4 uppercase font-bold opacity-50'>Todos os planos possuem 7 dias gratuítos para teste</span>
            </section>
          </ParallaxBanner>
        </Parallax>
      </Row>
    </Container>
  )
}

export default Home