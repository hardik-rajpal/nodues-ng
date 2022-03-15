export const API = {
    LoggedInUser: 'login/get-user',
    Login:'login{?code,redir}',
    Logout:'api/logout',
    SubmitFile:'api/records',
    submitInquiry:'api/inquiry',//POST
    inquiriesByAdmin:'api/inquiry{?userID}'//GET
}