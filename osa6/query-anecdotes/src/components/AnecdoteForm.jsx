import React from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		}
	})

	const getId = () => (100000 * Math.random()).toFixed(0)

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={addAnecdote}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
