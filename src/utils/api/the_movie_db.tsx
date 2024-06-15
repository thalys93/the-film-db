import axios from 'axios'

export const API_URL = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const apiKey = "5358f7036c712c76f31d963099d7afa8"
export const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzU4ZjcwMzZjNzEyYzc2ZjMxZDk2MzA5OWQ3YWZhOCIsInN1YiI6IjY2NmJhMDQzYzg4MzMxYjRjMTcyYzVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._u9anVv-PRuPYHCDgeKCr3CRswaal1XMnD6JjcScO5I"