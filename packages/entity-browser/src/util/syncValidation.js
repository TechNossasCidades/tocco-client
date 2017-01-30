import _forOwn from 'lodash/forOwn'
import _isEmpty from 'lodash/isEmpty'

export default entityModel =>
  values => {
    return valueValidator(
      values,
      [
        {validator: mandatoryValidator, selector: 'mandatory'},
        {validator: minLengthValidator, selector: 'minLength'},
        {validator: maxLengthValidator, selector: 'maxLength'}
      ],
      entityModel
    )
  }

const valueValidator = (values, validatorDefinitions, entityModel) => {
  let errors = {}

  const addErrors = (field, fieldErrors) => {
    if (fieldErrors && !_isEmpty(fieldErrors)) {
      errors = {
        ...errors,
        [field]: {
          ...errors[field],
          ...fieldErrors
        }
      }
    }
  }

  const getValidatorValue = (fieldName, selector) => {
    if (entityModel[fieldName]
      && entityModel[fieldName].validate) {
      return entityModel[fieldName].validate[selector]
    }
  }

  _forOwn(values, (value, key) => {
    validatorDefinitions.forEach(validatorDefinition => {
      const validatorValue = getValidatorValue(key, validatorDefinition.selector)
      if (validatorValue) {
        addErrors(key, validatorDefinition.validator(value, validatorValue))
      }
    })
  })

  return errors
}

const mandatoryValidator = (value, isMandatory) => {
  if (!value && isMandatory) {
    return {mandatory: `This field is required`}
  }
}

const minLengthValidator = (value, minLength) => {
  if (value && value.length < minLength) {
    return {minLength: `Min. length is ${minLength}`}
  }
}

const maxLengthValidator = (value, maxLength) => {
  if (value && value.length > maxLength) {
    return {maxLength: `Max. length is ${maxLength}`}
  }
}

