const apiURL = 'http://localhost:3000/accounts'

export const registerAccount = async( formData ) => {

    const inputEmail = formData.get('email')
    const user = await getUserByEmail(inputEmail)
    
    if( user ){
        return { error: true, message: 'El email ya esta registrado'}
    }

    const data = new URLSearchParams( formData )
    let response = await fetch(apiURL, {
        method: 'POST',
        body: data,
    })
    if(response.ok) {
        return { error: false, message: 'Registro completado con exito'}
    }    
}

export const loginAccount = async( formData ) => {

    const inputEmail = formData.get('email')
    const inputPassword = formData.get('password')    

    const user = await getUserByEmail(inputEmail)

    if( !user ) {
        return { error: true, message: 'El usuario no existe'}
    }

    if( user.password !== inputPassword ) {
        return { error: true, message: 'La contrasena es incorrecta'}
    }

    return { error: false, message: '', id: user.id}
}

export const changeAccountPassword = async( user ) => {
    
    const url = `${ apiURL }/${user.id}`

    const response = await fetch(url, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    if( response.ok ) {
        return { 
            error: false,
            message: `Contrasena actualizada correctamente del usuario: ${user.complete_name }`
        }
    }
}

export const getUserByEmail = async( email ) => {

    const queryURL = `${ apiURL }?email=${ email }&_limit=1`
    const response = await fetch(queryURL)
    const result = await response.json()

    const [ obtainedUser ] = result

    return obtainedUser

}