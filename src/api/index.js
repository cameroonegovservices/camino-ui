import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// for safari 11
import fetch from 'unfetch'

import queryTitres from './queries/titres'
import queryTitre from './queries/titre'

const graphqlClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.VUE_APP_API_URL, fetch }),
  cache: new InMemoryCache()
})

console.log('api:', process.env.VUE_APP_API_URL)

const titres = async ({ typeIds, domaineIds, statutIds, substances, noms }) => {
  const res = await graphqlClient.query({
    query: queryTitres,
    variables: {
      typeIds,
      domaineIds,
      statutIds,
      substances,
      noms
    }
  })

  return res.data
}

const titre = async id => {
  const res = await graphqlClient.query({
    query: queryTitre,
    variables: { id }
  })

  return res.data.titre
}

export { titres, titre }
