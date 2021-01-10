import { Injectable } from '@angular/core';
import {map, reduce} from "rxjs/operators"
import {Sale} from "../../models"
import {TotalSales} from "../../viewmodels"

import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore"; 

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getTotalSalesByCompany(){
    return this.firestore.collection<Sale>('sales').valueChanges().pipe(map(sales=>{
      const hey = sales.reduce((_acc,sale)=>{
        const doc = sale
      if (_acc[doc.nameAgency]){
        _acc[doc.nameAgency] = {totalSales:_acc[doc.nameAgency].totalSales + doc.finalPrice, commission: _acc[doc.nameAgency].commission + doc.finalPrice * 0.025}
      }else{
        _acc[doc.nameAgency] = {totalSales:doc.finalPrice,commission:doc.finalPrice * 0.025}  
      }
      return _acc 
      },{})
   
      return hey
    }))
  }


  

}
