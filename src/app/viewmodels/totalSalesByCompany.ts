import SaleRecord from "./saleRecord"

export interface CompanyInfo {
    sales:SaleRecord[],
    totalSales:number,
    commission:number
}

type TotalSalesByCompany = {[name:string]:CompanyInfo}


export default TotalSalesByCompany
