FORM SUBMIT

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};

function PhoneBookForm(props) {
  const initContact = {
    userFirstname: "",
    userLastname: "",
    userPhone: "",
  };

  const [userState, setUserState] = useState(initContact);


  const handleUserChange = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userState.userFirstname || !userState.userLastname || !userState.userPhone) return;
    props.addUser(userState);
    setUserState(initContact);

    console.log(initContact, '---')

  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input style={style.form.inputs} className="userFirstname" name="userFirstname" type="text" value={userState.userFirstname} onChange={handleUserChange} />
      <br />
      <label>Last name:</label>
      <br />
      <input style={style.form.inputs} className="userLastname" name="userLastname" type="text" value={userState.userLastname} onChange={handleUserChange} />
      <br />
      <label>Phone:</label>
      <br />
      <input style={style.form.inputs} className="userPhone" name="userPhone" type="text" value={userState.userPhone} onChange={handleUserChange} />
      <br />
      <input style={style.form.submitBtn} className="submitButton" type="submit" value="Add User" />
    </form>
  );
}

function InformationTable(props) {
  const sortedContacts = props.users.sort((a, b) => a.userLastname.localeCompare(b.userLastname));

  const display =
    sortedContacts.length > 0 ? (
      sortedContacts.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.userFirstname}</td>
          <td style={style.tableCell}>{user.userLastname}</td>
          <td style={style.tableCell}>{user.userPhone}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3}>&nbsp;</td>
      </tr>
    );

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>{display}</tbody>
    </table>
  );
}

function Application(props) {

  const [data, setData] = useState(JSON.parse(localStorage.getItem('USER')) ? JSON.parse(localStorage.getItem('USER')) : [])
  const [users, setUsers] = useState(data);

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem('USER'))
    console.log(a)
    setData(a)
  }, [])

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  console.log(users)

  localStorage.setItem('USER', JSON.stringify(users))

  return (
    <section>
      <PhoneBookForm addUser={addUser} />
      <InformationTable users={users} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));






////CODE CHANGE MAMA


PS JS USECONTEXT API

import React, { useState, useContext, createContext } from 'react'
import ReactDOM from 'react-dom'

const languages = ['JS', 'PY']

const FirstName = createContext()


function App () {
  
  const [toggleLanguage, setToggleLanguage] = useState(languages[0])
  
  let a = function togglelangFunction (){
        
    if(toggleLanguage=="JS"){
      setToggleLanguage(languages[1])
    }else{
      setToggleLanguage(languages[0])
    }
  }
    

    return (

          <FirstName.Provider value={[toggleLanguage, a]}>
  
            <MainSection />
  
          </FirstName.Provider>

    )
  }


function MainSection () {

    const new1 = useContext(FirstName)

    function handleToggle(){

      new1[1]()
      console.log(1111111,'---')
    }

    return (
      <div>

        <FirstName.Consumer>
          
          {(fname) => {
            return <p id='favLang'>Favourite Lang: {fname}</p>
          }}

        </FirstName.Consumer>
        
        <button id='toggleBtn' onClick={handleToggle}> Toggle Language</button>
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))




//ended

