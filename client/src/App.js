import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Router from './routes/Router'

import { GlobalProvider } from './context/GlobalState'

const App = () => {
    
    return (
        <GlobalProvider>
            <BrowserRouter>
                <Router/>
                <Toaster/>
            </BrowserRouter>
        </GlobalProvider>
    )
}

export default App