const recipientEmail = (users,userLoggedIn)=>(
    users.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]
)

export default recipientEmail;