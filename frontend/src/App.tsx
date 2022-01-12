import React from 'react'
import logo from './logo.svg'
import './App.css'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Symfoni } from "./hardhat/SymfoniContext"
import { Greeter } from './components/Greeter'
import { GreeterLabel } from './components/GreeterLabel'
import { TokenBalanceCheck } from './components/TokenBalanceCheck'
import { Token } from './components/Token'
import { Section, Container, Hero, Heading } from 'react-bulma-components'

function App() {

  return (
    <Container className="bordered">
      <Hero color="primary">
        <Hero.Body>
          <Container>
            <Heading>
              ETH App React Components
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>

      <Symfoni autoInit={true} >
        <Section>
          <Heading size={4}>Greeter:</Heading>
          <Greeter />
          <div className="s30" />

          <Heading size={4}>GreeterLabel:</Heading>
          <GreeterLabel />
          <div className="s30" />


          <Heading size={4}>Address:</Heading>
          0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
          <div className="s30" />

          <Heading size={4}>TokenBalanceCheck:</Heading>
          <TokenBalanceCheck />
          <div className="s30" />

          <Heading size={4}>Token:</Heading>
          <Token />
          <div className="s30" />
        </Section>
      </Symfoni>
    </Container>
  )
}

export default App
