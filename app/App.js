import React, {PureComponent} from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import AppRouter from './views/AppRouter';

const client = new ApolloClient({
        link: new HttpLink({
            uri: "https://c76ea342.ngrok.io/graphql",
            credentials: 'same-origin'
        }),
        cache: new InMemoryCache()
    }
)

export default class App extends PureComponent {
    render() {
        return (
            <ApolloProvider client={client}>
                <AppRouter {...this.props} />
            </ApolloProvider>
        );
    }
}