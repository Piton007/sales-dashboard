import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { KPISimple } from 'src/app/utils/kpi-simple';

@Component({
  selector: 'app-bestmonth-kpi',
  templateUrl: './bestmonth-kpi.component.html',
  styleUrls: ['./bestmonth-kpi.component.css']
})
export class BestmonthKpiComponent extends KPISimple<string> implements OnInit {


  _sellingMonth:Subscription
  constructor(private firestoreService: FirestoreService) {
    super()

   }

  ngOnInit(): void {
    this._sellingMonth = this.firestoreService.getBestSellingMonth().subscribe((companies)=>{
      this.data = companies[0].name
  
    })
  }
  ngOnDestroy() {
    this._sellingMonth.unsubscribe()

  }



}
