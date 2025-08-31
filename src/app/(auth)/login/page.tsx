
import Choose from '../Choose'


export default function LogIn() {

    const linkComponents= [
          {text:"User account", href:"/"},
          {text:"Doctor account", href:"/"},
          {text:"Pharmce account", href:"/"},
    ]

  return (
    <div className='px-8'> <Choose linkComponents={linkComponents}/> </div>
  )
}
