import React from 'react'
import RegistroCliente from './registro-cliente'

describe('<RegistroCliente />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RegistroCliente />)
  })
})