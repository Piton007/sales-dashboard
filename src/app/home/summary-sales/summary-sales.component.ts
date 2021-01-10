import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {CompanyInfo} from 'src/app/viewmodels/totalSalesByCompany';

type TotalSalesRecord = {name:string} & CompanyInfo
type SortColumn = 'name' | 'total' | '';
type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-summary-sales',
  templateUrl: './summary-sales.component.html',
  styleUrls: ['./summary-sales.component.css']
})
export class SummarySalesComponent implements OnInit {

  constructor(private firestoreService: FirestoreService) { }
  _totalSalesByCompany:TotalSalesRecord[] = []
  totalSalesByCompanySortable:TotalSalesRecord[] = []

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit(): void {
    this.firestoreService.getTotalSalesByCompany().subscribe((companies)=>{
      for(let [key,value] of companies.entries()){
        this._totalSalesByCompany.push({name:key,...value})
      }
      
    })
  }

  onSort(event:SortEvent){
    this.resetHeader(event);
    this.sorting(event)
  }


  private resetHeader({column}: SortEvent){
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  }

  private sorting({column,direction}: SortEvent){
    if (direction === '' || column === '') {
      this.totalSalesByCompanySortable = this._totalSalesByCompany;
    } else {
      this.totalSalesByCompanySortable = [...this._totalSalesByCompany].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }


}
