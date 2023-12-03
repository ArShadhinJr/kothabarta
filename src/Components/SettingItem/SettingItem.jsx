

const SettingItem = (props) => {
  return (
    <li>
        <div className="flex items-center gap-x-6">
            <span className="text-2xl">{props.icon}</span>
            <p className="text-lg">{props.name}</p>
        </div>
    </li>
  )
}

export default SettingItem