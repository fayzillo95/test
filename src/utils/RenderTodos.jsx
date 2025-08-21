
import React, { useState } from 'react'
import { getTodo } from '../assets/context/TodosContext'

function getDateString(data) {
    const result = new Date(data).toISOString()
    const date = new Date(data)
    const dateDDMMYYY = date.toISOString().split("T")[0].split("-").reverse().join("/")
    const time = date.toLocaleTimeString().replace("AM","PM")
    return dateDDMMYYY + ",", time
}


function RenderTodos({ filter }) {

    const { todos, setTodos,searchInput, setSearchInput } = getTodo()
    const [editInput,setEditInput] = useState("")
    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case "all":
                return true;
                break;
            case "active":
                return !todo.status
                break;
            case "complieted":
                return todo.status
                break;
            default:
                break;
        }
    }).filter((todo) => todo.name.toLowerCase().includes(searchInput.trim().toLowerCase()))
    
    function updateTodo(id) {
        console.log(id)
        setTodos(
            todos.map((todo) => {
                return todo.id === id ? { ...todo, status: !todo.status } : todo
            })
        )
    }
    function deleteTodo(id){
        setTodos(() => {
            return todos.filter(todo => todo.id !== +id)
        })
    }
    function editTodoById(id){
        setTodos(
            todos.map(todo => {
                return +id === todo.id ? {...todo, name : editInput} : todo
            })
        )
        setEditInput("")
    }

    return (
        <ul className={`min-h-[50px] max-h-[200px] flex flex-col ${todos.length > 4 ? "overflow-y-scroll" : ""}`}>
            {
                filteredTodos.length ? 
                filteredTodos.map(((todo, index) => {
                    return (
                        <li key={`todo_item_${todo.id}`} className='todo-li flex gap-x-6 items-center rounded-2xl px-6'>
                            <div className="flex w-full justify-left gap-x-4">
                                <input onChange={(e) => updateTodo(todo.id)} className='size-[26px] my-auto' type="checkbox" name="" checked={todo.status} />
                                <div className="todo">
                                    <h2>{todo.name}</h2>
                                    <p>{getDateString(todo.date)}</p>
                                </div>
                            </div>
                            <div className="controller-box hidden">
                                <input onChange={(e) => setEditInput(e.target.value)} onKeyDown={(e) => {
                                    if(e.key === "Enter"){
                                        editTodoById(todo.id)
                                    }
                                }}  type="text" id={`editBtn_${todo.id}`} value={editInput} className=' border-2 rounded-2xl py-1.5 px-1.5' title="Nomni kiriting va enterni bosing" placeholder='Nomini Kiriting ...' />
                                <button onClick={(e) => deleteTodo(todo.id)} className='btn-group !text-red-900'><i className="fa fa-trash" aria-hidden="true"></i> O'chirish</button>
                            </div>
                        </li>
                    )
                })) : <h1 className='w-1/3 text-3xl text-amber-950 text-center self-center my-auto'>Todo qo'shing</h1>
            }
        </ul>
    )
}

export default RenderTodos