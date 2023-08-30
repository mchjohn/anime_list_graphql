import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query {
    Page {
      media {
        title {
          english
        }
        coverImage {
          color
          extraLarge
        }
      }
    }
  }
`