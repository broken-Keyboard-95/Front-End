"use server"

export const login = async (_:any, formData:FormData) => {

    const email = formData.get('email') as string 
    const password = formData.get('password') as string 
     

    interface errorsOBJ{ [key:string] : string }
    let errors:errorsOBJ = {}


    /////////////////// check data befor call back-end

    // check email
    if(!email) errors.email = "email is required"
    else if(! (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.email = "invalid email"
    
    
    // check password
    if(!password) errors.password = "password is required" 
    else if(password.length < 8) errors.password = "short password" 



    const prevData = {email, password}
    if(Object.keys(errors).length > 0) {
        console.log(errors)
        return {errors, goToVerifyCode:false, prevData}
    }



}



    
