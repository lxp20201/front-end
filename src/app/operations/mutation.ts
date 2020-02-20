import gql from 'graphql-tag';

export const login = gql`
mutation login($password:String!, $email:String!,$is_staff:Boolean!){
        login(password:$password, email:$email, remember: false,is_staff:$is_staff) {
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
  $confirmpassword:String!$is_staff:Boolean!){

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
mutation verifymail($email:String,$id:String,$name:String){
  verifymail(email:$email, _id:$id,name : $name) {
    data{
      success
      message
    }    
  }
}`;

export const admin_dashboard = gql`
mutation admin_dashboard($is_staff:Boolean){
  admin_dashboard(is_staff:$is_staff) {
    success
    message {
      _id   
      username   
      name   
      honor_code
      terms_of_service  
      email   
      mobile    
      is_staff    
      is_active    
      is_superuser
    }   
  }
}`;

export const resetpassword = gql`
mutation resetpassword($email:String,$name:String){
  resetpassword(email:$email,name : $name) {
      success
      message
  }
}`;

export const confirmpassword = gql`
mutation confirmpassword($email:String,$password:String){
  confirmpassword(email:$email,password : $password) {
      success
      message
  }
}`;

export const checklinkstatus = gql`
mutation checklinkstatus($email:String){
  checklinkstatus(email:$email) {
      success
      message
  }
}`;

export const courseView = gql`
query getcourse($user_id:String){
  getcourse(user_id:$user_id) {
      success
      message{
        _id
        course_name
        course_description
        user_id
        org
        number
        run
        display_name
        is_active
        course_video
        course_docs
        course_image
      }
  }
}`;