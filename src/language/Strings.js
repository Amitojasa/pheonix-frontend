import { fr } from './fr'
import { en } from './en'
export const getString = (stringName, language) => {

    if (language == 'fr') {

        return fr[stringName]

    } else {

        return en[stringName]


    }



}