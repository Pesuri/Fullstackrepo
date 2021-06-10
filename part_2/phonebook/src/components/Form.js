import React from 'react'

const Form = ({handleSubmit, newName, newNumber, handleChange}) => {
 

  return(
  <form onSubmit={handleSubmit}>
    <div>
      <h2>add a new</h2>
      name: 
      <input 
        name={"name"}
        value={newName} 
        onChange={handleChange}
      />
      <br />
      number: 
      <input 
        name={"number"}
        value={newNumber} 
        onChange={handleChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  ) 
}

export default Form