import { registerAccount, loginAccount, getUserByEmail, changeAccountPassword } from './authFormActions.js'
import { validateForm } from './helpers.js'

const form = document.querySelector('form')
if( form ) {
    form.addEventListener( 'submit', event => submitForm(event) )
}

const submitForm = async(event) => {
    event.preventDefault()
    
    const formData = new FormData( form )
    const formEntries = formData.entries()

    const { isValid, messgae } = validateForm( formEntries )

    if( !isValid ) {
        return Swal.fire({
            title: 'Error',
            text: messgae,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
        }) 
    }

    if( form.id === 'signupForm' ) {
        handleSignupForm( formData )
    }

    if( form.id === 'loginForm' ) {
        handleLoginForm( formData )
    }

    if( form.id === 'chagePasswordForm') {
        handleChagePasswordForm( formData )
    }
}

const handleSignupForm = async( formData ) => {
    const { error, message } = await registerAccount( formData )

    if( error ) {
        return Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
        })
    }
    return Swal.fire({
        title: 'Completado!',
        text: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
    }).then(() => window.location = '/login')
}

const handleLoginForm = async( formData ) => {
    const { error, message } = await loginAccount( formData )

        if( error ) {
            return Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    return window.location = '/'
}

const handleChagePasswordForm = async( formData ) => {
    const inputEmail = formData.get('email')
    const inputPassword = formData.get('password')
    const inputConfimPasswowrd = formData.get('confirm_password')

    const user = await getUserByEmail( inputEmail )

    if( !user ) {
        return Swal.fire({
            title: 'Error',
            text: 'El usuario no existe',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    if( inputPassword !== inputConfimPasswowrd ){
        return Swal.fire({
            title: 'Error',
            text: 'Las contrasenas no coinciden',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    user.password = inputPassword

    const { error, message } = await changeAccountPassword( user )

    if ( !error ) {
        return Swal.fire({
            title: 'Completado',
            text: message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
        }).then(() => window.location = '/login')
    }
}