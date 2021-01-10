import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sale } from '../models';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyName:string = ""
  sales:Sale[]
  salesStream:Subscription
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.salesStream  = this.route.params.subscribe(params => {
      this.companyName = params.id
    })
  }
  ngOnDestroy(){
    this.salesStream.unsubscribe()
  }
}
