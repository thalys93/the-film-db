
export interface billingProps {
    id: number;
    name: string;
    price: number;
    description: string;
    features: string[];
}

export const billingList: billingProps[] = [
    {
        id: 1,
        name: 'Plano Básico',
        price: 9.99,
        description: 'Plano básico para quem deseja assistir filmes e séries sem limites.',
        features: [
            'Filmes e Séries Ilimitados',
            'Qualidade HD',
            'Suporte 24/7',
            'Cancelamento a qualquer momento'
        ]         
    },
    {
        id: 2, 
        name: 'Plano Padrão',
        price: 14.99,
        description: 'Plano padrão para quem deseja assistir filmes e séries sem limites.',
        features: [
            'Filmes e Séries Ilimitados',
            'Qualidade HD e Ultra HD',
            'Suporte 24/7',
            'Cancelamento a qualquer momento'
        ]        
    },
    {
        id: 3,
        name: 'Plano Premium',
        price: 19.99,
        description: 'Plano premium para quem deseja assistir filmes e séries sem limites.',
        features: [
            'Filmes e Séries Ilimitados ',
            'Qualidade HD e Ultra HD',
            'Sem Anúncios ',                        
            'Cancelamento a qualquer momento'
        ]        
    }
]