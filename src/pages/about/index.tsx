import { Accordion, Col, Container, Figure, Row } from 'react-bootstrap'
import { AccordionDataProps } from '../../utils/helpers/interfaces';
import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react';
import React from 'react';

function About() {
    let imgSize = { height: 370, width: 370 };
    const accordionData: AccordionDataProps[] = [
        {
            title: "O Projeto",
            key: 0,
            content: "The Film DB é uma plataforma prática e interativa desenvolvida para listar e explorar filmes e séries. Este projeto utiliza a API do The Movie DB para fornecer informações detalhadas sobre lançamentos, popularidade, gêneros, e sinopses. É uma ferramenta ideal para os amantes de cinema que buscam descobrir e organizar seus conteúdos favoritos."
        },
        {
            title: "Objetivo",
            key: 1,
            content: "O objetivo do The Film DB é oferecer uma interface amigável que permite aos usuários descobrir, pesquisar e acessar informações sobre filmes e séries. A plataforma é focada em usabilidade e eficiência, apresentando listas dinâmicas e categorizadas para facilitar a navegação e o acesso a conteúdos de entretenimento."
        },
        {
            title: "Tecnologias",
            key: 2,
            content: "O The Film DB foi desenvolvido com tecnologias modernas para garantir uma experiência de alta performance e acessibilidade. Utiliza React no frontend e se comunica com a API do The Movie DB para carregar dados de filmes e séries em tempo real, proporcionando uma experiência interativa e atualizada para os usuários."
        },
        {
            title: "API The Movie DB",
            key: 3,
            content: "A API do The Movie DB é uma das principais fontes de dados para o projeto. Ela fornece informações detalhadas sobre uma vasta coleção de filmes e séries, incluindo classificações, trailers, sinopses e muito mais. A API nos permite trazer conteúdo de qualidade e em constante atualização para a plataforma."
        },
        {
            title: "Equipe",
            key: 4,
            content: "O The Film DB foi desenvolvido por uma equipe única de um desenvolvedor , Você pode Ver Mais Detalhes dele Aqui:"
        }
    ]

    const [activeKey, setActiveKey] = React.useState(accordionData[0].title);

    return (
        <Container className='lg:h-screen'>
            <Row className='mt-[5rem]'>
                <Col sm>
                    <Figure>
                        <Figure.Image
                            height={imgSize.height}
                            width={imgSize.width}
                            src='/svg/about-us.svg' />

                        <Figure.Caption>
                            <h1 className='text-xl font-bold text-center text-stone-200 font-monts uppercase select-none lg:mb-0 mb-4'>Sobre nós</h1>
                        </Figure.Caption>
                    </Figure>
                </Col>

                <Col sm>
                    <Accordion defaultActiveKey={accordionData[0].title} activeKey={activeKey} onSelect={(key) => setActiveKey(key as string)} className='border-0' bsPrefix='_'>
                        {accordionData.map((acc, index) => (
                            <Accordion.Item eventKey={acc.title} key={index} className='border-0 rounded mb-4'>
                                <Accordion.Header
                                    className='text-stone-50 text-center bg-teal-500 p-3 border-0 font-monts uppercase'>
                                    <article className='flex justify-between items-center w-[100%]'>
                                        {acc.title}
                                        {acc.title === activeKey ?
                                            <ArrowCircleDown weight='fill' size={20} /> :
                                            <ArrowCircleUp weight='fill' size={20} />
                                        }
                                    </article>
                                </Accordion.Header>
                                <Accordion.Body className='text-stone-50 font-monts bg-slate-800 p-3 shadow-md'>
                                    {acc.content}

                                    {acc.title === "Equipe" && (
                                        <a href='https://portifolio-luis-thalys.web.app/home' target='_blank' rel='noopener noreferrer' className='ml-2 hover:text-stone-200 transition-all underline text-red-500 uppercase'>Portifólio</a>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}

export default About