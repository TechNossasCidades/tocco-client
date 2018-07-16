import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'

import Button from '../../Button'
import {
  StyledFlatpickerInputWrapper,
  StyledInput,
  StyledInputActions
} from '../StyledEditableValue'

class DateAbstract extends React.Component {
  Flatpickr = null

  constructor(props) {
    super(props)

    import(/* webpackChunkName: "flatpickr" */ '!style-loader!css-loader!flatpickr/dist/themes/light.css')

    Promise.all([
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/de.js'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/fr.js'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/it.js')
    ]).then(response => {
      this.Flatpickr = response[0].default
      this.localeMap = {
        'de-CH': response[1].German,
        'de': response[1].German,
        'fr': response[2].French,
        'it': response[3].Italian
      }

      this.initializeFlatPickr()
    })
  }

  initializeFlatPickr = flatpickr => {
    const locale = this.localeMap[this.props.intl.locale]

    this.options = {
      wrap: true,
      onChange: this.handleOnChange.bind(this),
      altInput: true,
      clickOpens: !this.props.readOnly,
      defaultDate: this.props.value,
      ...(locale ? {locale} : {}),
      ...(this.props.options ? this.props.options.flatpickrOptions : {})
    }

    this.flatpickr = new this.Flatpickr(this.wrapper, this.options)
    // TODO remove next line but ensure correct typography
    this.flatpickr.calendarContainer.classList.add('tocco-ui-theme')

    if (this.props.initialized) {
      this.props.initialized()
    }
  }

  getLocale = localeCode => {
    if (this.localeMap) {
      let locale = this.localeMap[localeCode]

      // Fallback english
      if (!locale && this.Flatpickr) {
        locale = this.Flatpickr.l10ns.en
      }
      return locale
    }
    return null
  }

  componentWillReceiveProps(props) {
    const locale = this.getLocale(props.intl.locale)

    if (this.Flatpickr && this.flatpickr) {
      this.Flatpickr.localize(locale)
      this.flatpickr.set('locale', locale)

      this.flatpickr.set('altFormat', props.options.flatpickrOptions.altFormat)
      this.flatpickr.setDate(props.value, false)
      this.flatpickr.redraw()
    }
  }

  handleOnChange(selectedDates) {
    const isoStrings = selectedDates.map(date => date.toISOString())
    this.props.onChange(isoStrings)
  }

  refMapper(ref) {
    this.wrapper = ref
  }

  hasValue() {
    return this.props.value && this.props.value.length > 0 && this.props.value.every(v => v)
  }

  handleOnBlur() {
    if (this.props.onBlur) {
      const altValue = this.flatpickr.altInput.value
      this.props.onBlur(altValue, this.flatpickr.selectedDates, r => this.flatpickr.setDate(r, true))
    }
  }

  handleToggleClick() {
    if (this.props.events && this.props.events.onFocus) {
      this.props.events.onFocus()
    }
  }

  render() {
    return (
      <div
        ref={this.refMapper.bind(this)}
        data-wrap
        onBlur={this.handleOnBlur.bind(this)}
      >
        <StyledFlatpickerInputWrapper readOnly={this.props.readOnly}>
          <input data-input />
        </StyledFlatpickerInputWrapper>
        {this.props.readOnly
          && <StyledInput
            disabled
            value={this.flatpickr ? this.flatpickr.altInput.value : ''}
          />
        }
        {!this.props.readOnly
          && <StyledInputActions>
            {this.hasValue()
              && <Button
                data-clear
                icon="fa-times"
                iconPosition="solely"
              />
            }
            <Button
              data-toggle
              icon="fa-calendar"
              iconPosition="solely"
              onClick={this.handleToggleClick.bind(this)}
            />
          </StyledInputActions>
        }
      </div>
    )
  }
}

DateAbstract.propTypes = {
  intl: intlShape.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.shape({
    flatpickrOptions: PropTypes.object
  }),
  readOnly: PropTypes.bool,
  initialized: PropTypes.func,
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default injectIntl(DateAbstract)
