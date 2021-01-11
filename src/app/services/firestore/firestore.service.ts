import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"
import {parse} from "date-fns"
import {Sale} from "../../models"
import {TotalSales} from "../../viewmodels"

import {AngularFirestore} from "@angular/fire/firestore"; 
import { Observable } from 'rxjs';
import { getMonthName } from 'src/app/utils/formatDate';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private source:Observable<Sale[]>

  constructor(
    private firestore: AngularFirestore
  ) { 

    this.source = this.firestore.collection<Sale>('sales').valueChanges()
  }

  public getTotalSalesByCompany(){
    return this.source.pipe(map(sales=>this._agreggateByTotalAndComission(sales)),
    map(company => Object.keys(company).map(k => ({name:k,...company[k]}))),
    map(x=>x.sort((a,b)=>  b.totalSales - a.totalSales )))
  }

  public getSalesByCompany(name:string){
    
    return this.source.pipe(map(x=>x.filter(x=>x.nameAgency === name)),map((x=>x.sort((a,b)=>b.finalPrice - a.finalPrice))))
  }

  public getBestSellingMonth(){
    return this.source
    .pipe(
      map(sales=>this._agreggateByMonth(sales)),
      map(company => Object.keys(company).map(k => ({name:k,...company[k]}))),
      map(x=>x.sort((a,b)=>  b.totalSales - a.totalSales ))
    )
  }

  
  private _agreggateByMonth(sales:Sale[]){
    return sales.reduce((_acc,sale)=>{
      const month = getMonthName(sale.datePayment)
      const current = _acc[month]
     if (current){
       _acc[month] = {
         totalSales: current.totalSales + sale.finalPrice, 
         commission: current.commission + sale.finalPrice * 0.025
       }
     }else{
       _acc[month] = {totalSales:sale.finalPrice,commission:sale.finalPrice * 0.025}  
     }
     return _acc 
     },{} as TotalSales)
  }

  private _agreggateByTotalAndComission(sales:Sale[]){
    return sales.reduce((_acc,sale)=>{
      
      const current = _acc[sale.nameAgency]
     if (current){
       _acc[sale.nameAgency] = {
         totalSales: current.totalSales + sale.finalPrice, 
         commission: current.commission + sale.finalPrice * 0.025
       }
     }else{
       _acc[sale.nameAgency] = {totalSales:sale.finalPrice,commission:sale.finalPrice * 0.025}  
     }
     return _acc 
     },{} as TotalSales)
  }
  

}
