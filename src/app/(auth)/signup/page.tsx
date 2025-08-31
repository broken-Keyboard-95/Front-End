
import Choose from '../Choose'


export default function Register() {



    const linkComponents= [
          {text:"create User account", href:"/"},
          {text:"create Doctor account", href:"/"},
          {text:"create Pharmce account", href:"/"},
    ]


  return (
    <div className='px-8'> 
        <Choose linkComponents={linkComponents}/>
    </div>
    
  )
}
