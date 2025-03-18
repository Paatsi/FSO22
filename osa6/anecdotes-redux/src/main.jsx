import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import anecdoteService from './services/anecdotes'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import App from './App'
import store from './store'

anecdoteService.getAll().then(anecdotes =>
	store.dispatch(setAnecdotes(anecdotes))
  )

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)
