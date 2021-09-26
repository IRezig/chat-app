import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

export default function Chat({location}) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const {name, room} = queryString.parse(location.search)
    socket = io(ENDPOINT)
    setName(name)
    setRoom(room)

    socket.emit('join', {name, room}, () => {
    })
    return () => {
      socket.emit('disconnect')
      socket.off()
    }

  }, [ENDPOINT, location.search])

  return (
    <div className="outerContainer">
      <div className="container">
          {/* <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  )
}