import gql from "graphql-tag";

export const login = gql`
  mutation login($password: String!, $email: String!, $is_staff: Boolean!) {
    login(
      password: $password
      email: $email
      remember: false
      is_staff: $is_staff
    ) {
      success
      message
      csrftoken
      username
      email
      _id
      name
      is_staff
      # data {
      #   success
      #   message
      #   user_detail {
      #     username
      #     email
      #     _id
      #     name
      #     is_staff
      #   }
      # }
    }
  }
`;

export const signin = gql`
  mutation signin(
    $email: String!
    $name: String!
    $username: String!
    $honor_code: Boolean!
    $terms_of_service: Boolean!
    $password: String!
    $organization: String!
    $mobile: String!
    $confirmpassword: String!
    $is_staff: Boolean!
  ) {
    signin(
      email: $email
      name: $name
      username: $username
      honor_code: $honor_code
      terms_of_service: $terms_of_service
      password: $password
      organization: $organization
      mobile: $mobile
      confirmpassword: $confirmpassword
      is_staff: $is_staff
    ) {
      data {
        success
        message
        csrftoken
        user_detail {
          username
          email
          _id
          name
          is_staff
        }
      }
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($email: String!, $_id: String!) {
    updateUser(email: $email, _id: $_id) {
      data {
        success
        message
      }
    }
  }
`;

export const verifymail = gql`
  mutation verifymail(
    $email: String
    $id: String
    $name: String
    $is_staff: Boolean
  ) {
    verifymail(email: $email, _id: $id, name: $name, is_staff: $is_staff) {
      data {
        success
        message
      }
    }
  }
`;

export const admin_dashboard = gql`
  mutation admin_dashboard($is_staff: Boolean) {
    admin_dashboard(is_staff: $is_staff) {
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
  }
`;

export const resetpassword = gql`
  mutation resetpassword($email: String, $name: String, $is_staff: Boolean) {
    resetpassword(email: $email, name: $name, is_staff: $is_staff) {
      success
      message
    }
  }
`;

export const confirmpassword = gql`
  mutation confirmpassword($email: String, $password: String) {
    confirmpassword(email: $email, password: $password) {
      success
      message
    }
  }
`;

export const checklinkstatus = gql`
  mutation checklinkstatus($email: String) {
    checklinkstatus(email: $email) {
      success
      message
    }
  }
`;


export const coursecreation = gql`
  mutation coursecreation(
    $course_name: String
    $course_description: String
    $user_id: String
    $course_image: [String]
    $course_video: [String]
    $course_docs: [String]
    $org: String
    $number: String
    $run: String
  ) {
    coursecreation(
      course_name: $course_name
      course_description: $course_description
      user_id: $user_id
      course_image: $course_image
      course_video: $course_video
      course_docs: $course_docs
      org: $org
      number: $number
      run: $run
    ) {
      success
      message
      error {
        CourseErrMsg
        OrgErrMsg
        ErrMsg
      }
    }
  }
`;
