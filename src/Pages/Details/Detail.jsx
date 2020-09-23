import React from 'react' 
import {Link, useHistory} from 'react-router-dom'

const Detail = () => {
    const history = useHistory()
    const back = () => {
            history.replace("/")
    }
    // const {url} = useRouteMatch()
    return (
        <div>
            <h1>Detail Pages</h1>
            <Link className="btn btn-warning" onClick={back}>Back</Link>
            <div className="cont-display">

            </div>
        </div>
    )
}

export default Detail