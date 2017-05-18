import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import ListView from '../components/ListView'
import {initialize, changePage, setOrderBy, refresh} from '../modules/list/actions'
import {externalEvents} from 'tocco-util'

const mapActionCreators = {
  initialize,
  changePage,
  setOrderBy,
  refresh,
  onRowClick: id => externalEvents.fireExternalEvent('onRowClick', { id })
}

const mapStateToProps = (state, props) => {
  return {
    currentPage: state.list.currentPage,
    orderBy: state.list.orderBy,
    entities: state.list.entities,
    columnDefinitions: state.list.columnDefinition,
    entityCount: state.list.entityCount,
    limit: state.list.limit,
    inProgress: state.list.inProgress
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))