import React from 'react'
import { useState } from 'react';

const Form = () => {
const [formData,setFormData]=useState({
    firstname:"",
    lastname:"",
    phone:""
})

const [newFormData, setNewFormData] =useState([])

const updateFormData=(event)=>
setFormData({
    ...formData,
    [event.target.name]:event.target.value
})
const {firstname, lastname, phone}=formData;

const handleSubmit=(e)=>{
    e.preventDefault();
    let newData = [...newFormData]
    let newObject = { fName: formData.firstname, lName: formData.lastname, phNum: formData.phone, id: formData.length + 1 }
    newData.unshift(newObject)
    setNewFormData(newData)
    setFormData({ firstname: '', lastname: '', phone: '' });
    console.log(newData)

}

React.useEffect(()=>{
    localStorage.setItem('newFormData', JSON.stringify(newFormData) )
}, [newFormData])

React.useEffect(()=>{
    localStorage.getItem('newFormData') && setNewFormData(JSON.parse(localStorage.getItem(newFormData)))
}, [])

  return (
    <>
   <form onSubmit={handleSubmit}>
    <input
        value={firstname}
        onChange={(e)=>updateFormData(e)}
        type="text"
        name="firstname"
    />
        <br/>
        <br/>
    <input
        value={lastname}
        onChange={(e)=>updateFormData(e)}
        type="text"
        name="lastname"
    />
        <br/>
        <br/>

    <input
        value={phone}
        onChange={(e)=>updateFormData(e)}
        type="text"
        name="phone"
    />
        <br/>
        <br/>
    <button type="submit">Submit</button>
 
   </form>

   <div>
    {newFormData?.map((user)=> {
        return (
            <div key={user.id}>
                <p>{user.fName}</p>
                <p>{user.lName}</p>
                <p>{user.phNum}</p>
            </div>
        )
    })}
   </div>
   </>
  )
}

export default Form