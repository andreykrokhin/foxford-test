import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Checkbox, Message } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import Container from '../../hoc/Container/Container'
import UserRow from './UserRow/UserRow'
import classes from './UsersTable.module.scss'

const UsersTable = ({ users }) => {
  const [checkedIds, setcheckedIds] = useState([])  // Массив с id выбранных пользователей для чекбоксов в таблице
  const [checkedUsers, setCheckedUsers] = useState([])  // Массив с именами выбранных пользователей для перечисления под таблицей

  // Определяем состояние чекбокса в шапке таблицы
  const generalCheckboxStatus = useMemo(() => {
    let isChecked = false
    let isIndeterminate = false
  
    if (checkedIds.length === users.length) {
      isChecked = true
    } else if (checkedIds.length === 0) {
      isChecked = false
    } else if (checkedIds.length > 0 && checkedIds.length < users.length) {
      isIndeterminate = true
    }

    return { indeterminate: isIndeterminate, checked: isChecked }
  }, [checkedIds, users])

  // Обновляем массив имен выбранных пользователей
  useEffect(() => {
    const newCheckedUsers = checkedIds.map(id => users.filter(user => user.id === id)[0].firstname)
    setCheckedUsers(newCheckedUsers)
  }, [checkedIds, users])
  
  const handleCheckAll = useCallback((value, checked) => {
    const newcheckedIds = checked ? users.map(item => item.id) : []
    setcheckedIds(newcheckedIds)
  }, [users])

  const handleCheck = useCallback((value, checked) => {
    const newcheckedIds = checked
      ? [...checkedIds, value]
      : checkedIds.filter(item => item !== value)

    setcheckedIds(newcheckedIds)
  }, [checkedIds])

  return (
    <Container>
      <div className={classes.TableWrapper}>
        { users.length
          ? <>
              <table className={classes.Table}>
                <thead>
                  <tr>
                    <th width="60px">
                      <Checkbox
                        inline
                        onChange={handleCheckAll}
                        {...generalCheckboxStatus}
                      />
                    </th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Возраст</th>
                  </tr>
                </thead>
                <tbody>
                  { users.map(user => (
                    <UserRow key={user.id} user={user} isChecked={checkedIds.some(item => item === user.id)} onChange={handleCheck} />
                  )) }
                </tbody>
              </table>
              { checkedUsers.length
                ? <Message type="success" description={`Пользователи: ${checkedUsers.join(', ')}`} />
                : null
              }
            </>
          : <p>Нет данных</p>
        }
      </div>
    </Container>
  )
}

export default UsersTable