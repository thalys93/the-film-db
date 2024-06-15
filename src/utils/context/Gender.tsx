import React from "react";

export const SelectedGenderContext = React.createContext({
    selectedFilmGender: 0,
    setSelectedFilmGender: (gender: number) => { },
    selectedSeriesGender: 0,
    setSelectedSeriesGender: (gender: number) => { },
});

export function SelectedGenderProvider({ children }) {
    const [selectedFilmGender, setSelectedFilmGender] = React.useState<number>(0)
    const [selectedSeriesGender, setSelectedSeriesGender] = React.useState<number>(0)

    return (
        <SelectedGenderContext.Provider value={{
            selectedFilmGender,
            setSelectedFilmGender,
            selectedSeriesGender,
            setSelectedSeriesGender
        }}>
            {children}
        </SelectedGenderContext.Provider>
    )
}