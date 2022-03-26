export const API = {
    LoggedInUser: 'api/login/get-user',
    Login:'api/login{?code,redir}',
    Logout:'api/logout',
    SubmitFile:'api/requirements/',
    uploadProof:'api/upload/proof',
    submitInquiry:'api/inquiry',//POST
    inquiriesByAdmin:'api/inquiry{?userID}'//GET
}