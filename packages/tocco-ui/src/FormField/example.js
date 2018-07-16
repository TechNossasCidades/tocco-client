/* eslint no-console: 0 */
import React from 'react'
import FormField from './FormField'

import EditableValue from '../EditableValue'
// real-import:import {FormField} from 'tocco-ui'

export default () => {
  return (
    <div className="form-group">
      <form>
        {/* start example */}
        <FormField
          id="formfield-string-1"
          label="String"
        >
          <EditableValue
            type="string"
          />
        </FormField>

        <FormField
          dirty
          id="formfield-string-2"
          label="String is dirty"
        >
          <EditableValue
            type="string"
          />
        </FormField>

        <FormField
          dirty
          id="formfield-string-3"
          label="Lorem ipsum dolor"
          mandatory
          touched
          error={{
            error1: ['error1-1'],
            error2: ['error2-1', 'error2-2']
          }}
        >
          <EditableValue
            type="string"
          />
        </FormField>
        {/* end example */}
      </form>
    </div>
  )
}
