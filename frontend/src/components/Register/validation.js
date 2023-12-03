export function validation(userData) {
    const regexUsername =  /^[a-zA-Z0-9_-]+$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    const errors = {}
    
    if(userData.username ==='') errors.username = "Username can't be empty"
    if(!regexUsername.test(userData.username)) errors.username = "Username must only contain alphanumeric, underscore, and hyphen characters"
    if(userData.username.length < 6 || userData.username.length > 14) errors.username = "Username must have between 6 and 14 characters"

    if (!regexPassword.test(userData.password)) errors.password = "Password must have at least one special character, uppercase and lowercase letter"
    if (userData.password.length < 6 || userData.password.length > 10) errors.password = "Password must have between 6 and 14 characters"

    if (!regexPassword.test(userData.repeatPassword)) errors.repeatPassword = "Password must have at least one special character, uppercase and lowercase letter"
    if (userData.password.length < 6 || userData.password.length > 10) errors.password = "Password must have between 6 and 14 characters"
    if(userData.password !== userData.repeatPassword) errors.repeatPassword = "Passwords are not equal"
    return errors
}