import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function EditContact(props) {
    const { id, name, email, phone} = props.location.state.contact;
    const initialState = {
      id,
      name,
      phone,
      email
    };
    const [Input, setInput] = useState(initialState)

    const inputHandler = e => {
    let name = e.target.name;
    let value = e.target.value;
      setInput(preValue => {
          return {
              ...preValue,
              [name]: value,
          }
      });
    }

    const submitHandler = e => {
      e.preventDefault();
      props.updateContact(Input);
      setInput({
        id:"",
        name:"",
        phone:"",
        email:""
      });
      props.history.push("/");
    }
    return (
      <div className="ui main">
        <h2>
          Update Contact
          <Link to="/">
            <button className="ui button blue right">Cancel Update</button>
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
              value={Input.email}
              onChange={(e) => inputHandler(e)}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={Input.email}
              onChange={(e) => inputHandler(e)}
            />
          </div>
          <button className="ui button blue">Update Contact</button>
        </form>
      </div>
    );
  }

export default EditContact;
