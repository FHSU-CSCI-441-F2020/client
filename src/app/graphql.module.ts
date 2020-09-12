import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { environment } from '../environments/environment';
// const uri = 'https://jobkik-server.herokuapp.com/graphql';
const uri = environment.uri;
// const uri = 'http://localhost:8000/graphql';

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('jobkikToken');

  let auth;
  if (token === 'null' || token === null) {
    auth = setContext((operation, context) => ({}));
  } else {
    auth = setContext((operation, context) => ({
      headers: {
        'x-token': `${token}`,
      },
    }));
  }

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
