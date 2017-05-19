import React from 'react'
import {transformFieldName} from '../../../../util/detailView/reduxForm'
import {Field} from 'redux-form'
import {getFieldId} from '../../../../util/detailView/helpers'
import ReduxFormFieldAdapter from '../ReduxFormFieldAdapter'
import _get from 'lodash/get'
import _startsWith from 'lodash/startsWith'
import {LayoutBox} from 'tocco-ui'

const layoutType = 'ch.tocco.nice2.model.form.components.layout.'
const actionType = 'ch.tocco.nice2.model.form.components.action.'

export default (entity, model, formName, formDefinition, formValues, formFieldUtils) => {
  const isReadOnlyForm = () => formDefinition.displayType === 'READONLY'

  const formTraverser = children => {
    const result = []

    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      if (_startsWith(child.type, layoutType)) {
        const type = child.type.substr(layoutType.length, child.type.length)
        const travers = () => formTraverser(child.children)
        result.push(createLayoutComponent(child, type, i, travers))
      } else if (_startsWith(child.type, actionType)) {
        // Actions are ignored at the moment
      } else {
        result.push(createField(child, i))
      }
    }

    return result
  }

  const createField = (formDefinitionField, key) => {
    const fieldName = formDefinitionField.name
    const entityField = entity.paths[fieldName]
    const modelField = model[fieldName]

    if (shouldRenderField(fieldName, entityField, formValues, isReadOnlyForm())) {
      return (
        <Field
          key={key}
          readOnlyForm={isReadOnlyForm()}
          name={transformFieldName(fieldName)}
          id={getFieldId(formName, fieldName)}
          component={ReduxFormFieldAdapter}
          formDefinitionField={formDefinitionField}
          entityField={entityField}
          modelField={modelField}
          formFieldUtils={formFieldUtils}
        />
      )
    }

    return null
  }

  const shouldRenderField = (fieldName, entityField) => {
    if (!isReadable(entityField)) {
      return false
    }

    if (isReadOnlyForm() && hasEmptyValue(fieldName, formValues)) {
      return false
    }

    return true
  }

  const isReadable = entityField => (_get(entityField, 'value.readable', true))

  const hasEmptyValue = (fieldName, formValues) => {
    if (!formValues.hasOwnProperty(fieldName)) {
      return false
    } else {
      const value = formValues[fieldName]
      return (value === null || value === '' || (Array.isArray(value) && value.length === 0))
    }
  }

  const createLayoutComponent = (field, type, key, traverser) => {
    if (type === 'HorizontalBox' || type === 'VerticalBox') {
      const alignment = type === 'HorizontalBox' ? 'horizontal' : 'vertical'
      const label = field.useLabel ? field.label : undefined

      const children = traverser()

      if (children === null || (Array.isArray(children) && children.every(e => e === null))) {
        return null
      }

      return (
        <LayoutBox key={key} label={label} alignment={alignment}>
          {children}
        </LayoutBox>
      )
    }
  }

  return () => {
    return formTraverser(formDefinition.children)
  }
}
