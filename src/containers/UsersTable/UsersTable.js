import React, { useEffect, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, markUsers } from '../../redux/actions/actions'
import { Checkbox, Message } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import Container from '../../hoc/Container/Container'
import UserRow from './UserRow/UserRow'
import classes from './UsersTable.module.scss'

const UsersTable = ({ users, markedUsersIds, fetchUsers, markUsers }) => {

  /*
  * Изначально markedUsersIds находился в стейте этого компонента, но в этом случае происходило много лишних ре-рендеров.
  * Например, функции handleCheck и handleCheckAll переопределялись после каждого изменения массива markedUsersIds, из-за этого перерисовывались все чекбоксы, а не только нажатый.
  * Тогда я решил вынести markedUsersIds в глобальный стейт и теперь при нажатии на чекбокс перерисовывается только он.
  * 
  * Имея 300 сотрудников, выбор всех полей работает вполне неплохо.
  * При 1000 сотрудниках выбор всех полей уже заметно тормозит из-за того, что ре-рендерятся все 1000 чекбоксов.
  * Чтобы это исправить, я бы использовал react-window, react-virtualized или window-table, но это усложнило бы пример и добавило бы лишних зависимостей.
  * Мне показалось, что в данном задании вы ожидаете увидеть навыки использования нативных методов оптимизации React, а не умение пользоваться сторонними библиотеками :)
  */

  useEffect(() => {
    if (!users.length) {
      fetchUsers()
    }
  }, [fetchUsers, users])

  // Определяем состояние чекбокса в шапке таблицы (indeterminate - полузаполненный, checked - заполненный)
  const generalCheckboxStatus = useMemo(() => {
    let isChecked = false
    let isIndeterminate = false
  
    if (markedUsersIds.length === users.length) {
      isChecked = true
    } else if (markedUsersIds.length === 0) {
      isChecked = false
    } else if (markedUsersIds.length > 0 && markedUsersIds.length < users.length) {
      isIndeterminate = true
    }

    return { indeterminate: isIndeterminate, checked: isChecked }
  }, [markedUsersIds, users])
  
  const handleCheckAll = useCallback((value, checked) => {
    markUsers(users.map(item => item.id), checked)
  }, [markUsers, users])

  const handleCheck = useCallback((value, checked) => {
    markUsers(value, checked)
  }, [markUsers])

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
                    <UserRow key={user.id} user={user} isChecked={markedUsersIds.some(item => item === user.id)} onChange={handleCheck} />
                  )) }
                </tbody>
              </table>
            </>
          : <p>Нет данных</p>
        }
      </div>
      { markedUsersIds.length
        ? <Message type="success" description={`Пользователи: ${markedUsersIds.map(id => users.filter(user => user.id === id)[0].firstname).join(', ')}`} />
        : null
      }
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    users: state.app.users,
    markedUsersIds: state.app.markedUsersIds
  }
}

const mapDispatchToProps = {
  fetchUsers,
  markUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)