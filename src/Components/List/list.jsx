import React from 'react' 
import './list.css'
import {useHistory, Link} from 'react-router-dom'

const List = (props) => {

    const { data, icons } = props
    const history = useHistory()
    const newList = data.listdata

    const clickDetail = (id) => {
        history.replace(`/detail/${id}`)
    }
    
    const mapData = newList.map((data, index) => {
        return (
            <tr key={index} className="list" onClick={() => clickDetail(data.id)}>
                <th>{index + 1}</th>
                <td className="list-city">{data.name}</td>
                <td>{data.weather[0].description}</td>
                <td><i className={`wi ${icons} display-5`}/></td>
            </tr>
        )
    })

    const newTemp = Math.floor(data.temp - 273.15)


    return (
        <div className="container cont-parent">
            <div className="row">
                <div className="col col-5 cont-main">
                    <h1 className="city-name">{data.city}</h1>
                    <h3 className="temp">{newTemp}&deg;</h3>
                    <i className={`wi ${icons} display-1`} />
                    <h3 className="desc">{data.desc}</h3>
                    
                </div>
                <div className="col col-7 cont-table">
                    <table className="table table-dark">
                        <thead className="table-head">
                            <tr className="th-head">
                                <th scope="col">No.</th>
                                <th scope="col" className="th-city">City</th>
                                <th scope="col">Weather desc.</th>
                                <th scope="col">Icons</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                                {mapData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default List