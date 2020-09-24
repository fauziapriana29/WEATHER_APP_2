import React, { useState, useEffect } from 'react' 
import { Link, useHistory, useParams } from 'react-router-dom'
import './Detail.css'
import axios from 'axios'
import Summer from '../../Components/vid-background/summer.mp4'
import Rain from '../../Components/vid-background/rain.mp4'
import Snow from '../../Components/vid-background/snow.mov'
import Fog from '../../Components/vid-background/fog.mp4'
import Spinner from '../../Components/Spinner/Spinner.jsx'


const Detail = () => {
    const history = useHistory()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
    const { id } = useParams()
    // console.log(id)
    
  const detailWeaters = async () => {
      setLoading(true)
        console.log(id)
        await axios.get(`http://api.openweathermap.org/data/2.5/group?id=${id}&appid=284d0c8d3f216bf0622500d1663147e7`).then((response) => {
            const data = response.data.list[0]
            setData({
                city: data.name,
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                desc: data.weather[0].description,
                icon_id: data.weather[0].id,
                wind_speed: data.wind.speed,
                wind_deg: data.wind.deg,
                lon: data.coord.lon,
                lan: data.coord.lat
            })
          setLoading(false)
        })
    }


    console.log(data)
    const back = () => {
            history.replace("/")
    }


    const icons = () => {
        const id = data.icon_id
        if (id >= 200 && id <= 232) {
          return('wi-day-thunderstorm')
        }
        else if (id >= 300 && id <= 321) {
          return('wi-day-sleet')
        }
        else if (id >= 500 && id <= 531) {
          return('wi-day-snow-thunderstorm')
        }
        else if (id >= 600 && id <= 622) {
          return('wi-day-snow')
      }
        else if (id >= 701 && id <= 781) {
          return('wi-day-fog')
        }
        else if (id === 800) {
          return('wi-day-sunny')
        }
        else if (id >= 801 && id <= 804) {
          return('wi-day-cloudy')
        }
      }



    const temp = Math.floor(data.temp - 273.15)
    const maxTemp = Math.floor(data.temp_max - 273.15)
    const minTemp = Math.floor(data.temp_min - 273.15)

    const windDeg = () => {
        if (data.wind_deg > 180) {
            return data.wind_deg - 180
        } else {
            return data.wind_deg + 180
        }
    }
  
    const vidBack = () => {
      const id = data.icon_id
      if (id >= 200 && id <= 531) { return(<video className="video" src={Rain} type="video/mov" autoPlay loop muted></video>) }
      else if (id >= 600 && id <= 622) { return(<video className="video" src={Snow} type="video/mov" autoPlay loop muted></video>) }
      else if (id >= 701 && id <= 781) { return(<video className="video" src={Fog} type="video/mov" autoPlay loop muted></video>) }
      else if (id >= 800 && id <= 811){ return(<video className="video" src={Summer} type="video/mov" autoPlay loop muted></video>)}
  }


  const setDisplay = !!loading ? <Spinner /> : <div>
    {vidBack()}
                <Link className="btn btn-outline-warning btn-back" onClick={back}><i class="fas fa-arrow-left fa-2x"></i></Link>
            <div className="main-container">
                <div className="cont-2"><h1 className="main-temp">{temp}&deg;</h1></div>
                <div className="cont-3">
                    <h1 className="city-title">{data.city}</h1>
                    <p>Latitude: {data.lan}</p>
                    <p>Longtitude: {data.lon}</p>
                </div>
                <div className="cont-4">
                    <i className={`wi ${icons()} display-1`} />
                    <h2 className="w-desc">{data.desc}</h2>
                </div>
                <div className="main-cont-btm">
                    <div className="cont-5"><h4>Max Temp:</h4><h2 className="btm-indicator">{maxTemp}&deg;C</h2></div>
                    <div className="cont-6"><h4>Min Temp:</h4><h2 className="btm-indicator">{minTemp}&deg;C</h2></div>
                    <div className="cont-7"><h4>Wind Speed:</h4><h2 className="btm-indicator">{data.wind_speed} Kn</h2></div>
                    <div className="cont-8">
                        <h4>Wind Deg:</h4>
                        <i className={`wi wi-wind from-${windDeg()}-deg towards-sse display-1`} />
                        <h3>{data.wind_deg}</h3>
                    </div>
                </div>  
            </div>
  </div>

    useEffect(() => {
        detailWeaters()
    }, [id])
    return (
        <div style={{textAlign: "center"}}>
            {setDisplay}
        </div>
    )
}

export default Detail