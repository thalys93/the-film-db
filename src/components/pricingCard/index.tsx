import { billingProps } from '../../utils/api/billing'
import { Card } from 'react-bootstrap'
import { FilmReel, FilmSlate, Popcorn } from '@phosphor-icons/react'
import { SloganContext } from '../../utils/context/Slogan'
import React from 'react'

function BillingCard({ bill }: { bill: billingProps }) {

    const iconSize: number = 30

    function iconTypes(billing: string) {
        switch (billing) {
            case 'Plano Básico':
                return <Popcorn size={iconSize} style={{ color: dynamicSlogan.emphasisText }} className='text-yellow-500 shadow' weight='duotone' />
            case 'Plano Padrão':
                return <FilmSlate size={iconSize} style={{ color: dynamicSlogan.emphasisText }}  className='text-red-400 shadow' weight='duotone' />
            case 'Plano Premium':
                return <FilmReel size={iconSize} style={{ color: dynamicSlogan.emphasisText }}  className='text-sky-400 shadow' weight='duotone' />
            default:
                return null
        }
    }

    function truncateText(text: string, planType: string) {
        switch (planType) {
            case 'Plano Básico':
                let truncatedDescription = text.split(' ').slice(0, 6).join(' ')
                let truncatedBoldText = text.split(' ').slice(6, 10).join(' ')
                return {
                    description: truncatedDescription,
                    boldText: truncatedBoldText
                }

            case 'Plano Padrão':
                let truncatedBasicDesc = text.split(' ').slice(0, 7).join(' ')
                let truncatedBasicBold = text.split(' ').slice(7, 10).join(' ')
                return {
                    description: truncatedBasicDesc,
                    boldText: truncatedBasicBold
                }
            case 'Plano Premium':
                let truncatedPremiumDesc = text.split(' ').slice(0, 7).join(' ')
                let truncatedPremiumBold = text.split(' ').slice(7, 12).join(' ')
                return {
                    description: truncatedPremiumDesc,
                    boldText: truncatedPremiumBold
                }
        }
    }


    const { dynamicSlogan } = React.useContext(SloganContext)

    return (
        <Card className={`rounded w-[16rem] h-[23rem] shadow-sm bg-opacity-50 ${dynamicSlogan.sloganCSS}`}>
            <Card.Body className='text-stone-50'>
                <div className='flex flex-row gap-3 items-center mb-3 h-[7rem]'>
                    <Card.Text className='text-stone-400 hover:text-yellow-300'>{iconTypes(bill.name)}</Card.Text>
                    <Card.Text className='text-stone-200 select-none text-md font-robtMono uppercase'>
                        {truncateText(bill.description, bill.name).description} {''}
                        <b style={{ color: dynamicSlogan.emphasisText }} className='transition-all text-red-500 hover:text-red-300'>
                            {truncateText(bill.description, bill.name).boldText}
                        </b>
                    </Card.Text>
                </div>
                <section className='flex justify-center items-center mt-3 mb-3'>
                    <div className='w-[13rem] h-[0.5px] bg-stone-400'></div>
                </section>
                <section className='select-none'>
                    {bill?.features.map((feat: string) => (
                        <Card.Text className='text-stone-400 hover:text-yellow-300 uppercase font-robtMono text-left'>• {feat}</Card.Text>
                    ))}
                </section>
            </Card.Body>
        </Card>
    )
}

export default BillingCard