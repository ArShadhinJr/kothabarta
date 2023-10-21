import { NavLink } from "react-router-dom"

const MenuItem = ( props ) => {


  return (
    <div onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} className='group'>
        <li className={` ${props.className}`}><NavLink to={props.to} name={props.name} href="#">{props.children}</NavLink></li>
    </div>
  )
}

export default MenuItem