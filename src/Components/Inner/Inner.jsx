/* eslint-disable react/prop-types */

const Inner = (props) => {
  return (
    <div className="flex items-center justify-between pr-4 py-3 last:pb-0 border-b-gray-300 border border-x-0 border-t-0 last:border-none" key={props.index}>
        <div className="flex items-center gap-x-[20px]">
             <div>
                <img src={props.src} className="rounded-full w-[50px]" />
            </div>
            <div>
                <h3 className="text-xl font-bold">{props.name}</h3>
                <p className="text-gray-500">{props.dec}</p>
            </div>
        </div>
        <div>
            {props.children}
        </div>
    </div>
  )
}

export default Inner