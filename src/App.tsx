import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Quote from './components/Quote'

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className='w-screen min-h-screen grid place-items-center bg-[url(./assets/mainBackground.png)] bg-no-repeat bg-cover bg-bottom-right'>
        <Quote />
      </main>
    </QueryClientProvider>
  )
}

export default App
