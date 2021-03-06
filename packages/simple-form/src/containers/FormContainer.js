import {connect} from 'react-redux'
import Form from '../../src/components/Form'
import {form} from 'tocco-util'
import {initializeForm, submit, cancel} from '../modules/simpleForm/actions'
import {loadRelationEntity} from '../utils/form/relationEntity/actions'
import {loadRemoteEntity} from '../utils/form/remoteEntity/actions'
import {uploadDocument} from '../utils/form/document/actions'
import {injectIntl} from 'react-intl'

const mapActionCreators = {
  initializeForm,
  onSubmit: submit,
  onCancel: cancel,
  loadRelationEntity,
  loadRemoteEntity,
  uploadDocument
}

const mapStateToProps = (state, props) => ({
  title: state.input.title,
  description: state.input.description,
  submitText: state.input.submitText,
  cancelText: state.input.cancelText,
  model: state.input.model,
  formDefinition: state.input.form,
  validate: form.syncValidation(state.input.model),
  relationEntities: state.simpleForm.relationEntities,
  remoteEntities: state.simpleForm.remoteEntities
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Form))
