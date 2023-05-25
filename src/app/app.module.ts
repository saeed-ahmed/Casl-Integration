import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ability, PureAbility } from '@casl/ability';
import { ArticleComponent } from './article/article.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { RunAbilityComponent } from './run-ability/run-ability.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    PaymentComponent,
    PaymentHistoryComponent,
    RunAbilityComponent,
    CardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    {provide: Ability, useValue: new Ability()},
    {provide: PureAbility, useExisting: Ability}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

