import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { TodosProvider } from './assets/context/TodosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < TodosProvider>
      <App /> 
    </TodosProvider>
  </StrictMode>,
)
