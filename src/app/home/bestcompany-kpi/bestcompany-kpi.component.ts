import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { KPISimple } from 'src/app/utils/kpi-simple';


interface BestCompany {
  name:string,
  amount:number
}
@Component({
  selector: 'app-bestcompany-kpi',
  templateUrl: './bestcompany-kpi.component.html',
  styleUrls: ['./bestcompany-kpi.component.css']
})
export class BestcompanyKpiComponent extends KPISimple<BestCompany> implements OnInit {

  constructor(private firestoreService: FirestoreService) { 
    super()
  }
  
  stream:Subscription 
 
  ngOnInit(): void {
    this.stream = this.firestoreService.getTotalSalesByCompany().subscribe((companies)=>{
      this.data = {name:companies[0].name,amount:companies[0].totalSales}
    })
  }

  ngOnDestroy() {
    this.stream.unsubscribe()
  }



}
