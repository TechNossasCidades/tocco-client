import FormattedValueRaw from '!raw!../../tocco-ui/src/FormattedValue/FormattedValue'
import FormattedValueExample from '../../tocco-ui/src/FormattedValue/example'
import FormattedValueExampleRaw from '!raw!../../tocco-ui/src/FormattedValue/example'

import TableRaw from '!raw!../../tocco-ui/src/Table/Table'
import TableExample from '../../tocco-ui/src/Table/example'
import TableExampleRaw from '!raw!../../tocco-ui/src/Table/example'

import LoadMaskRaw from '!raw!../../tocco-ui/src/LoadMask/LoadMask'
import LoadMaskExample from '../../tocco-ui/src/LoadMask/example'
import LoadMaskExampleRaw from '!raw!../../tocco-ui/src/LoadMask/example'

import ButtonRaw from '!raw!../../tocco-ui/src/Button/Button'
import ButtonExample from '../../tocco-ui/src/Button/example'
import ButtonExampleRaw from '!raw!../../tocco-ui/src/Button/example'

import SearchBoxRaw from '!raw!../../tocco-ui/src/SearchBox/SearchBox'
import SearchBoxExample from '../../tocco-ui/src/SearchBox/example'
import SearchBoxExampleRaw from '!raw!../../tocco-ui/src/SearchBox/example'

import ToccoLogoRaw from '!raw!../../tocco-ui/src/ToccoLogo/ToccoLogo'
import ToccoLogoExample from '../../tocco-ui/src/ToccoLogo/example'
import ToccoLogoExampleRaw from '!raw!../../tocco-ui/src/ToccoLogo/example'

import PaginationRaw from '!raw!../../tocco-ui/src/Pagination/Pagination'
import PaginationExample from '../../tocco-ui/src/Pagination/example'
import PaginationExampleRaw from '!raw!../../tocco-ui/src/Pagination/example'

const categories = {
  CONTENT: 'Content',
  FORMS: 'From Controls',
  CORPORATE_IDENTITY: 'Corporate identity'
}

export default [
  {
    category: categories.CONTENT,
    components: [
      {
        name: 'FormattedValue',
        raw: FormattedValueRaw,
        example: {
          component: FormattedValueExample,
          raw: FormattedValueExampleRaw
        }
      },
      {
        name: 'Table',
        raw: TableRaw,
        example: {
          component: TableExample,
          raw: TableExampleRaw
        }
      },
      {
        name: 'Pagination',
        raw: PaginationRaw,
        example: {
          component: PaginationExample,
          raw: PaginationExampleRaw
        }
      },
      {
        name: 'LoadMask',
        raw: LoadMaskRaw,
        example: {
          component: LoadMaskExample,
          raw: LoadMaskExampleRaw
        }
      }]
  },
  {
    category: categories.FORMS,
    components: [
      {
        name: 'Button',
        raw: ButtonRaw,
        example: {
          component: ButtonExample,
          raw: ButtonExampleRaw
        }
      },
      {
        name: 'SearchBox',
        raw: SearchBoxRaw,
        example: {
          component: SearchBoxExample,
          raw: SearchBoxExampleRaw
        }
      }]
  },
  {
    category: categories.CORPORATE_IDENTITY,
    components: [
      {
        name: 'ToccoLogo',
        raw: ToccoLogoRaw,
        example: {
          component: ToccoLogoExample,
          raw: ToccoLogoExampleRaw
        }
      }
    ]
  }
]
