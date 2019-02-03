import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CreateProductComponent} from './products/create-product/create-product.component';
import {EditProductComponent} from './products/edit-product/edit-product.component';
import {AdminProductsComponent} from './products/admin-products/admin-products.component';
import {IndexProductsComponent} from './products/index-products/index-products.component';
import {CreateCategoryComponent} from './categories/create-category/create-category.component';
import {EditCategoryComponent} from './categories/edit-category/edit-category.component';
import {AdminCategoryComponent} from './categories/admin-category/admin-category.component';
import {IndexStoresComponent} from './stores/index-stores/index-stores.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesService} from './services/CategoriesService';
import {ProductsServices} from './services/ProductsService';
import {ProductsByCategoryComponent} from './products/products-by-category/products-by-category.component';
import {StoresService} from './services/StoresService';
import {NguiMapModule} from '@ngui/map';
import {SocketIoModule} from 'ngx-socket-io';
import {SendNotificationComponent} from './notifications/send-notification/send-notification.component';
import {MessagesServices} from './services/MessagesServices';
import {OrdersServices} from './services/OrdersService';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ViewsPipe} from './Pipes/ViewsPipe';
import {TweetsSearchComponent} from './twitter/tweets-search/tweets-search.component';
import {TweetsService} from "./services/TweetsServics";
import { SpeedometerComponent } from './speedometer/speedometer.component';

const routes: Routes = [
  {path: '', component: IndexProductsComponent},
  {path: 'products/create', component: CreateProductComponent},
  {path: 'products/edit/:id', component: EditProductComponent},
  {path: 'products/admin', component: AdminProductsComponent},
  {path: 'products/productsByCategory', component: ProductsByCategoryComponent},
  {path: 'products/details/:id', component: ProductDetailsComponent},
  {path: 'categories/create', component: CreateCategoryComponent},
  {path: 'categories/edit/:id', component: EditCategoryComponent},
  {path: 'categories/admin', component: AdminCategoryComponent},
  {path: 'stores/index', component: IndexStoresComponent},
  {path: 'notification/send', component: SendNotificationComponent},
  {path: 'tweets/search', component: TweetsSearchComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    EditProductComponent,
    AdminProductsComponent,
    IndexProductsComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    AdminCategoryComponent,
    IndexStoresComponent,
    ProductsByCategoryComponent,
    SendNotificationComponent,
    ProductDetailsComponent,
    ViewsPipe,
    TweetsSearchComponent,
    SpeedometerComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAAXZyutzornngMjFPiS7c8F5J0W8hxjX4'}),
    SocketIoModule.forRoot({url: '/', options: {}})
  ],
  providers: [ProductsServices, CategoriesService, StoresService, MessagesServices, OrdersServices, TweetsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
