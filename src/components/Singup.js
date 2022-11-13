import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Singup = () => {
    const [cred, setcred] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = cred
        console.log(name)
        console.log(email)
        console.log(password)
        if (cred.password === cred.cpassword) {
            // const response = await fetch(`https://3gl2n1ocik.execute-api.ap-south-1.amazonaws.com/DEV/createuser`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ name, email, password  })
            // });
            const url="https://3gl2n1ocik.execute-api.ap-south-1.amazonaws.com/DEV/createuser"
            
            const response= await  axios.post(url,{ name:name, email:email, password:password},{
                // headers: {
                //             'Content-Type': 'application/json',
                //         },
            })
            // const json = await response.json()
            console.log("data: ",response.data,"status: ", response.status)
            if (response.data.message) {
                alert("User alrady exists!!")
            }
            else {
                // console.log("token:",response.data.authToken)
                localStorage.setItem('token', response.data)
                navigate('/')
            }
        }
        else {
            alert("Miss-matched password")
        }
    }
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-3'>
            <h2>Signup to use C-note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={cred.name} id="name" aria-describedby="nameHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={cred.email} id="email" aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={cred.password} id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' value={cred.cpassword} id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Singup