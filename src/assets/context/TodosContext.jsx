import React, { createContext, useContext, useEffect, useState } from 'react'

export const TodosContext = createContext()
const mockTodo = [
    {
        id: 1,
        name: "Mock todo",
        date: new Date().toISOString(),
        status: false
    }
]


export function TodosProvider({ children }) {
    const [todos, setTodos] = useState(() => {
        return JSON.parse(localStorage.getItem("todos")) || mockTodo
    })
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
        setSearchInput("")
    }, [todos])

    return (
        <TodosContext.Provider value={{ todos, setTodos,searchInput, setSearchInput }}>
            {children}
        </TodosContext.Provider>
    )
}

export const getTodo = () => {
    return useContext(TodosContext)
}