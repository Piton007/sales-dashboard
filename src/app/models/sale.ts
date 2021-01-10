export default interface Sale {
    createdAt:Date;
    datePayment:Date;
    day:string;
    finalPrice:number;
    hour:string;
    name:string,
    nameAgency:string,
    paymentStatus:string,
    persons:number,
    timeZone:string
}