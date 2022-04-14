export const API = {
    LoggedInUser: 'api/accounts/get-user',
    Login:'api/accounts{?code,redir}',
    Logout:'api/accounts/logout',
    SubmitFile:'api/records/',
    uploadProof:'api/records/upload',
    clearBalance:'api/records/clear',
    submitquery:'api/records/query',//POST
    query:'api/records/query{?userID}'//GET, //PUT=>responding to query.
}