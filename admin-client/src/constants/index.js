/*
* ==========================================================
*                                                          |
*                     Client ROUTES                        |
*                 (Prawira Genestonlia)                    |
*                                                          |
* ==========================================================
*/

//SERVER EXTENDED URL
export const SERVER_BASE_URL = "/admin/";
export const SERVER_BASE_URL_SHORT = "/admin";

//PUBLIC ROUTE
export const LOGIN_URL = "/login/";
export const REDIRECT_URL = "/load-role/";
export const CLUB_STANDALONE_URL = "/club/";
export const CLUB_ALL_STANDALONE_URL = "/all-clubs/";
export const EVENT_STANDALONE_URL = "/event/";

//USER UTILITY ROUTE
export const USER_CHANGEPASSWORD_URL = "/user/changepasswordwithoutemail";

//ADMIN APP ROUTE
export const ADMIN_EXTENDED_URL = "/app/";
export const ADMIN_LOGIN_URL = "/app/login/";
export const ADMIN_DASHBOARD_URL = "/app/dashboard/";
export const ADMIN_USERMANAGEMENT_URL = "/app/user-management/";
export const ADMIN_EVENTMANAGEMENT_URL = "/app/event-management/";
export const ADMIN_MENTORING_URL = "/app/mentoring/";
export const ADMIN_SENIORBUDDY_URL = "/app/senior-buddy/";
export const ADMIN_INFORMATION_URL = "/app/information/";
export const ADMIN_PROFILE_URL = "/app/profile/";
export const EDITOR_URL = "/app/editor/";
export const EVENT_EDITOR_URL = "/app/event-editor/";
export const CLUB_INFO_URL = "/app/club-information/";
export const CALENDAR_OF_EVENTS = "/app/calendar-of-events/";

//STUDENT PWA ROUTE
export const STUDENT_EXTENDED_URL = "https://e3vis.x-dream.tech/main/";
export const STUDENT_HOME_URL = "https://e3vis.x-dream.tech/main/";

/*
* ==========================================================
*                                                          |
*                       API ROUTES                         |
*                 (Prawira Genestonlia)                    |
*                                                          |
* ==========================================================
*/

//SERVER URL
export const SERVERURL = "https://e3vis.x-dream.tech/api";

//PUBLIC API - NON TOKEN
export const LOGIN = "/user/login";

//PUBLIC API - TOKEN
export const GETROLE = "/get-user/role";
export const GETEMAIL = "/get-user/email";

//ADMIN - USER API
export const ADDUSER = "/admin-user/add-user";          //C
export const GETALLUSERS = "/admin-user/get-all-user";  //R
export const UPDATEUSER = "/admin-user/update-user";    //U
export const DELETEUSER = "/admin-user/delete-user";    //D

//ADMIN - CLUB API
export const CREATECLUB = "/club-admin/create-club";    //C
export const GETCLUB = "/club-admin/get-clubs";         //R
export const UPDATECLUB = "/club-admin/edit-club";      //U

//ADMIN - EVENT API
export const CREATEEVENT = "/event/create-event";       //C
export const GETEVENT = "/event/get-events";            //R
export const UPDATEEVENT = "/event/edit-event";         //U
export const DELETEEVENT = "/event/delete-event";       //D

//UPLOAD API
export const UPLOADIMAGE = "/upload-image/image";       //C

//MENTORING API
export const ADDMENTOR = "/mentor/add-mentor";          //C
export const GETALLMENTORS = "/mentor/get-all-mentor";  //R
export const GETSPECIFICMENTOR = "/mentor/get-mentor";  //R
export const GETSPECIFICSTUDENT = "/mentor/get-student";//R
export const DELETEALLMENTORS = "/mentor/clear-mentor"; //D

//SENIOR BUDDY API
export const ADDSENIORBUDDY = "/senior-buddy/add-senior-buddy";          //C
export const GETALLSENIORBUDDYS = "/senior-buddy/get-all-senior-buddy";  //R
export const GETSPECIFICSENIORBUDDY = "/senior-buddy/get-senior-buddy";  //R
export const GETSPECIFICSTUDENTSB = "/senior-buddy/get-senior-buddy";    //R
export const DELETEALLSENIORBUDDYS = "/senior-buddy/clear-senior-buddy"; //D