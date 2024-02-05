import React from 'react'
import Factura from './Facturacion'

describe('<Factura />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Factura />)
  })
})