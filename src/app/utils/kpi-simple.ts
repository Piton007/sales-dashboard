export class KPISimple<T> {
    isDataAvailable:boolean = false
    data:T 
    ngDoCheck(): void {
        if(!!this.data){
          this.isDataAvailable = true
         
        }
      }

}