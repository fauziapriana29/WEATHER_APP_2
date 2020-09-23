import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Detail from './Details/Detail.jsx'
import Home from './Home/Home.jsx'

const index = () => {


    return (
        <div>

            <Router>
                <Switch>
                    <Route path="/detail/:id" component={Detail} />
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
            
        </div>
    )
}

export default index