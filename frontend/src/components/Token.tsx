import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from "./../hardhat/SymfoniContext"
import { Button, Columns, Column } from 'react-bulma-components'

interface Props { }

export const Token: React.FC<Props> = () => {
  const token = useContext(TokenContext)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")

  useEffect(() => {
    const doAsync = async () => {
      if (!token.instance) return
      console.log("Token is deployed at ", token.instance.address)
      setName(await token.instance.name())
      // setMessage(lastTx) TODO: finish
    }
    doAsync()
  }, [token])

  const amountEntered = (evt) =>
    setAmount(evt.target.value)

  const recipientAddressEntered = (evt) =>
    setRecipientAddress(evt.target.value)

  const tokenTransfer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!token.instance) throw Error("Token instance not ready")
    if (token.instance) {
      const message = await token.instance.transfer(recipientAddress, amount)
      console.log("message:", message) // TODO:
      setMessage(message.toString())
    }
  }

  return (
    <div>
      <p>token: {name}</p>

      <div className="s20"></div>
      <p>send transaction (amount, recipient):</p>
      <Columns>
        <Columns.Column size={3}>
          <input className="input" placeholder="0.01234 ETH" onChange={amountEntered} />
        </Columns.Column>
        <Columns.Column size={3}>
          <input className="input" placeholder="0x1234567890abcdef123456789abcdef1" onChange={recipientAddressEntered} />
        </Columns.Column>
        <Columns.Column size={1}>
          <Button color="primary" onClick={tokenTransfer}>
            Send
          </Button>
        </Columns.Column>
      </Columns>
      <div className="s20"></div>

    </div>
  )
}
