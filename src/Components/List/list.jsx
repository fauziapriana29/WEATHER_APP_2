import React from 'react' 
import './list.css'
import {useHistory, Link} from 'react-router-dom'

const List = (props) => {

    const { data, icons } = props
    const history = useHistory()
    // const getDetail = () => {
    //     history.replace(`${url}/detail/${data.id}`)
    // }
    const newList = data.listdata
    // console.log(newList)
    
    const mapData = newList.map((data, index) => {
        return (
            <tr key={index} className="list">
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td><i className={`wi ${icons} display-4`} /></td>
                <td><Link className="btn btn-secondary" to={`/detail/${data.id}`}>Detail</Link></td>
            </tr>
        )
    })

    // const map = [
    //     {
    //         nama: "bryan",
    //         umur: 12
    //     }, {
    //         nama: "alex",
    //         umur:30
    //     }, {
    //         nama: "johan",
    //         umur: 15
    //     }
    // ]

    // const newData = data.find((data, index) => {
    //      return index === 0
    // })
    
    // const newData = data[0]
    // console.log(map[1].umur)
    const newTemp = Math.floor(data.temp - 273.15)


    return (
        <div className="container cont-parent">
            <div className="row">
                <div className="col col-5 cont-main">
                    <h1 className="city-name">{data.city}</h1>
                    <h3 className="temp">{newTemp}&deg;</h3>
                    <i className={`wi ${icons} display-2`} />
                    <h3 className="desc">{data.desc}</h3>
                    
                </div>
                <div className="col col-7 cont-table">
                    <table className="table table-dark">
                        <thead className="table-head">
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">City.</th>
                                <th scope="col">Weather desc.</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mapData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default List