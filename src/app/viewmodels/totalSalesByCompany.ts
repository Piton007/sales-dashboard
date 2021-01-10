

export interface CompanyInfo {
    totalSales:number,
    commisssion:number
}

type TotalSalesByCompany = Map<string,CompanyInfo> 


export default TotalSalesByCompany
