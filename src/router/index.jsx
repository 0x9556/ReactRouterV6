import { createBrowserRouter } from 'react-router-dom'
import Root from '../pages/root'

import ErrorPage from '../pages/error-page'
import Contact from '../components/contact'
import Edit from '../components/edit'

import { loader as contactLoader } from '../components/contact'
import { action as editAction } from '../components/edit'
import {
    loader as rootLoader,
    action as rootAction,
} from '../components/root'

const config = [
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader
            },
            {
                path: "contacts/:contactId/edit",
                element: <Edit />,
                loader: contactLoader,
                action: editAction
            }
        ]
    },
    {

    }
]


const router = createBrowserRouter(config)

export default router