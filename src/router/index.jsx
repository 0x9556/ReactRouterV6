import { createBrowserRouter } from 'react-router-dom'
import Root from '../pages/root'
import ErrorPage from '../components/error-page'
import Contact from '../components/contact'
import {
    loader as rootLoader,
    action as rootAction
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
                element: <Contact />
            }
        ]
    },
    {

    }
]


const router = createBrowserRouter(config)

export default router