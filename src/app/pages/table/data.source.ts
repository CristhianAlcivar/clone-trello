import { CollectionViewer, DataSource} from '@angular/cdk/collections'
import { BehaviorSubject, Observable } from 'rxjs'

import { Product } from 'src/app/models/product.model'

export class DataSourceProduct extends DataSource<Product>{

  data = new BehaviorSubject<Product[]>([]);
  originalData: Product[]=[];

  connect(): Observable<Product[]> {
    return this.data;
  }
  init(products: Product[]){
    this.originalData = products;
    this.data.next(products);
  }
  getTotal(){
    const products = this.data.getValue();
    return products
        .map(item =>item.price)
        .reduce((price, total)=> price + total,0);
  }
  update(id: Product['id'], changes: Partial<Product>){
    const products = this.data.getValue();
    const productsIndex = products.findIndex(item => item.id === id)
    if(productsIndex != -1){
      products[productsIndex]={
        ...products[productsIndex],
        ...changes
      }
      this.data.next(products);
    }
  }
  find(query:string){
    const newProducts = this.originalData.filter((element) => {
      return element.title.toLowerCase().includes(query.toLowerCase()) || element.id.toString().includes(query) || element.price.toString().includes(query);
    })
    this.data.next(newProducts);
  }
  disconnect(): void {

  }
}
