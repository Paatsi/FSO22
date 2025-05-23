const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('Error:'))
    return (<div className="error">{message.substring(7)}</div>)

  return <div className="blogStyle">{message}</div>
}

export default Notification