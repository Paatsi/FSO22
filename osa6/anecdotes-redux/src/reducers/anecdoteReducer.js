import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteAnecdote = (id) => {
	return async (dispatch, getState) => {
		const updatedAnecdote = await anecdoteService.updateVote(id)
		const anecdotes = getState().anecdotes

		const newAnecdotes = anecdotes.map((a) =>
			a.id !== updatedAnecdote.id ? a : updatedAnecdote
		)
		dispatch(setAnecdotes(newAnecdotes))
	}
}

export default anecdoteSlice.reducer
