import { validEmail, validName } from "./regex.js"

export const validateForm = ( formEntries ) => {

    for (const [key, value] of formEntries) {
        switch (key) {
            case 'email':
                if( !validEmail.test(value) ) {
                    return { isValid: false, messgae:  'Email no valido'}
                }
                break;
            
            case 'complete_name':
                if( !validName.test(value) ) {
                    return { isValid: false, messgae:  'Nombre no valido (Solo letras)'}
                }
                break;
        
            default:
                if( value.trim().length <= 1 ) {
                    return { isValid: false, messgae: 'Todos los campos son obligatorios'}
                }
                break;
        }  
    }
    return { isValid: true, messgae: ''}
}
