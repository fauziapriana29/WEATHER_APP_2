import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Home.css'

import Input from '../../Components/Input/input.jsx'
import List from '../../Components/List/list.jsx'
import video from '../../Components/vid-background/dayToNight.mp4'
import Spinner from '../../Components/Spinner/Spinner.jsx'

const Home = () => {
    const [data, setData] = useState({
        listdata: [],
        city: '',
        temp: '',
        desc: '',
        icon_id: ''
    })
    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(true)

    const apiKey = "284d0c8d3f216bf0622500d1663147e7"

    const getWeather = (value, e) => {
        setLoading(true)
        if (firstLoad === true) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                axios.get(`http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=30&appid=${apiKey}`)
                    .then((respone) => {
                        const data= respone.data.list
                        setData({
                            listdata: data,
                            city: data[0].name,
                            temp: data[0].main.temp,
                            desc: data[0].weather[0].description,
                            icon_id: data[0].weather[0].id

                        })
                        setFirstLoad(false)
                        setLoading(false)
                })
            })
        } else {
            const city = value.city
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                .then((respone) => {
                    const lat = respone.data.coord.lat;
                    const lon = respone.data.coord.lon;
                    axios.get(`http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=30&appid=${apiKey}`)
                        .then((respone) => {
                            const data= respone.data.list
                        setData({
                            listdata: data,
                            city: data[0].name,
                            temp: data[0].main.temp,
                            desc: data[0].weather[0].description,
                            icon_id: data[0].weather[0].id
                        })
                        setLoading(false)
                    })
                })
                e.target.reset()
            }
    }
    
    const icons = () => {
        const id = data.icon_id
        // console.log(id)
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

    const loadDisplay = !!loading ? <div style={{textAlign : 'center'}}><Spinner/></div> : <List data={data} icons={icons()}/>

    useEffect(() => {
        getWeather()
    }, [])

    // 1882749
    // api.openweathermap.org/data/2.5/group?id=1882749&appid=284d0c8d3f216bf0622500d1663147e7
    return (
        <div>
            <video className="video" src={video} type="video/mov" autoPlay loop muted></video>
            <Input getweaters={getWeather} />
            {loadDisplay}
        </div>
    )
}

export default Home