import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import SaleRecord from "../../viewmodels/saleRecord";
import {Table} from "../../utils/sortableTable"
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Subscription } from 'rxjs';

type SortColumn = keyof Pick<SaleRecord,'persons'|'finalPrice'> | '';


@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent extends Table<SortColumn> implements OnInit {


  companyName:string = ""

  constructor(private route:ActivatedRoute,private firestoreService: FirestoreService) { 
    super();
    
  }
  sales:Subscription


  ngOnInit(): void {
    this.sales  = this.route.params.subscribe(params => {
      this.companyName = params.id
      this.firestoreService.getSalesByCompany(params.id).subscribe(sales => {
        this.data = sales 
      })
    })
  }
    
  ngOnDestroy(){
    this.sales.unsubscribe()
  }
}
