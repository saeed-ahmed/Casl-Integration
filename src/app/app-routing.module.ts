import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path: 'article', component:ArticleComponent},
  {path: 'payment', component:PaymentComponent},
  {path: 'payment-history', component: PaymentHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
