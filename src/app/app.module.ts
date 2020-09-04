import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    HttpLinkModule,
  ],
  providers: [
    AuthService,
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: (httpLink: HttpLink) => {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: 'https://o5x5jzoo7z.sse.codesandbox.io/graphql',
    //       }),
    //     };
    //   },
    //   deps: [HttpLink],
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(apollo: Apollo, httpLink: HttpLink) {
  //   const link = httpLink.create({
  //     uri: '/graphql',
  //     withCredentials: true,
  //   });
  //   apollo.create({
  //     link,
  //     // other options like cache
  //   });
  // }
}
