var ApiMessages = function () { };
ApiMessages.EMAIL_NOT_FOUND = { code: 0, text: "EMAIL_NOT_FOUND" };
ApiMessages.INVALID_PWD = { code: 1, text: "INVALID_PWD" };
ApiMessages.DB_ERROR = { code: 3, text: "DB_ERROR" };
ApiMessages.NOT_FOUND = { code: 4, text: "NOT_FOUND" };
ApiMessages.EMAIL_ALREADY_EXISTS = { code: 5, text: "EMAIL_ALREADY_EXISTS" };
ApiMessages.COULD_NOT_CREATE_USER = { code: 6, text: "COULD_NOT_CREATE_USER" };
ApiMessages.PASSWORD_RESET_EXPIRED = { code: 7, text: "PASSWORD_RESET_EXPIRED" };
ApiMessages.PASSWORD_RESET_HASH_MISMATCH = { code: 8, text: "PASSWORD_RESET_HASH_MISMATCH" };
ApiMessages.PASSWORD_RESET_EMAIL_MISMATCH = { code: 9, text: "PASSWORD_RESET_EMAIL_MISMATCH" };
ApiMessages.COULD_NOT_RESET_PASSWORD = { code: 10, text: "COULD_NOT_RESET_PASSWORD" };

ApiMessages.COULD_NOT_SAVE_TOKEN = { code: 100, text: "COULD_NOT_SAVE_TOKEN" };//100; 

ApiMessages.UPDATED = { code: 1000, text: "UPDATED" }; //1000;
ApiMessages.NOT_CHANGED = { code: 1001, text: "NOT_CHANGED" }; //1001;
ApiMessages.INVALID_OPERATION = { code: 1002, text: "INVALID_OPERATION" };//1002;
ApiMessages.DELETED = { code: 1003, text: "DELETED" };//1003;
ApiMessages.ALREADY_EXISTS = { code: 1004, text: "ALREADY_EXISTS" };//1004;
ApiMessages.COULD_NOT_CREATE = { code: 1005, text: "COULD_NOT_CREATE" };//1005;
ApiMessages.EMPTY_QUERY = { code: 1006, text: "EMPTY_QUERY" };//1006;

module.exports = ApiMessages;
