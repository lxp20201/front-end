import gql from "graphql-tag";

export const meData = gql`
  query {
    me {
      status
      message
      user {
        id
        name
        lastname
        email
        registerDate
      }
    }
  }
`;

export const login = gql`
  mutation {
    login(email: $email, password: $password, remember: false) {
      status
      message
      token
    }
  }
`;

export const getUsers = gql`
  query {
    users {
      id
      name
      lastname
      email
      registerDate
    }
  }
`;

export const getcourse = gql`
  query getcourse($user_id: String){
    getcourse(user_id: $user_id) {
      success
      error
      message {
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
  
export const getcoursebyid = gql`
  query getcoursebyid($user_id: String, $_id: String) {
    getcoursebyid(user_id: $user_id, _id: $_id) {
      success
      error
      message {
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
  }
`;
