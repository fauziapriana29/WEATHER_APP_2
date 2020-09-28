import React from 'react';
import {useForm} from 'react-hook-form'
import '../Input/input.css'

const Input = (props) => {

    const { getweaters } = props
    const {handleSubmit, register} = useForm()

    return (
        <div className="input-cont">
            <form onSubmit={handleSubmit(getweaters)}>
                <input type="text"className={`input-field2 form`} name="city" placeholder="City..." ref={register}/>&nbsp;
                <button className="btn btn-success search-btn"><i className="fas fa-search"></i></button>
            </form>
        </div>
    )

}

export default Input