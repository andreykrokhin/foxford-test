import React from 'react'
import { Checkbox } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import classes from './UserRow.module.scss'

export default React.memo(({ user, isChecked, onChange }) => {
  return (
    <tr key={user.id} className={classes.UserRow + ' ' + (isChecked ? classes.ActiveRow : undefined)}>
      <td>
        <Checkbox
          inline
          value={user.id}
          onChange={onChange}
          checked={isChecked}
        />
      </td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.age}</td>
    </tr>
  )
})