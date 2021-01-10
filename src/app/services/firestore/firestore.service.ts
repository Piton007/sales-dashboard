import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"
import {Sale} from "../../models"
import {TotalSales} from "../../viewmodels"

import {AngularFirestore} from "@angular/fire/firestore"; 

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getTotalSalesByCompany(){
    return this.firestore.collection<Sale>('sales').valueChanges().pipe(map(sales=>{
     return sales.reduce((_acc,sale)=>{
       const current = _acc[sale.nameAgency]
      if (current){
        _acc[sale.nameAgency] = {
          totalSales: current.totalSales + sale.finalPrice, 
          commission: current.commission + sale.finalPrice * 0.025,
          sales:current.sales.concat({clientName:sale.name,amount:sale.finalPrice,day:sale.day,hour:sale.hour,people:sale.persons})
        }
      }else{
        _acc[sale.nameAgency] = {totalSales:sale.finalPrice,commission:sale.finalPrice * 0.025,sales: [{clientName:sale.name,amount:sale.finalPrice,day:sale.day,hour:sale.hour,people:sale.persons}]}  
      }
      return _acc 
      },{} as TotalSales)
    }))
  }


  

}
