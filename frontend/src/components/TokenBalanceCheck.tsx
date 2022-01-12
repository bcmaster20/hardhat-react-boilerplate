import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from "./../hardhat/SymfoniContext"
import { Button, Columns, Column } from 'react-bulma-components'

interface Props { }

export const TokenBalanceCheck: React.FC<Props> = () => {
  const token = useContext(TokenContext)
  console.log(token)
  const [totalSupply, setTotalSupply] = useState("")
  const [name, setName] = useState("")
  const [balanceAddress, setBalanceAddress] = useState("")
  const [addressBalance, setAddressBalance] = useState("")
  useEffect(() => {
    const doAsync = async () => {
      if (!token.instance) return
      console.log("Token is deployed at ", token.instance.address)
      setName(await token.instance.name())
      setTotalSupply((await token.instance.totalSupply()).toString())
    }
    doAsync()
  }, [token])

  const balanceAddressEntered = (evt) =>
    setBalanceAddress(evt.target.value)

  const checkBalance = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!token.instance) throw Error("Token instance not ready")
    if (token.instance) {
      const balance = await token.instance.balanceOf(balanceAddress)
      console.log("balance:", balance)
      setAddressBalance(balance.toString())
    }
  }

  return (
    <div>
      <p>token: {name}</p>
      <p>supply: {totalSupply}</p>

      <div className="s20"></div>
      <p>check balance:</p>
      <Columns>
        <Columns.Column size={3}>
          <input className="input" onChange={balanceAddressEntered} />
        </Columns.Column>
        <Columns.Column size={1}>
          <Button color="primary" onClick={checkBalance}>
            Check
          </Button>
        </Columns.Column>
      </Columns>
      <div className="s20"></div>

      <p>addressBalance: {addressBalance}</p>
    </div>
  )
}
