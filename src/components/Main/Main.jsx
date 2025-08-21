import { useState } from 'react'
import { getTodo } from '../../assets/context/TodosContext'
import RenderTodos from '../../utils/RenderTodos'

function Main() {

    const { todos, setTodos } = getTodo()
    const [filter, setFilter] = useState("all")

    function ClearCoplietedTodo(target) {
        if (target) {
            setTodos(
                todos.filter(todo => !todo.status)
            )
        }else{
            setTodos([])
        }
    }

    return (
        <main className='flex flex-col gap-6'>
            <div className='container flex justify-between'>
                <div className="buttons flex gap-x-2.5">
                    <button onClick={() => setFilter("all")} className='btn-group'>Barchasi</button>
                    <button onClick={() => setFilter("active")} className='btn-group'>Faol</button>
                    <button onClick={() => setFilter("complieted")} className='btn-group'>Bajarilgan</button>
                </div>
                <p>Qolgan : {todos.length || 0} <span></span></p>
            </div>
            <div className="container rounded-2xl shadow-[-1px_-1px_5px_rgba(1,1,1,0.5)]">
                <RenderTodos filter={filter} />
            </div>
            <div className='container flex gap-7'>
                <button onClick={() => ClearCoplietedTodo(true)} className='btn-group' disabled={!todos.length || todos.every(todo => !todo.status)}>Bajarilganlarni tozalash</button>
                <button onClick={() => ClearCoplietedTodo(false)} className='btn-group' disabled={!todos.length}>Hammasini o'chirish</button>
            </div>
        </main>
    )
}

export default Main