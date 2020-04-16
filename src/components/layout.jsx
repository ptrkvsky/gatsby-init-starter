import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import './layout.css'
import GlobalStyle from '../styles/Global'

const Layout = ({ children }) => (
  <>
    <Header />
    <GlobalStyle />
    <main>{children}</main>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
