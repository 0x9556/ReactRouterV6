import { createBrowserRouter } from 'react-router-dom'
import Root from '../components/root'

import ErrorPage from '../components/error-page'
import Contact from '../components/contact'
import Edit from '../components/edit'
import Default from '../components/default'

import { action as editAction } from '../components/edit'
import { loader as contactLoader } from '../components/contact'
import { loader as rootLoader, action as rootAction, } from '../components/root'
import { action as destroyAction } from '../components/destroy'

const config = [
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                index: true,
                element: <Default />
            },
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,

            },
            {
                path: "contacts/:contactId/edit",
                element: <Edit />,
                loader: contactLoader,
                action: editAction
            },
            {
                path: "contacts/:contactId/destroy",
                errorElement: <div>Oops! There was an error.</div>,
                action: destroyAction
            }
        ]
    },
    {

    }
]


const router = createBrowserRouter(config)

export default router