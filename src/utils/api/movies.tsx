import { API_URL, apiKey, apiToken } from "./the_movie_db"

export interface MoviesProps {
    adult?: boolean
    backdrop_path?: string
    genre_ids?: number[]
    id?: number
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    release_date?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number    
}

export interface MovieInt {
    adult?: boolean
    backdrop_path?: string
    belongs_to_collection?: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    },
    budget?: number
    genres?: GendersProps[]
    homepage?: string
    id?: number
    imdb_id?: string
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: {
        name: string
        id: number
        logo_path: string
        origin_country: string
    }[]
    production_countries?: {
        iso_3166_1: string
        name: string
    }[]
    release_date?: string
    revenue?: number
    runtime?: number
    spoken_languages?: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status?: string
    tagline?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
}

interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string;
}

interface LastEpisodeToAir {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: null | number;
    season_number: number;
    show_id: number;
    still_path: null | string;
}

interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: null | string;
    season_number: number;
    vote_average: number;
}

export interface Show {
    adult?: boolean;
    backdrop_path?: null | string;
    created_by?: CreatedBy[];
    episode_run_time?: number[];
    first_air_date?: string;
    genres?: any[];
    homepage?: string;
    id?: number;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: LastEpisodeToAir;
    name?: string;
    next_episode_to_air?: null | any;
    networks?: any[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: null | string;
    production_companies?: any[];
    production_countries?: any[];
    seasons?: Season[];
    spoken_languages?: any[];
    status?: string;
    tagline?: string;
    type?: string;
    vote_average?: number;
    vote_count?: number;
}

export interface SeriesProps {
    adult?: boolean
    backdrop_path?: string
    genre_ids?: number[]
    id?: number
    origin_country?: string[]
    original_language?: string
    original_name?: string
    popularity?: number
    poster_path?: string
    first_air_date?: string
    name?: string
    vote_average?: number
    vote_count?: number
}

export interface GendersProps {
    id: number
    name: string
}

export interface commonRequest {
    page: number
    results: MoviesProps[] | SeriesProps[]
    total_pages: number
    total_results: number
}

export const getBrasilianMovies = async (page?: number) => {
    try {
        return await API_URL.get(`discover/movie`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                include_adult: false,
                include_video: false,
                page: page ? page : 1 ,
                language: 'pt-BR',
                region: 'brasil',
                sort_by: 'popularity.desc'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (e) {
        return e
    }
}

export const getBrasilianMovie = async (id: number) => {
    try {
        return await API_URL.get(`movie/${id}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (error) {
        return error
    }
}

export const getBrasilianMoviesByGender = async (gender: number) => {
    try {
        return await API_URL.get(`discover/movie`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                include_adult: false,
                include_video: false,
                with_genres: gender,
                page: 1,
                language: 'pt-BR',
                region: 'brasil',
                sort_by: 'popularity.desc'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (e) {
        return e
    }
}


export const getFilmGenders = async () => {
    try {
        return await API_URL.get(`genre/movie/list`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            console.log(e)
            throw new Error("Falha ao buscar gêneros indicados")
        })
    } catch (e) {
        return e
    }
}

export const getBrasilianSerie = async (id: number) => {
    try {
        return await API_URL.get(`tv/${id}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (error) {
        return error
    }
}

export const getBrasilianSeries = async (page?: number) => {
    try {
        return await API_URL.get(`discover/tv`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                include_adult: false,                                
                include_null_first_air_dates: false,
                page: page ? page : 1,
                language: 'pt-BR',
                sort_by: 'popularity.desc'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (e) {
        return e
    }
}

export const getBrasilianSeriesByGender = async (gender: number) => {
    try {
        return await API_URL.get(`discover/tv`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                include_adult: false,
                with_genres: gender,
                include_null_first_air_dates: false,
                page: 1,
                language: 'pt-BR',
                sort_by: 'popularity.desc'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            throw new Error(e)
        })
    } catch (error) {
        return error
    }
}

export const getSeriesGenders = async () => {
    try {
        return await API_URL.get(`genre/tv/list`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            },
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        }).then((res) => {
            return res.data
        }).catch((e) => {
            console.log(e)
            throw new Error("Falha ao buscar gêneros indicados")
        })
    } catch (e) {
        return e
    }
}