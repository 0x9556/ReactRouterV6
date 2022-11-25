import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Root from '../../components/root'

const Home = memo(() => {
    return (
        
        <>
            <Root />

            <div id='detail'>
                <Outlet />
            </div>

        </>

    )
})

export default Home


