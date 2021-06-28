import React, { useState } from 'react'
import {Link} from "react-router-dom"

function AddContact(props) {

  const initialState = {
    id:"",
    name: "",
    phone:"",
    email: ""
  }

  const [Input, setInput] = useState(initialState)

  const inputHandler = e => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(preValue => {
      return {
          ...preValue,
          [name]: value,
          id: new Date().getTime().toString()
      }
    })
  }

  const submitHandler = e => {
      e.preventDefault();
      props.addContact(Input)
      setInput(initialState);
      props.history.push("/");
  }
  
  return (
    <div className="ui main">
      <h2>
        Add Contact
        <Link to="/">
          <button className="ui button blue right">Back to Contact list</button>
        </Link>
      </h2>
      <form className="ui form" onSubmit={submitHandler}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={Input.name}
            onChange={(e) => inputHandler(e)}
            required
          />
        </div>
        <div className="field">
          <label>Phone No.</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={Input.phone}
            onChange={(e) => inputHandler(e)}
            required
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={Input.email}
            onChange={(e) => inputHandler(e)}
          />
        </div>
        <button className="ui button blue">Add Contact</button>
      </form>
    </div>
  );
}

export default AddContact;
