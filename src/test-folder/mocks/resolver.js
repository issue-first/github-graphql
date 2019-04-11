export const resolvers = {
  Query: {
    search: (parent, args) => ({
      issueCount: 10,
      edges: [
        {
          node: {
            body:
              "Mostrar una notificación emergente cuando se reciba un mensaje. Así como el número de mensajes junto a la imagen de perfil",
            updatedAt: "2019-04-06T22:13:08Z",
            title: "Title",
            url: "https://github.com/Arquisoft/dechat_es2b/issues/90",
            repository: {
              description: "Dechat ES2B",
              url: "https://github.com/Arquisoft/dechat_es2b",
              name: "dechat_es2b",
              watchers: {
                totalCount: 6
              }
            }
          }
        },
        {
          node: {
            body:
              "issue 2",
            updatedAt: "2019-04-06T22:13:08Z",
            title: "Notificaciones emergentes",
            url: "https://github.com/Arquisoft/dechat_es2b/issues/90",
            repository: {
              description: "Dechat ES2B",
              url: "https://github.com/Arquisoft/dechat_es2b",
              name: "dechat_es2b",
              watchers: {
                totalCount: 6
              }
            }
          }
        }
      ]
    })
  },
  SearchResultItem: {
    __resolveType: () => 'Issue'
  }
};

// export const schema = `
// """
// The query root of GitHub's GraphQL interface.
// """

// type Query {
//   """
//   Perform a search across resources.
//   """
//   search(
//     """
//     Returns the elements in the list that come after the specified cursor.
//     """
//     after: String

//     """
//     Returns the elements in the list that come before the specified cursor.
//     """
//     before: String

//     """
//     Returns the first _n_ elements from the list.
//     """
//     first: Int

//     """
//     Returns the last _n_ elements from the list.
//     """
//     last: Int

//     """
//     The search string to look for.
//     """
//     query: String!

//     """
//     The types of search items to search within.
//     """
//     type: SearchType!
//   ): SearchResultItemConnection!
// }

// """
// Represents the individual results of a search.
// """
// enum SearchType {
//   """
//   Returns results matching issues in repositories.
//   """
//   ISSUE

//   """
//   Returns results matching repositories.
//   """
//   REPOSITORY

//   """
//   Returns results matching users and organizations on GitHub.
//   """
//   USER
// }

// type SearchResultItemConnection {
//   """
//   The number of pieces of code that matched the search query.
//   """
//   codeCount: Int!

//   """
//   The number of issues that matched the search query.
//   """
//   issueCount: Int!

//   """
//   A list of nodes.
//   """
//   nodes: [SearchResultItem]

//   """
//   The number of repositories that matched the search query.
//   """
//   repositoryCount: Int!

//   """
//   The number of users that matched the search query.
//   """
//   userCount: Int!

//   """
//   The number of wiki pages that matched the search query.
//   """
//   wikiCount: Int!
// }

// """
// An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project.
// """
// type Issue {

//   """
//   Identifies the body of the issue.
//   """
//   body: String!

//   """
//   Identifies the body of the issue rendered to text.
//   """
//   bodyText: String!

//   """
//   A list of labels associated with the object.
//   """
//   labels(
//     """
//     Returns the elements in the list that come after the specified cursor.
//     """
//     after: String

//     """
//     Returns the elements in the list that come before the specified cursor.
//     """
//     before: String

//     """
//     Returns the first _n_ elements from the list.
//     """
//     first: Int

//     """
//     Returns the last _n_ elements from the list.
//     """
//     last: Int
//   ): LabelConnection

//   """
//   Identifies the issue number.
//   """
//   number: Int!

//   """
//   Identifies the issue title.
//   """
//   title: String!

// }

// """
// The results of a search.
// """
// union SearchResultItem = Issue

// """
// The connection type for Label.
// """
// type LabelConnection {

//   """
//   Identifies the total count of items in the connection.
//   """
//   totalCount: Int!
// }

// `;
