import {formField} from 'tocco-util'
import SubGrid from './fromFieldFactories/subGrid'

export default {
  'ch.tocco.nice2.model.form.components.Form': null,
  'ch.tocco.nice2.model.form.components.Template': null,
  'ch.tocco.nice2.model.form.components.action.Action': null,
  'ch.tocco.nice2.model.form.components.action.ActionSeparator': null,
  'ch.tocco.nice2.model.form.components.composite.LocationField': null,
  'ch.tocco.nice2.model.form.components.layout.HorizontalBox': null,
  'ch.tocco.nice2.model.form.components.layout.VerticalBox': null,
  'ch.tocco.nice2.model.form.components.navigation.IteratorComponent': null,
  'ch.tocco.nice2.model.form.components.simple.BirthDateField': formField.formattedValueFactory('birthdate'),
  'ch.tocco.nice2.model.form.components.simple.Checkbox': formField.formattedValueFactory('boolean'),
  'ch.tocco.nice2.model.form.components.simple.CodeField': formField.formattedValueFactory('text'),
  'ch.tocco.nice2.model.form.components.simple.ConstantField': null,
  'ch.tocco.nice2.model.form.components.simple.CreatePasswordField': null,
  'ch.tocco.nice2.model.form.components.simple.CustomDataField': null,
  'ch.tocco.nice2.model.form.components.simple.DataAmountField': formField.formattedValueFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.DateField': formField.formattedValueFactory('date'),
  'ch.tocco.nice2.model.form.components.simple.DatetimeField': formField.formattedValueFactory('datetime'),
  'ch.tocco.nice2.model.form.components.simple.DescriptionField': null,
  'ch.tocco.nice2.model.form.components.simple.DisplayExpressionFieldFacade': null,
  'ch.tocco.nice2.model.form.components.simple.DisplayField': null,
  'ch.tocco.nice2.model.form.components.simple.DocumentField': formField.formattedValueFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.DurationField': null,
  'ch.tocco.nice2.model.form.components.simple.EmailField': formField.formattedValueFactory('email'),
  'ch.tocco.nice2.model.form.components.simple.HtmlField': formField.formattedValueFactory('html'),
  'ch.tocco.nice2.model.form.components.simple.ImageField': formField.formattedValueFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.LoginField': formField.formattedValueFactory('string'),
  'ch.tocco.nice2.model.form.components.simple.MoneyAmountField': formField.formattedValueFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.MultiRemoteField': formField.formattedValueFactory('multi-remote'),
  'ch.tocco.nice2.model.form.components.simple.MultiSelectBox': formField.formattedValueFactory('multi-select'),
  'ch.tocco.nice2.model.form.components.simple.NamedUploadField': formField.formattedValueFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.NumberField': formField.formattedValueFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.PasswordField': null,
  'ch.tocco.nice2.model.form.components.simple.PathField': null,
  'ch.tocco.nice2.model.form.components.simple.PercentField': formField.formattedValueFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.PhoneField': formField.formattedValueFactory('phone'),
  'ch.tocco.nice2.model.form.components.simple.PulldownDateField': formField.formattedValueFactory('date'),
  'ch.tocco.nice2.model.form.components.simple.RangeField': {
    'date': formField.formattedValueFactory('date-range'),
    'birthdate': formField.formattedValueFactory('date-range')
  },
  'ch.tocco.nice2.model.form.components.simple.RemoteField': formField.formattedValueFactory('remote'),
  'ch.tocco.nice2.model.form.components.simple.SingleSelectBox': formField.formattedValueFactory('single-select'),
  'ch.tocco.nice2.model.form.components.simple.TextArea': formField.formattedValueFactory('text'),
  'ch.tocco.nice2.model.form.components.simple.TextField': formField.formattedValueFactory('string'),
  'ch.tocco.nice2.model.form.components.simple.TimeField': null,
  'ch.tocco.nice2.model.form.components.simple.UploadField': formField.formattedValueFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.UrlField': formField.formattedValueFactory('url'),
  'ch.tocco.nice2.model.form.components.simple.UuidField': formField.formattedValueFactory('string'),
  'ch.tocco.nice2.model.form.components.table.Column': null,
  'ch.tocco.nice2.model.form.components.table.Table': SubGrid()
}
