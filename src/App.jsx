import { getTodo } from './assets/context/TodosContext'
import Header from './components/Header/Header'
import Main from './components/Main/Main'


function App() {
  const {todos,setTodos} = getTodo()

  return (  
    <div className='w-full flex flex-col gap-y-10'>
      <Header />
      <Main />
    </div>
  )
}
 
export default App
