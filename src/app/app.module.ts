import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SummarySalesComponent} from "./home/summary-sales/summary-sales.component"
import {environment} from "../environments/environment";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesTableComponent } from './company/sales-table/sales-table.component';
import { NgbdSortableHeader } from './utils/sortableTable';

@NgModule({
  declarations: [
    AppComponent,
    NgbdSortableHeader,
    SummarySalesComponent,
    SalesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
