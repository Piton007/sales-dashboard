import SaleRecord from "./saleRecord"

export interface CompanyInfo {
    totalSales:number,
    commission:number
}

type TotalSalesByCompany = {[name:string]:CompanyInfo}


export default TotalSalesByCompany
