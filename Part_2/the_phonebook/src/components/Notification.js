const Notification = ({ message, status}) => {
    if (message === ''){
        return null
    }
    if (status === 'success'){
        return (
            <div className="success_notification">
                {message}
            </div>
        )
    }

    return (
        <div className="error_notification">
            {message}
        </div>
    )
}

export default Notification