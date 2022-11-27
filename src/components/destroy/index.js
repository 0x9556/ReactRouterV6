import { redirect } from 'react-router-dom'
import { deleteContact } from '../../utils/contacts'

export const action = async ({ params }) => {
    
    await deleteContact(params.contactId)
    return redirect("/")
}