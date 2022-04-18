export function ContactPreview(props) {
  const { contact } = props
  return (
    <div className="contact-preview">
      <img
        src={'https://robohash.org/' + contact.name}
        alt=""
      />
      <p>{contact.name}</p>
    </div>
  )
}
