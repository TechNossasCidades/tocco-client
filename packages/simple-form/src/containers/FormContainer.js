import {connect} from 'react-redux'
import Form from '../../src/components/Form'
import {form} from 'tocco-util'
import {initializeForm, submit, cancel} from '../modules/simpleForm/actions'
import {transformModel} from '../utils'
import {loadRelationEntity} from '../utils/relationEntity/actions'
import {injectIntl} from 'react-intl'

const mapActionCreators = {
  initializeForm,
  onSubmit: submit,
  onCancel: cancel,
  loadRelationEntity
}

const mapStateToProps = (state, props) => ({
  title: state.input.title,
  description: state.input.description,
  submitText: state.input.submitText,
  cancelText: state.input.cancelText,
  model: state.input.model,
  formDefinition: state.input.form,
  validate: form.syncValidation(transformModel(state.input.model)),
  relationEntities: state.simpleForm.relationEntities
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Form))