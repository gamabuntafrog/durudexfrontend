import {gql} from '@apollo/client';


export const GET_POST = gql`
    query GetPost($id: ID! = "1") {
      post(id: $id) {
        text
        createdAt
        updatedAt
        attachments
        author {
          id
        }
      }
    }

`
