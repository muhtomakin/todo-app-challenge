import React, { useEffect, useState } from 'react'

// I want from you to add specific id for each items and user may want to delete the item. Therefore you should add delete button for each item.

const FormSecond = () => {

    // only to manipulate input tags
    const [inputValue, setInputValue] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    })

    //data state
    const [data, setData] = useState([])

    //changing the input value
    const handleChange = (e) => {
        if (e.target.name === 'firstName') {
            return setInputValue((prevValue) => (
                {
                    ...prevValue,
                    firstName: e.target.value
                }
            ))
        } 
        if (e.target.name === 'lastName') {
            return setInputValue((prevValue) => (
                {
                    ...prevValue,
                    lastName: e.target.value
                }
            ))
        }  
        if (e.target.name === 'phoneNumber') {
            return setInputValue((prevValue) => (
                {
                    ...prevValue,
                    phoneNumber: e.target.value
                }
            ))
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setData(data.concat(inputValue))
        setInputValue({
            firstName: '',
            lastName: '',
            phoneNumber: ''
        })
    }

    useEffect(() => {
        //Must check the data length otherwise localStorage will be empty after every refresh.
        //Because in the beginning our data is empty list. 
        if (data.length>0) 
            localStorage.setItem('data', JSON.stringify(data))    
    }, [data])

    useEffect(() => {
        console.log(data)
        getLocalStorage()
    }, [])

    const getLocalStorage = () => {
        const createdData = localStorage.getItem("data") 
        if (!createdData) return
        setData(JSON.parse(localStorage.getItem('data')))
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    type='text'
                    name='firstName'
                    onChange={(e) => handleChange(e)}
                    value={inputValue.firstName} //controlled component
                />
                <br/>
                <input 
                    type='text'
                    name='lastName'
                    onChange={(e) => handleChange(e)}
                    value={inputValue.lastName}
                />
                <br/>
                <input 
                    type='text'
                    name='phoneNumber'
                    onChange={(e) => handleChange(e)}
                    value={inputValue.phoneNumber}
                />
                <br/>
                <button type='submit'>Submit</button>
            </form>
            <br />

            {data?.map(item => {
                return (
                    <div>
                        {item.firstName}
                        {item.lastName}
                        {item.phoneNumber}
                    </div>
                )
            })}

        </div>
    )
}

export default FormSecond

