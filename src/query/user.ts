import {gql} from '@apollo/client';

export const LOGOUT = gql`
    mutation LOGOUT($token: String!) {
      signOut(input: {token: $token})
    }
`

export const LOGIN = gql`
    mutation LOGIN($username: String!, $password: String!) {
      signIn(input: {
        username: $username,
        password: $password
      }) {
          access
          refresh
      }
    }
`

export const GET_USER = gql`
    {
      me {
        username
        avatarUrl
        createdAt
        lastVisit
        verified
        id
      }
    }
`
export const CREATE_VERIFY_EMAIL_CODE = gql`
    mutation CREATE_VERIFY_EMAIL_CODE($email: String!) {
        createVerifyEmailCode(email: $email)
    }
`
export const CHANGE_PASSWORD = gql`
    mutation CHANGE_PASSWORD($email: String!, $password: String!, $code: Uint64!) {
      forgotPassword(input: {
        email: $email,
        password: $password,
        code: $code
      })
    }   
`