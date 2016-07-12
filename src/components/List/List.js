import React from 'react'
import { Link } from 'react-router';

const columns = ({ children }) => children
  .find(child => child.name === 'table').children
  .filter(column => column.displayType !== 'HIDDEN')

const fieldName = column => column.children[0].name

const value = (data, column) => {
  const name = fieldName(column)
  const field = data.fields[name]
  if (field) {
    return field.value
  }
  return null
}

const Item = (props) => (
  <tr>
    {props.columns.map((column, index) =>
      <td key={index}><Link to={'/detail/' + props.data.model + '/' + props.data.key}>{value(props.data, column)}</Link></td>
    )}
  </tr>
)

const Header = props => (
  <tr>
    {props.columns.map((column, index) => <th key={index} onClick={() => props.onClick(column)} style={{cursor: 'pointer'}}>
      {column.label}
      {(props.ordering && props.ordering.name === column.name && props.ordering.direction === 'asc') && ' ▲'}
      {(props.ordering && props.ordering.name === column.name && props.ordering.direction === 'desc') && ' ▼'}
    </th>)}
  </tr>
)

const List = (props) => {
  if (props.data.length === 0) {
    return <div className="List empty">Keine Einträge gefunden</div>
  }
  const cols = columns(props.form)
  return (
    <table className="List table table-hover">
      <thead>
        <Header columns={cols} ordering={props.ordering} onClick={column => props.setOrdering(column.name)}/>
      </thead>
      <tbody>
        {props.data.map((item, index) => <Item key={index} data={item} columns={cols}/>)}
      </tbody>
    </table>
  )
}

List.propTypes = {
  data: React.PropTypes.array.isRequired,
  form: React.PropTypes.object.isRequired,
  ordering: React.PropTypes.object.isRequired,
  setOrdering: React.PropTypes.func.isRequired,
}

export default List
