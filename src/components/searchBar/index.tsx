import { MagnifyingGlass } from '@phosphor-icons/react'
import { Container, InputGroup } from 'react-bootstrap'
import React from 'react'

interface Search_BarProps {
    text?: string
    onSearch?: (searchTerm: string) => void
}

function Search_Bar({ ...props }: Search_BarProps) {
    const [searchTerm, setSearchTerm] = React.useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        props.onSearch?.(e.target.value)
    }

    return (
        <Container>
            <InputGroup className='mb-3 bg-slate-600 flex flex-row items-center justify-center' bsPrefix='0'>
                <InputGroup.Text className='bg-transparent border-0'>
                    <MagnifyingGlass className='text-stone-50 text-lg' />
                </InputGroup.Text>
                <input
                    type="text"
                    className='bg-slate-600 text-stone-50 placeholder:text-lg placeholder:text-stone-300 placeholder:font-monts w-screen border-0 p-3'
                    placeholder={props.text}
                    value={searchTerm}
                    onChange={handleInputChange} />
            </InputGroup>
        </Container>
    )
}

export default Search_Bar