import React from 'react'

const Filter = ({newFilter, handleChange, updateCountries}) => (
  <div>
    <form>
      find countries
      <input
        value={newFilter}
        onChange={handleChange}>
      </input>
    </form>
  </div>
) 

export default Filter