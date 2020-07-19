import React, { useMemo } from 'react'
import { Checkbox } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import classes from './UserRow.module.scss'

export default ({ user, isChecked, onChange }) => {
  return useMemo(
    () => (
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
    ), [user, isChecked, onChange]
  )
}