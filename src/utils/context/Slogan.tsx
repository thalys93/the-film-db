import React from 'react'
import { slogans, slogansInterface } from '../data/slogans'



interface SloganProviderProps {
    children: React.ReactNode
}

const SloganContext = React.createContext({
    dynamicSlogan: {} as slogansInterface,
    setDynamicSlogan: ({} as React.Dispatch<React.SetStateAction<slogansInterface>>),
})

const SloganProvider: React.FC<SloganProviderProps> = ({ children }) => {
    const [dynamicSlogan, setDynamicSlogan] = React.useState<slogansInterface>({} as slogansInterface)

    const checkDay = () => {
        const date = new Date()
        date.getDay()
        const dayName = date.toLocaleString('pt-BR', { weekday: 'long' })
        const slogan = slogans.find((slogan: slogansInterface) => slogan.day.toLocaleLowerCase() === dayName)
        if (slogan) {
            setDynamicSlogan({
                id: slogan.id,
                slogan: slogan.slogan,
                shortdescription: slogan.shortdescription,
                day: slogan.day,
                sloganImage: slogan.sloganImage,
                sloganGradient: {
                    backgroundColor: slogan.sloganGradient.backgroundColor,
                    background: slogan.sloganGradient.background
                },
            })

            const body = document.body
            body.style.background = dynamicSlogan?.sloganGradient?.backgroundColor
            body.style.background = dynamicSlogan?.sloganGradient?.background
        }
    }

    React.useEffect(() => {
        checkDay()
    }, [])

    React.useEffect(() => {
        if (dynamicSlogan.sloganGradient) {            
            document.body.style.backgroundColor = dynamicSlogan.sloganGradient.backgroundColor
            document.body.style.background = dynamicSlogan.sloganGradient.background
        }
    }, [dynamicSlogan])

    return (
        <SloganContext.Provider value={{ dynamicSlogan, setDynamicSlogan }}>
            {children}
        </SloganContext.Provider>
    )
}



export { SloganContext, SloganProvider }