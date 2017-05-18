import * as forms from './forms'
import fetchMock from 'fetch-mock'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      describe('forms', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('searchFormTransformer', () => {
          it('should return an array of fields', () => {
            const fetchResult = require('../../dev/test-data/user_search.json')

            const result = forms.searchFormTransformer(fetchResult)
            const expectedResult = [
              {
                name: 'txtFulltext',
                type: 'ch.tocco.nice2.model.form.components.simple.TextField',
                displayType: 'EDITABLE',
                label: 'Person',
                useLabel: 'YES'
              }
            ]
            expect(result).to.eql(expectedResult)
          })

          it('should return an empty array if form is missing', () => {
            const result = forms.searchFormTransformer({})
            expect(result).to.eql([])
          })
        })

        describe('columnDefinitionTransformer', () => {
          it('should return an array of label and list of fields', () => {
            const fetchResult = {
              form: {
                children: [{
                  name: 'table',
                  type: 'ch.tocco.nice2.model.form.components.table.Table',
                  children: [
                    {
                      displayType: 'EDITABLE',
                      label: 'label1',
                      children: [{name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                    }, {
                      displayType: 'HIDDEN',
                      label: 'label2',
                      children: [{name: 'name2', type: 'type', displayType: 'HIDDEN', label: 'label'}]
                    }, {
                      displayType: 'EDITABLE',
                      label: 'label3',
                      children: [{name: 'custom:name3', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                    }, {
                      displayType: 'EDITABLE',
                      label: 'label4',
                      children: [{
                        name: 'name4',
                        type: 'ch.tocco.nice2.model.form.components.action.Action',
                        displayType: 'EDITABLE',
                        label: 'label'
                      }]
                    }, {
                      displayType: 'EDITABLE',
                      label: 'label5',
                      children: [{name: 'name5', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                    }
                  ]
                }]
              }
            }
            const result = forms.columnDefinitionTransformer(fetchResult)

            const expectedColumnDefinition = [
              {label: 'label1', values: [{name: 'name1', type: 'type'}]},
              {label: 'label3', values: []},
              {label: 'label4', values: []},
              {label: 'label5', values: [{name: 'name5', type: 'type'}]}
            ]
            expect(result).to.eql(expectedColumnDefinition)
          })
        })

        describe('fetchForm', () => {
          it('should call fetch ', () => {
            fetchMock.get('*', {})
            return forms.fetchForm('User_search').then(res => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCallUrl = fetchMock.lastCall()[0]
              expect(lastCallUrl).to.eql('/nice2/rest/forms/User_search')
            })
          })

          it('should ignore 404 errors', () => {
            const body = new Blob(['{}'], {type: 'application/json'})
            const mockedResponse = new Response(body, {'status': 404})

            fetchMock.get('*', mockedResponse)

            const transformer = json => json.form || 'no form'

            return forms.fetchForm('User_search', transformer).then(res => {
              expect(res).to.eql('no form')
            })
          })
        })
      })
    })
  })
})
