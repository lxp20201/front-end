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

export const updateUser = gql`
mutation updateUser($email:String!,$_id:String!){
  updateUser(email:$email,_id:$_id) {
          data{
            success
            message
          }
      }
}`;

export const verifymail = gql`
mutation verifymail($email:String,$id:String){
  verifymail(email:$email, _id:$id) {
    data{
      success
      message
    }    
  }
}`;


//hard code value pass kr k de