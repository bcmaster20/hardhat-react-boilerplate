import React, { useContext, useEffect, useState } from 'react'
import { GreeterContext } from "./../hardhat/SymfoniContext"
import { Button, Input, Columns, Heading } from 'react-bulma-components'

interface Props { }

export const Greeter: React.FC<Props> = () => {
  const greeter = useContext(GreeterContext)
  const [message, setMessage] = useState("")
  const [inputGreeting, setInputGreeting] = useState("")
  useEffect(() => {
    const doAsync = async () => {
      if (!greeter.instance) return
      console.log("Greeter is deployed at ", greeter.instance.address)
      setMessage(await greeter.instance.greet())

    }
    doAsync()
  }, [greeter])

  const handleSetGreeting = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!greeter.instance) throw Error("Greeter instance not ready")
    if (greeter.instance) {
      const tx = await greeter.instance.setGreeting(inputGreeting)
      console.log("setGreeting tx", tx)
      await tx.wait()
      console.log("New greeting mined, result: ", await greeter.instance.greet())
    }
  }

  const inputOnChange = (e) =>
    setInputGreeting(e.target.value)

  return (
    <>
      <p>Message: {message}</p>
      <div className="s20" />

      <Heading size={5}>Set Message:</Heading>
      <Columns>
        <Columns.Column size={3}>
          <input className="input" onChange={inputOnChange} />
        </Columns.Column>
        <Columns.Column size={1}>
          <Button color="primary" onClick={handleSetGreeting}>
            Update
					</Button>
        </Columns.Column>
      </Columns>
    </>
  )
}
