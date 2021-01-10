import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../services/firestore/firestore.service';

interface BestCompany {
  name:string,
  amount:number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalSales:Subscription
  _sellingMonth:Subscription
  bestCompany?:BestCompany
  sellingMonth:string = ""
  companies:string = ""
  
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.totalSales = this.firestoreService.getTotalSalesByCompany().subscribe((companies)=>{
      this.bestCompany = {name:companies[0].name,amount:companies[0].totalSales}
    })
    this._sellingMonth = this.firestoreService.getBestSellingMonth().subscribe((companies)=>{
      this.sellingMonth = companies[0].name
    })
  }
  ngOnDestroy() {
    this.totalSales.unsubscribe()
    this._sellingMonth.unsubscribe()

  }

}
