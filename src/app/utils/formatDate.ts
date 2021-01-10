import { parse } from "date-fns"

const MONTHS = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Setiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre" 
}

export function getMonthName(date:string){
    return MONTHS[parse(date,"yyyy-MM-dd HH:mm",new Date()).getMonth()]
}