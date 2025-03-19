import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		if (filter === '') {
			return anecdotes
		} else {
			return anecdotes.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(filter.toLowerCase())
			)
		}
	})
	const dispatch = useDispatch()
	
	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote.id))
		dispatch(createNotification(`you voted '${anecdote.content}'`, 10))
	}

	return (
		<div>
			{[...anecdotes]
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote)}>
								vote
							</button>
						</div>
					</div>
				))}
		</div>
	)
}

export default AnecdoteList
