import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import EntityDetail from '../components/EntityDetail'

import {loadDetailParams, clearDetailParams, setFormTouched} from '../modules/actions'

const mapActionCreators = {
  loadDetailParams,
  clearDetailParams,
  setFormTouched
}

const mapStateToProps = (state, props) => {
  return {
    detailParams: state.detail.detailParams,
    formTouched: state.detail.formTouched
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityDetail))