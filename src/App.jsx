import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'



function App() {
  let handleSubmit = e => {

    e.preventDefault()

    let form = e.target


    let name = form.name.value
    let email = form.email.value

    let from = { name, email }

    console.log(from);


    fetch(`http://localhost:5000/user`, {
      method: "POST",
      headers: {

        'content-type': 'application/json'

      },
      body: JSON.stringify(from)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUser = [...api, data]

        setApi(newUser)

        form.reset()
      })


  }



  let [api, setApi] = useState([])

  useEffect(() => {


    let url = `http://localhost:5000/user`
    fetch(url)
      .then(res => res.json())
      .then(data => setApi(data))

  }, [])




  return (
    // here is no dependency thats it bro
    <>

      <form onSubmit={handleSubmit} >
        <input name='name' type="text" />
        <br />
        <br />
        <input name='email' type="email" />

        <br />
        <br />

        <input  value="post" type="submit" />
      </form>


      <br />
      <br />
      <br />

      <div>
        <h1>{api.length}</h1>

      </div>

      {
        api.map(res => <p>{res.name},{res.email}</p>)
      }

    </>
  )
}

export default App
