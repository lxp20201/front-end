import gql from 'graphql-tag';

export const login = gql`
mutation login($password:String!, $email:String!){
        login(password:$password, email:$email, remember: false) {
          data{
            success
            message
  }
      }
}`;

export const signin = gql`
mutation signin(
  $email:String!,$name:String!$username:String!,
  $honor_code:Boolean!,
  $terms_of_service:Boolean!,$password:String!,
  $organization:String!,$mobile:String!,
  $confirmpassword:String!$is_staff:Boolean!,){

  signin(email:$email,name : $name,
  username:$username,honor_code:$honor_code,
  terms_of_service:$terms_of_service,password:$password, organization:$organization,
  mobile:$mobile,confirmpassword:$confirmpassword,is_staff:$is_staff) {

  data{
    success
    message
    csrftoken
      user_detail{
        username
        email
        _id
        name
      }
  }
}
}`;


