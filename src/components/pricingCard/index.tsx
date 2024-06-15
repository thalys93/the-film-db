import { billingProps } from '../../utils/api/billing'
import { Card } from 'react-bootstrap'
import { FilmReel, FilmSlate, Popcorn } from '@phosphor-icons/react'

function BillingCard({ bill }: { bill: billingProps }) {
    const formatBills = (billing: string) => {
        switch (billing) {
            case 'Plano Básico':
                return 'bg-stone-900 bg-opacity-80 border-red-400 hover:bg-stone-800 '
            case 'Plano Padrão':
                return 'bg-stone-800 bg-opacity-80 border-yellow-400 hover:bg-stone-700'
            case 'Plano Premium':
                return 'bg-stone-700 bg-opacity-80 border-sky-400 hover:bg-stone-600'
            default:
                return 'bg-stone-900'
        }
    }

    const iconTypes = (billing: string) => {
        switch (billing) {
            case 'Plano Básico':
                return <Popcorn size={50} className='text-yellow-500 shadow' weight='duotone'/>
            case 'Plano Padrão':
                return <FilmSlate size={50} className='text-red-400 shadow' weight='duotone' />
            case 'Plano Premium':
                return <FilmReel size={50} className='text-sky-400 shadow' weight='duotone' />
            default:
                return null
        }
    }


    return (
        <Card className={`${formatBills(bill.name)} rounded w-[16rem] h-[27rem] shadow-lg`}>
            <Card.Header className='flex justify-center items-center h-[6rem]'>
                {iconTypes(bill.name)}
            </Card.Header>
            <Card.Body className='text-stone-50'>
                <Card.Title className='font-monts underline-offset-4 select-none'>{bill.name}</Card.Title>
                <Card.Text className='text-stone-200 mb-3 select-none'>{bill.description}</Card.Text>
                <section className='select-none'>
                    <Card.Title className='font-monts underline-offset-4'> Funcionalidades </Card.Title>
                    <Card.Text className='text-stone-400 hover:text-yellow-300'>• {bill.features[1]}</Card.Text>
                    <Card.Text className='text-stone-400 hover:text-yellow-300'>• {bill.features[2]}</Card.Text>
                    <Card.Text className='text-stone-400 hover:text-yellow-300'>• {bill.features[3]}</Card.Text>                    
                </section>                
            </Card.Body>
            <Card.Footer className='flex justify-evenly items-center h-[3rem] pt-3 pb-3'>
                <button className='p-1 border-red-500 border-[1px] rounded text-stone-50 hover:rounded-none hover:border-red-300 font-monts uppercase text-sm'>Quero Assinar</button>
                <span className='text-stone-50 font-monts select-none'> R$ {bill.price.toFixed(2)} </span>
            </Card.Footer>

        </Card>
    )
}

export default BillingCard