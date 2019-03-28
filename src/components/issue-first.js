query {
    search(query: "label:good-first-issue is:open is:public language:javascript", type: ISSUE, first: 30) {
      issueCount 
      edges {
        node {
          ... on Issue {
            body
            labels(first: 3){
              nodes{
                color
                name
                description
                repository{
                  name
                  watchers {
                    totalCount
                  }
                  description
                  url
                  languages(first: 4){
                    nodes{
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
