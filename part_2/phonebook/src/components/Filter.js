import React from 'react'

const Filter = ({newFilter, handleChange}) => (
  <div>filter shown with
    <input
      name={"filter"}
      value={newFilter}
      onChange={handleChange}>
    </input>
  </div>
) 

export default Filter