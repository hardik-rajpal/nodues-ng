export interface User{
    rollNumber:string;
    userID:string;
}
export interface Department{
    deparmentID:string;
    departmentName:string;
    contactDetails:string;//email, number, address
}
export interface DueCategory{
    //department by id;
    departmentID:string;
    status:string;
    balance:number;
    comments:string;
}
export interface Inquiry{
    departmentID:string;
    comment:string;
    status:number;
    studentID:string;
    document:string;
}