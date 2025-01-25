import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		clearNotification() {
			return ''
		}
	}
})

export const createNotification = (message, duration = 5000) => {
	return (dispatch) => {
		dispatch(setNotification(message))
		setTimeout(() => {
			dispatch(clearNotification())
		}, duration)
	}
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
