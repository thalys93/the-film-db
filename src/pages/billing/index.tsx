import { Container, Row } from 'react-bootstrap'
import { billingList, billingProps } from '../../utils/api/billing'
import BillingCard from '../../components/pricingCard'
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import NavigationBar from '../../components/navbar'

function Billing() {
  return (
    <>
      <Parallax>
        <NavigationBar />
        <Container className="mb-3">

          <Row>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image={`/img/parallax6.jpg`} speed={-30} className='opacity-20 ' />
            </section>

            <section className='flex flex-row gap-3 items-center m-5'>
              <h1 className='text-stone-200 lg:text-stone-500  uppercase font-monts select-none'> Preços e Assinaturas </h1>
              <div className='lg:h-[0.5px] lg:w-[9rem] bg-stone-500'></div>
            </section>
          </Row>

          <Row>
            <section className='flex flex-col lg:flex-row gap-3 items-center justify-center flex-nowrap mt-[1rem]'>
              {billingList.map((bil: billingProps) => (
                <div key={bil.id}>
                  <BillingCard bill={bil} />
                </div>
              ))}
            </section>
          </Row>

          <Row>
            <footer className='flex justify-center items-center mt-[7rem]'>
              <span className='text-stone-400 select-none font-monts text-center'>
                Todos os Planos possuem 7 dias grátis para teste.
              </span>
            </footer>
          </Row>
        </Container>
      </Parallax>
    </>
  )
}

export default Billing