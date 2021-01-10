import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {CompanyInfo} from 'src/app/viewmodels/totalSalesByCompany';
import {Table} from "../../utils/sortableTable"

interface BestCompany {
  name:string,
  amount:number
}
type TotalSalesRecord = {name:string} & CompanyInfo

type SortColumn = keyof Omit<TotalSalesRecord,'sales'> | '';

@Component({
  selector: 'app-summary-sales',
  templateUrl: './summary-sales.component.html',
  styleUrls: ['./summary-sales.component.css']
})
export class SummarySalesComponent extends Table<SortColumn> implements OnInit {

  constructor(private firestoreService: FirestoreService,private route:Router) {
    super()
   }
   totalSales:Subscription
   _sellingMonth:Subscription
   bestCompany?:BestCompany
   sellingMonth:string = ""

  ngOnInit(): void {

    this.totalSales = this.firestoreService.getTotalSalesByCompany().subscribe((companies)=>{
      this._data = companies
      this.data = this._data
      this.bestCompany = {name:companies[0].name,amount:companies[0].totalSales}
    })
    this._sellingMonth = this.firestoreService.getBestSellingMonth().subscribe((companies)=>{
      this.sellingMonth = companies[0].name
    })
  }

  onClick(record:TotalSalesRecord){
    
    this.route.navigate([`/empresas/${record.name}`])
  }
  ngOnDestroy(){
    this.totalSales.unsubscribe()
    this._sellingMonth.unsubscribe()
  }



}
