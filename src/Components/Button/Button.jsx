
const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`px-8 py-2 rounded-lg active:scale-95 ${props.className}`}>{props.children}</button>
  )
}

export default Button