
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
        description: 'Básico para quem deseja assistir filmes sem limites',
        features: [
            'Qualidade HD',
            'Sem Anuncios',
            'Suporte Semanal',
            "Catálogo Imenso de Filmes"
        ]
    },
    {
        id: 2,
        name: 'Plano Padrão',
        price: 14.99,
        description: 'Padrão para quem deseja assistir filmes e séries sem limites',
        features: [
            'Qualidade HD e Full-HD',
            'Sem Anuncios',
            'Suporte Semanal',
            'Catálogo de Filmes e Séries'
        ]
    },
    {
        id: 3,
        name: 'Plano Premium',
        price: 19.99,
        description: 'Premium para aqueles que levam filmes e séries a sério',
        features: [
            'Qualidade HD e Full-HD e 4K',
            'Sem Anuncios',
            'Suporte 24/7',
            'Catálogo de Filmes e Séries',
            'Extra e Bloopers de Filmes'
        ]
    }
]