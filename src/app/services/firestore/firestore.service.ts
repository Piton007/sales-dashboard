import { Injectable } from '@angular/core';
import {reduce} from "rxjs/operators"
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
    return this.firestore.collection<Sale>('sales').snapshotChanges().pipe(reduce((acc,sales,index)=>{
      const doc = sales[index].payload.doc.data()
      if (acc[doc.nameAgency]){
        acc[doc.nameAgency] = {totalSales:acc[doc.nameAgency].totalSales + doc.finalPrice, commisssion: acc[doc.nameAgency].commisssion + doc.finalPrice * 0.025}
      }else{
        acc[doc.nameAgency] = {totalSales:doc.finalPrice,commisssion:doc.finalPrice * 0.025}  
      }
      return acc 
    },{} as TotalSales))
  }


  

}
