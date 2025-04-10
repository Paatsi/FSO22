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

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		if (content.length < 5) {
			console.log('Anecdote content must be at least 5 characters long')
			event.target.anecdote.value = ''
			return
		}
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
