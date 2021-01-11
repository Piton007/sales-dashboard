import { Component, Input, OnInit } from '@angular/core';
import SaleRecord from "../../viewmodels/saleRecord";
import {Table} from "../../utils/sortableTable"
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Subscription } from 'rxjs';

type SortColumn = keyof SaleRecord;


@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent extends Table<SortColumn> implements OnInit {

  @Input() name:string  = ""

  constructor(private firestoreService: FirestoreService) { 
    super();
    
  }
  sales:Subscription


  ngOnInit(): void {
    this.sales =  this.firestoreService.getSalesByCompany(this.name).subscribe(sales => {
      this._data = sales
      this.data = this._data
    })

  }
    
  ngOnDestroy(){
    this.sales.unsubscribe()
  }
}
