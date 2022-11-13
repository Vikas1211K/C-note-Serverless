import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [cred, setcred] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        const { email, password } = cred
        e.preventDefault()
        // const response = await fetch(`https://3gl2n1ocik.execute-api.ap-south-1.amazonaws.com/DEV/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(cred)
        // });
        // const json = await response.json()
        const url="https://3gl2n1ocik.execute-api.ap-south-1.amazonaws.com/DEV/login"
        const response= await  axios.post(url,{email:email, password:password},{
            // headers: {
            //             'Content-Type': 'application/json',
            //         },
        })
        console.log("data: ",response.data)
        if (response.data.message) {
            alert("Invalid cred!!")
        }
        else {
            localStorage.setItem('token', response.data)
            navigate('/')
        }
    }
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-3'>
            <h2>Login to use C-note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={cred.email} id="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={cred.password} id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login