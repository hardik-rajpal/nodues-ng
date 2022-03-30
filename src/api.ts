export const API = {
    LoggedInUser: 'api/accounts/get-user',
    Login:'api/accounts{?code,redir}',
    Logout:'api/accounts/logout',
    SubmitFile:'api/records/',
    uploadProof:'api/upload/proof',
    submitInquiry:'api/inquiry',//POST
    inquiriesByAdmin:'api/inquiry{?userID}'//GET
}