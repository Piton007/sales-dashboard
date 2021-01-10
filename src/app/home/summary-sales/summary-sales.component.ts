import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {CompanyInfo} from 'src/app/viewmodels/totalSalesByCompany';
import {Table} from "../../utils/sortableTable"

type TotalSalesRecord = {name:string} & CompanyInfo
type SortColumn = keyof Omit<TotalSalesRecord,'sales'> | '';

@Component({
  selector: 'app-summary-sales',
  templateUrl: './summary-sales.component.html',
  styleUrls: ['./summary-sales.component.css']
})
export class SummarySalesComponent extends Table<SortColumn> implements OnInit {

  constructor(private firestoreService: FirestoreService) {
    super()
   }


  ngOnInit(): void {

    this.firestoreService.getTotalSalesByCompany().subscribe((companies)=>{
      this._data = Object.keys(companies).map(k=>({name:k,...companies[k]}))
      this._data.sort((a,b)=>  b.totalSales - a.totalSales )
      this.data = this._data
    })
  }

  onClick(record:TotalSalesRecord){
    console.log(record.sales)
  }




}
