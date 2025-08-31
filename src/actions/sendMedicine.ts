"use server"

interface stringObject {
    [key:string] : string
}

export const sendMedicine = async (data: stringObject) => {
    console.log(data)
    return data
}