import gql from 'graphql-tag'
import fragmentPermission from './permission'

const fragmentUtilisateur = gql`
  fragment utilisateur on Utilisateur {
    id
    email
    nom
    prenom
    telephoneMobile
    telephoneFixe
    administration {
      id
      nom
    }
    entreprise {
      id
      legalSiren
      nom
      etablissements {
        id
        nom
      }
    }
    permission {
      ...permission
    }
  }

  ${fragmentPermission}
`

const fragmentUtilisateurToken = gql`
  fragment utilisateurToken on UtilisateurToken {
    utilisateur {
      id
      nom
      prenom
      email
      permission {
        id
        nom
      }
      entreprise {
        id
        nom
        etablissements {
          id
          nom
        }
      }
    }
    token
  }
`

export { fragmentUtilisateur, fragmentUtilisateurToken }
