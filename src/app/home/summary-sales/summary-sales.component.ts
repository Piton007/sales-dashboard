import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { CompanyInfo } from 'src/app/viewmodels/totalSalesByCompany';
import { Table } from "../../utils/sortableTable"


type TotalSalesRecord = { name: string } & CompanyInfo

type SortColumn = keyof Omit<TotalSalesRecord, 'sales'> | '';

@Component({
  selector: 'app-summary-sales',
  templateUrl: './summary-sales.component.html',
  styleUrls: ['./summary-sales.component.css']
})
export class SummarySalesTable extends Table<SortColumn> implements OnInit {

  constructor(private firestoreService: FirestoreService, private route: Router) {
    super()
  }
  totalSales: Subscription

  ngOnInit(): void {

    this.totalSales = this.firestoreService.getTotalSalesByCompany().subscribe((companies) => {
      this._data = companies
      this.data = this._data

    })

  }

  onClick(record: TotalSalesRecord) {

    this.route.navigate([`/empresas/${record.name}`])
  }
  ngOnDestroy() {
    this.totalSales.unsubscribe()

  }



}
