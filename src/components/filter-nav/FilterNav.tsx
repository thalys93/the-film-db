import React from 'react'
import { GendersProps } from '../../utils/api/movies'
import { Dropdown, FormControl, InputGroup, Nav } from 'react-bootstrap'
import { MagnifyingGlass, XCircle } from '@phosphor-icons/react'

interface FilterNavProps {
    type: string
    genders: GendersProps[]
    searchTerm: string
    onFilter: (genderId: number) => void
    onSearch: (searchTerm: string) => void
}

function FilterNav({ type, genders, searchTerm, onFilter, onSearch }: FilterNavProps) {
    const [GenderName, setGenderName] = React.useState<string>('')

    function filterAndSetGenderName(genderId: number) {
        onFilter(genderId)
        setGenderName(genders.find((gender) => gender.id === genderId).name)
    }

    function handleResetGenderName() {
        setGenderName('')
        onFilter(0)
    }

    switch (type) {
        case 'movies':
            return (
                <Nav className='gap-3 items-center'>
                    <Nav.Item>
                        <InputGroup>
                            <InputGroup.Text className='bg-stone-700 border-0'>
                                <button onClick={() => handleResetGenderName()}>
                                    <XCircle className='text-lg text-stone-50 transition-all hover:text-red-500' weight='duotone' />
                                </button>
                            </InputGroup.Text>
                            <Dropdown>
                                <Dropdown.Toggle className='bg-stone-700 border-0 hover:bg-red-500'>
                                    {GenderName ? GenderName : 'Gêneros'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {genders.map((gender, index) => (
                                        <Dropdown.Item key={index} onClick={() => filterAndSetGenderName(gender.id)}>
                                            {gender.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    </Nav.Item>

                    <Nav.Item className='animate__animated animate__fadeInRight'>
                        <InputGroup>
                            <InputGroup.Text className='bg-stone-700 border-0'>
                                <MagnifyingGlass className='text-lg text-stone-50' weight='duotone' />
                            </InputGroup.Text>
                            <FormControl
                                className='bg-stone-700 border-0 placeholder:text-stone-50 placeholder:font-monts text-stone-50 font-monts'
                                placeholder='Buscar filme'
                                value={searchTerm}
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </InputGroup>
                    </Nav.Item>
                </Nav>
            )
        case 'series':
            return (
                <Nav className='gap-3 items-center'>
                    <Nav.Item>
                        <InputGroup>
                            <InputGroup.Text className='bg-stone-700 border-0'>
                                <button onClick={() => handleResetGenderName()}>
                                    <XCircle className='text-lg text-stone-50 transition-all hover:text-red-500' weight='duotone' />
                                </button>
                            </InputGroup.Text>
                            <Dropdown>
                                <Dropdown.Toggle className='bg-stone-700 border-0 hover:bg-red-500'>
                                    {GenderName ? GenderName : 'Gêneros'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {genders.map((gender, index) => (
                                        <Dropdown.Item key={index} onClick={() => filterAndSetGenderName(gender.id)}>
                                            {gender.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    </Nav.Item>

                    <Nav.Item className='animate__animated animate__fadeInRight'>
                        <InputGroup>
                            <InputGroup.Text className='bg-stone-700 border-0'>
                                <MagnifyingGlass className='text-lg text-stone-50' weight='duotone' />
                            </InputGroup.Text>
                            <FormControl
                                className='bg-stone-700 border-0 placeholder:text-stone-50 placeholder:font-monts text-stone-50 font-monts'
                                placeholder='Buscar Serie'
                                value={searchTerm}
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </InputGroup>
                    </Nav.Item>
                </Nav>
            )
    }
}

export default FilterNav