

const SettingItem = (props) => {
  return (
    <li>
        <div className="flex items-center gap-x-6 cursor-pointer text-gray-800 hover:text-black">
            <span className="text-2xl">{props.icon}</span>
        <p className="text-lg">{props.name}</p>
        
        </div>
    </li>
  )
}

export default SettingItem