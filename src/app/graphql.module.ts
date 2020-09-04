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
// // const uri = 'https://o5x5jzoo7z.sse.codesandbox.io/graphql';
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('jobkikToken');
  console.log(token);

  let auth;
  if (token !== 'null') {
    auth = setContext((operation, context) => ({
      headers: {
        'x-token': `${token}`,
      },
    }));
  } else {
    console.log('No auth');

    auth = setContext((operation, context) => ({}));
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
