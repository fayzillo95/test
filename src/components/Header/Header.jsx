import React, { useEffect, useState } from 'react'
import { getTodo } from '../../assets/context/TodosContext'

function Header() {
    const { todos, setTodos,searchInput, setSearchInput } = getTodo()
    const [addInput, setAddInput] = useState("")


    function addTodo(e) {
        if(e.key !== "Enter" && e.target.textContent !== "Qo'shish") return
        if (addInput.trim().length === 0) return
        const id = todos.reduce((max, todo) => todo.id > max ? todo.id : max, 0) + 1
        setTodos([...todos, {
            id,
            name: addInput,
            date: new Date().toISOString(),
            status: false
        }])
        setAddInput("")
        setSearchInput("")
    }

    function assignAllComplieted(){
        setTodos(todos.map(todo => {
            return {...todo , status : true}
        }))
    }

    function filteredTodo(e){
        if(e.key !== "Enter") return
        if(searchInput.trim().length === 0) return
    }
    
    return (
        <header className='flex flex-col gap-y-10'>
            <div className='container flex justify-between items-end'>
                <div className="logo">
                    <h1 className='text-4xl'>🧻 Todo List</h1>
                </div>
                <button onClick={assignAllComplieted} className='btn-group' disabled={todos.every(todo => todo.status)}>Barchasini bajarilgan qilish</button>
            </div>
            <div className="container flex justify-between h-14 space-x-5">
                <div className="add relative w-2/3 flex items-center">
                    <input onChange={(e) => {
                        setAddInput(e.target.value) 
                        setSearchInput("")
                        }} onKeyDown={(e) => addTodo(e)} value={addInput} id='addInput' type="text" />
                    <button onClick={(e) => addTodo(e)} id='addButton' className='btn-group'>Qo'shish</button>
                </div>
                <div className="search-box flex h-14 items-center w-1/3 relative">
                    <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} id='searchInput' type="text" />
                    <button className='btn-group' id='serachButton'>Qidirish</button>
                </div>
            </div>
        </header>
    )
}

export default Header