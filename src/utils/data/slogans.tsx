export interface slogansInterface {
    id: number;
    slogan: string;
    shortdescription: string;
    day: string
    sloganImage?: string
    sloganGradient?: {
        backgroundColor: string // todo: tbm pode servir para btn
        background: string
    }
}

export const slogans: slogansInterface[] = [
    {
        id: 1,
        slogan: "Comece a semana com a magia do cinema!",
        shortdescription: "Inicie sua semana imerso em histórias mágicas.",
        day: "Segunda-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206404/the-film-db/parallaxes/parallax6_fdpm4q.jpg",
        sloganGradient: {
            backgroundColor: "rgba(49,6,23,1)",
            background: "linear-gradient(335deg, rgba(49,6,23,1) 29%, rgba(8,2,25,1) 100%)"
        }
    },
    {
        id: 2,
        slogan: "Transforme sua terça em um blockbuster!",
        shortdescription: "Dê um toque de sucesso à sua terça com grandes filmes.",
        day: "Terça-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax8_evhw0t.jpg",
        sloganGradient: {
            backgroundColor: "rgb(10,29,6)",
            background: "linear-gradient(335deg, rgba(10,29,6,1) 29%, rgba(8,2,25,1) 100%);"
        }
    },
    {
        id: 3,
        slogan: "No meio da semana, um filme é a melhor companhia.",
        shortdescription: "A quarta-feira perfeita pede um bom filme.",
        day: "Quarta-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax1_sucavw.jpg",
        sloganGradient: {
            backgroundColor: "rgb(13,29,60)",
            background: "linear-gradient(335deg, rgba(13,29,60,1) 29%, rgba(8,2,25,1) 100%);"
        }
    },
    {
        id: 4,
        slogan: "Quinta de emoções cinematográficas!",
        shortdescription: "Prepare-se para uma quinta cheia de emoções na tela.",
        day: "Quinta-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax3_wxdv1x.jpg",
        sloganGradient: {
            backgroundColor: "rgb(33,7,7,1)",
            background: "linear-gradient(335deg, rgba(33,7,7,1) 29%, rgba(10,2,25,1) 100%);"
        }
    },
    {
        id: 5,
        slogan: "Sextou com pipoca e ação!",
        shortdescription: "Sexta é dia de muita ação e diversão com pipoca.",
        day: "Sexta-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206403/the-film-db/parallaxes/parallax4_fhkl9k.jpg",
        sloganGradient: {
            backgroundColor: "rgb(13,29,60)",
            background: "linear-gradient(335deg, rgba(51,31,0,1) 29%, rgba(10,2,25,1) 100%);"
        }
    },
    {
        id: 6,
        slogan: "Sábado de maratona: sua tela, suas regras.",
        shortdescription: "Aproveite o sábado com uma maratona de filmes à sua escolha.",
        day: "Sábado",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax2_scvivz.jpg",
        sloganGradient: {
            backgroundColor: "rgb(33,7,7,1)",
            background: "linear-gradient(335deg, rgba(33,7,7,1) 29%, rgba(10,2,25,1) 100%);"
        }
    },
    {
        id: 7,
        slogan: "Domingo de clássicos: reviva histórias inesquecíveis.",
        shortdescription: "Domingo é dia de assistir aos clássicos e reviver emoções.",
        day: "Domingo",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax5_s3pfom.jpg",
        sloganGradient: {
            backgroundColor: "rgb(13,29,60)",
            background: "linear-gradient(335deg, rgba(13,29,60,1) 29%, rgba(8,2,25,1) 100%);"
        }
    },
    {
        id: 8,
        slogan: "Segunda de aventuras: explore novos mundos no cinema.",
        shortdescription: "Comece a semana explorando novas aventuras cinematográficas.",
        day: "Segunda-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax7_flnlxl.jpg",
        sloganGradient: {
            backgroundColor: "rgb(13,29,60)",
            background: "linear-gradient(335deg, rgba(13,29,60,1) 29%, rgba(8,2,25,1) 100%);"
        }
    },
    {
        id: 9,
        slogan: "Terça de terror: arrepios na tela!",
        shortdescription: "Deixe a terça-feira mais assustadora com um bom filme de terror.",
        day: "Terça-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax8_evhw0t.jpg",
        sloganGradient: {
            backgroundColor: "rgb(10,29,6)",
            background: "linear-gradient(335deg, rgba(10,29,6,1) 29%, rgba(8,2,25,1) 100%);"
        }
    },
    {
        id: 10,
        slogan: "Quarta de comédia: ria alto com os melhores filmes.",
        shortdescription: "Ria sem parar com as comédias imperdíveis desta quarta.",
        day: "Quarta-feira",
        sloganImage: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1729206402/the-film-db/parallaxes/parallax1_sucavw.jpg",
        sloganGradient: {
            backgroundColor: "rgb(13,29,60)",
            background: "linear-gradient(335deg, rgba(13,29,60,1) 29%, rgba(8,2,25,1) 100%);"
        }
    },
]