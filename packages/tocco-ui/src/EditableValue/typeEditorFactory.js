import React from 'react'

import MultiSelect from './typeEditors/MultiSelect'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'

export const map = {
  'string': StringEdit,
  'number': StringEdit,
  'date': StringEdit,
  'birthdate': StringEdit,
  'count': StringEdit,
  'phone': StringEdit,
  'text': TextEdit,
  'multi-select': MultiSelect
}

export default (type, value, onChange, options, id, events) => {
  if (map[type]) {
    return React.createElement(map[type], {value, onChange, options, id, events})
  }

  console.error('No type-editor defined for type', type)
  return null
}

