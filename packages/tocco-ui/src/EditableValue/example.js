/* eslint no-console: 0 */
import React from 'react'
import EditableValue from './'
// real-import:import {EditableValue} from 'tocco-ui'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readOnly: false,
      values: {
        string: 'Test String',
        text: 'Line\nLine2',
        url: 'http://www.tocco.ch',
        phone: '+41444005050',
        html: '<h1>Header</h1><p>Body</p>',
        singleSelect: {key: 2, display: 'Two'},
        multiSelect: [{key: 'a', display: 'One'}, {key: 'b', display: 'Two'}],
        date: '2015-12-18',
        dateRangeFrom: '2015-12-21',
        dateRangeTo: '2015-12-24',
        datetime: '2017-01-25T15:15:00.000Z',
        boolean: false,
        number: 99,
        remote: {key: 999, display: 'Dummy User 999'},
        multiRemote: [
          {key: 999, display: 'Dummy User 999'},
          {key: 1234, display: 'Dummy User 1234'}
        ],
        document: {
          mimeType: 'image/png',
          fileExtension: 'png',
          sizeInBytes: 3336,
          fileName: 'Blue-Square.png',
          binaryLink: 'http://link.to/my/image.png',
          thumbnailLink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7'
          + 'EAAAOxAGVKw4bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAAD'
          + 'OggXZNnQmgAAAAABJRU5ErkJggg=='
        }
      },
      remoteOptions: [],
      multiRemoteOptions: []
    }
  }

  toggleReadOnly() {
    this.setState({
      ...this.state,
      readOnly: !this.state.readOnly
    })
  }

  changeValue(name, value) {
    console.log('changeValue', name, value)
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        [name]: value
      }
    })
  }

  createOptions = (amount, input) => {
    const options = []

    if (input) {
      for (let i = 0; i < amount; i++) {
        options.push({key: i, display: `${input} ${i}`})
      }
    }

    return options
  }

  fetchRemoteOptions = searchTerm => {
    this.setState({
      ...this.state,
      remoteOptions: this.createOptions(10, searchTerm)
    })
  }

  fetchMultiRemoteOptions = searchTerm => {
    this.setState({
      ...this.state,
      multiRemoteOptions: this.createOptions(5, searchTerm)
    })
  }

  handleMockFileUpload = file => {
    console.log('upload', file)
    setTimeout(() => {
      this.changeValue('document', {
        binaryLink: file.preview,
        thumbnailLink: file.preview,
        fileName: file.name
      })
    }, 3000)
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.readOnly} onClick={this.toggleReadOnly.bind(this)}/> readOnly
        {/* start example */}
        <EditableValue
          id="string"
          label="String"
          mandatory
          onChange={v => this.changeValue('string', v)}
          readOnly={this.state.readOnly}
          type="string"
          value={this.state.values.string}
        />
        <EditableValue
          id="text"
          label="Text"
          onChange={v => this.changeValue('text', v)}
          readOnly={this.state.readOnly}
          type="text"
          value={this.state.values.text}
        />
        <EditableValue
          id="url"
          label="Url"
          onChange={v => this.changeValue('url', v)}
          readOnly={this.state.readOnly}
          type="url"
          value={this.state.values.url}
        />
        <EditableValue
          id="phone"
          label="Phone"
          onChange={v => this.changeValue('phone', v)}
          option={{defaultCountry: 'CH'}}
          readOnly={this.state.readOnly}
          type="phone"
          value={this.state.values.phone}
        />
        <EditableValue
          id="number"
          label="Number"
          onChange={v => this.changeValue('number', v)}
          readOnly={this.state.readOnly}
          type="number"
          value={this.state.values.number}
        />
        <EditableValue
          id="boolean"
          label="Boolean"
          onChange={v => this.changeValue('boolean', v)}
          readOnly={this.state.readOnly}
          type="boolean"
          value={this.state.values.boolean}
        />
        <EditableValue
          id="single-select"
          label="Single select"
          onChange={v => this.changeValue('singleSelect', v)}
          options={{
            store: [
              {key: 1, display: 'One'},
              {key: 2, display: 'Two'},
              {key: 3, display: 'Three'}
            ]
          }}
          readOnly={this.state.readOnly}
          type="single-select"
          value={this.state.values.singleSelect}
        />
        <EditableValue
          id="multi-select"
          label="Multi select"
          onChange={v => this.changeValue('multiSelect', v)}
          options={{
            store: [{key: 'a', display: 'One'}, {key: 'b', display: 'Two'},
              {key: 'c', display: 'Three'}, {key: 'd', display: 'Four'}]
          }}
          readOnly={this.state.readOnly}
          type="multi-select"
          value={this.state.values.multiSelect}
        />
        <EditableValue
          id="remote"
          label="Remote"
          onChange={v => this.changeValue('remote', v)}
          options={{
            fetchOptions: this.fetchRemoteOptions,
            searchPromptText: 'Type to search',
            clearValueText: 'Clear value',
            options: this.state.remoteOptions,
            moreOptionsAvailable: true,
            moreOptionsAvailableText: 'More Options available'
          }}
          readOnly={this.state.readOnly}
          type="remote"
          value={this.state.values.remote}
        />
        <EditableValue
          id="multi-remote"
          label="Multi remote"
          onChange={v => this.changeValue('multiRemote', v)}
          options={{
            options: this.state.multiRemoteOptions,
            fetchOptions: this.fetchMultiRemoteOptions,
            searchPromptText: 'Type to search',
            clearAllText: 'Clear all values',
            moreOptionsAvailable: true,
            moreOptionsAvailableText: 'More Options available'
          }}
          readOnly={this.state.readOnly}
          type="multi-remote"
          value={this.state.values.multiRemote}
        />
        <EditableValue
          id="date"
          label="Date"
          onChange={v => this.changeValue('date', v)}
          options={{flatpickrOptions: {weekNumbers: true}}}
          readOnly={this.state.readOnly}
          type="date"
          value={this.state.values.date}
        />
        <EditableValue
          id="date-range"
          label="Date range"
          onChange={v => {
            this.changeValue('dateRangeFrom', v ? v.from : null)
            this.changeValue('dateRangeTo', v ? v.to : null)
          }}
          readOnly={this.state.readOnly}
          type="date-range"
          value={{
            from: this.state.values.dateRangeFrom,
            to: this.state.values.dateRangeTo
          }}
        />
        <EditableValue
          id="datetime"
          label="Datetime"
          onChange={v => this.changeValue('datetime', v)}
          readOnly={this.state.readOnly}
          type="datetime"
          value={this.state.values.datetime}
        />
        <EditableValue
          id="document"
          label="Document"
          onChange={v => this.changeValue('document', v)}
          options={{
            uploadText: 'drag & drop',
            uploadingText: 'uploading...',
            upload: this.handleMockFileUpload
          }}
          readOnly={this.state.readOnly}
          type="document"
          value={this.state.values.document}
        />
        <EditableValue
          id="html"
          label="Html"
          onChange={v => this.changeValue('html', v)}
          readOnly={this.state.readOnly}
          type="html"
          value={this.state.values.html}
        />
        {/* end example */}
      </div>
    )
  }
}

export default () => <Example/>
