var ACCEPT_HANDOVER = '打开另一个APP时允许通话继续';
var ACCESS_BACKGROUND_LOCATION = '在后台访问位置';
var ACCESS_COARSE_LOCATION = '获取粗略位置';
var ACCESS_FINE_LOCATION = '获取精确位置';
var ACCESS_MEDIA_LOCATION = '获取用户共享的位置';
var ACTIVITY_RECOGNITION = '识别物理活动';
var ADD_VOICEMAIL = '添加语音邮件';
var ANSWER_PHONE_CALLS = '接听来电';
var BODY_SENSORS = '访问身体传感器数据';
var CALL_PHONE = '拨打电话';
var CAMERA = '拍照';
var GET_ACCOUNTS = '访问系统账户列表';
var PROCESS_OUTGOING_CALLS = '处理拨出电话';
var QUERY_ALL_PACKAGES = '允许查询设备上的任何应用';
var READ_CALENDAR = '读取日程提醒';
var READ_CALL_LOG = '读取通话记录';
var READ_CONTACTS = '读取联系人';
var READ_EXTERNAL_STORAGE = '读取外部存储';
var READ_PHONE_NUMBERS = '读取电话号码';
var READ_PHONE_STATE = '读取电话状态';
var READ_PRECISE_PHONE_STATE = '读取精确电话状态';
var READ_SMS = '读取短信内容';
var RECEIVE_MMS = '接收彩信';
var RECEIVE_SMS = '接收短信';
var RECEIVE_WAP_PUSH = '接收Wap_Push推送';
var RECORD_AUDIO = '录音';
var SEND_SMS = '发送短信';
var USE_SIP = '使用SIP服务';
var WRITE_CALENDAR = '写入日程提醒';
var WRITE_CALL_LOG = '写入通话记录';
var WRITE_CONTACTS = '写入联系人';
var WRITE_EXTERNAL_STORAGE = '写入外部存储';
var WRITE_SMS = '编写短信';

setImmediate(function () {
    checkPermission();
});

// adb forward tcp:27043 tcp:27043
// frida -U -f com.jingdian.tianxiameishi.android -l checkPermission.js --no-pause
function checkPermission() {
    Java.perform(function () {
        /*
        // 过于底层了，hook不到
                var permissionManager = Java.use("android.permission.PermissionManager");
                permissionManager.checkPermission.implementation = function(permission, pid, uid){
                    var result = this.checkPermission(permission, pid, uid);
                    console.log(permission);
                    return result;
                };
        */

        var contextImpl = Java.use("android.app.ContextImpl");
        contextImpl.checkPermission.overload('java.lang.String', 'int', 'int').implementation = function (permission, pid, uid) {
            var result = this.checkPermission(permission, pid, uid);
            var permissionName = permission.slice(19, permission.length);
            var permissionNameCN = getPermissionNameCN(permissionName);
            // var permissionNameCN = getPermission(permission);
            console.log(getNowFormatTime() + " " + permission + " = " + permissionNameCN);
            return result;
        };


    });
}

function getPermission(permission) {
    var permissionNameCN = "";
    if (permission.endsWith("ACCEPT_HANDOVER")) {
        permissionNameCN = ACCEPT_HANDOVER;
    } else if (permission.endsWith("ACCESS_BACKGROUND_LOCATION")) {
        permissionNameCN = ACCESS_BACKGROUND_LOCATION;
    } else if (permission.endsWith("ACCESS_COARSE_LOCATION")) {
        permissionNameCN = ACCESS_COARSE_LOCATION;
    } else if (permission.endsWith("ACCESS_FINE_LOCATION")) {
        permissionNameCN = ACCESS_FINE_LOCATION;
    } else if (permission.endsWith("ACCESS_MEDIA_LOCATION")) {
        permissionNameCN = ACCESS_MEDIA_LOCATION;
    } else if (permission.endsWith("ACTIVITY_RECOGNITION")) {
        permissionNameCN = ACTIVITY_RECOGNITION;
    } else if (permission.endsWith("ADD_VOICEMAIL")) {
        permissionNameCN = ADD_VOICEMAIL;
    } else if (permission.endsWith("ANSWER_PHONE_CALLS")) {
        permissionNameCN = ANSWER_PHONE_CALLS;
    } else if (permission.endsWith("BODY_SENSORS")) {
        permissionNameCN = BODY_SENSORS;
    } else if (permission.endsWith("CALL_PHONE")) {
        permissionNameCN = CALL_PHONE;
    } else if (permission.endsWith("CAMERA")) {
        permissionNameCN = CAMERA;
    } else if (permission.endsWith("GET_ACCOUNTS")) {
        permissionNameCN = GET_ACCOUNTS;
    } else if (permission.endsWith("PROCESS_OUTGOING_CALLS")) {
        permissionNameCN = PROCESS_OUTGOING_CALLS;
    } else if (permission.endsWith("QUERY_ALL_PACKAGES")) {
        permissionNameCN = QUERY_ALL_PACKAGES;
    } else if (permission.endsWith("READ_CALENDAR")) {
        permissionNameCN = READ_CALENDAR;
    } else if (permission.endsWith("READ_CALL_LOG")) {
        permissionNameCN = READ_CALL_LOG;
    } else if (permission.endsWith("READ_CONTACTS")) {
        permissionNameCN = READ_CONTACTS;
    } else if (permission.endsWith("READ_EXTERNAL_STORAGE")) {
        permissionNameCN = READ_EXTERNAL_STORAGE;
    } else if (permission.endsWith("READ_PHONE_NUMBERS")) {
        permissionNameCN = READ_PHONE_NUMBERS;
    } else if (permission.endsWith("READ_PHONE_STATE")) {
        permissionNameCN = READ_PHONE_STATE;
    } else if (permission.endsWith("READ_PRECISE_PHONE_STATE")) {
        permissionNameCN = READ_PRECISE_PHONE_STATE;
    } else if (permission.endsWith("READ_SMS")) {
        permissionNameCN = READ_SMS;
    } else if (permission.endsWith("RECEIVE_MMS")) {
        permissionNameCN = RECEIVE_MMS;
    } else if (permission.endsWith("RECEIVE_SMS")) {
        permissionNameCN = RECEIVE_SMS;
    } else if (permission.endsWith("RECEIVE_WAP_PUSH")) {
        permissionNameCN = RECEIVE_WAP_PUSH;
    } else if (permission.endsWith("RECORD_AUDIO")) {
        permissionNameCN = RECORD_AUDIO;
    } else if (permission.endsWith("SEND_SMS")) {
        permissionNameCN = SEND_SMS;
    } else if (permission.endsWith("USE_SIP")) {
        permissionNameCN = USE_SIP;
    } else if (permission.endsWith("WRITE_CALENDAR")) {
        permissionNameCN = WRITE_CALENDAR;
    } else if (permission.endsWith("WRITE_CALL_LOG")) {
        permissionNameCN = WRITE_CALL_LOG;
    } else if (permission.endsWith("WRITE_CONTACTS")) {
        permissionNameCN = WRITE_CONTACTS;
    } else if (permission.endsWith("WRITE_EXTERNAL_STORAGE")) {
        permissionNameCN = WRITE_EXTERNAL_STORAGE;
    } else if (permission.endsWith("WRITE_SMS")) {
        permissionNameCN = WRITE_SMS;
    } else {
        permissionNameCN = permission.slice(19, permission.length - 1);
    }
    return permissionNameCN;

}

function getPermissionNameCN(permissionName) {
    var permissionNameCN = '';
    switch (permissionName) {
        case "ACCEPT_HANDOVER":
            permissionNameCN = ACCEPT_HANDOVER;
            break;
        case "ACCESS_BACKGROUND_LOCATION":
            permissionNameCN = ACCESS_BACKGROUND_LOCATION;
            break;
        case "ACCESS_COARSE_LOCATION":
            permissionNameCN = ACCESS_COARSE_LOCATION;
            break;
        case "ACCESS_FINE_LOCATION":
            permissionNameCN = ACCESS_FINE_LOCATION;
            break;
        case "ACCESS_MEDIA_LOCATION":
            permissionNameCN = ACCESS_MEDIA_LOCATION;
            break;
        case "ACTIVITY_RECOGNITION":
            permissionNameCN = ACTIVITY_RECOGNITION;
            break;
        case "ADD_VOICEMAIL":
            permissionNameCN = ADD_VOICEMAIL;
            break;
        case "ANSWER_PHONE_CALLS":
            permissionNameCN = ANSWER_PHONE_CALLS;
            break;
        case "BODY_SENSORS":
            permissionNameCN = BODY_SENSORS;
            break;
        case "CALL_PHONE":
            permissionNameCN = CALL_PHONE;
            break;
        case "CAMERA":
            permissionNameCN = CAMERA;
            break;
        case "GET_ACCOUNTS":
            permissionNameCN = GET_ACCOUNTS;
            break;
        case "PROCESS_OUTGOING_CALLS":
            permissionNameCN = PROCESS_OUTGOING_CALLS;
            break;
        case "QUERY_ALL_PACKAGES":
            permissionNameCN = QUERY_ALL_PACKAGES;
            break;
        case "READ_CALENDAR":
            permissionNameCN = READ_CALENDAR;
            break;
        case "READ_CALL_LOG":
            permissionNameCN = READ_CALL_LOG;
            break;
        case "READ_CONTACTS":
            permissionNameCN = READ_CONTACTS;
            break;
        case "READ_EXTERNAL_STORAGE":
            permissionNameCN = READ_EXTERNAL_STORAGE;
            break;
        case "READ_PHONE_NUMBERS":
            permissionNameCN = READ_PHONE_NUMBERS;
            break;
        case "READ_PHONE_STATE":
            permissionNameCN = READ_PHONE_STATE;
            break;
        case "READ_PRECISE_PHONE_STATE":
            permissionNameCN = READ_PRECISE_PHONE_STATE;
            break;
        case "READ_SMS":
            permissionNameCN = READ_SMS;
            break;
        case "RECEIVE_MMS":
            permissionNameCN = RECEIVE_MMS;
            break;
        case "RECEIVE_SMS":
            permissionNameCN = RECEIVE_SMS;
            break;
        case "RECEIVE_WAP_PUSH":
            permissionNameCN = RECEIVE_WAP_PUSH;
            break;
        case "RECORD_AUDIO":
            permissionNameCN = RECORD_AUDIO;
            break;
        case "SEND_SMS":
            permissionNameCN = SEND_SMS;
            break;
        case "USE_SIP":
            permissionNameCN = USE_SIP;
            break;
        case "WRITE_CALENDAR":
            permissionNameCN = WRITE_CALENDAR;
            break;
        case "WRITE_CALL_LOG":
            permissionNameCN = WRITE_CALL_LOG;
            break;
        case "WRITE_CONTACTS":
            permissionNameCN = WRITE_CONTACTS;
            break;
        case "WRITE_EXTERNAL_STORAGE":
            permissionNameCN = WRITE_EXTERNAL_STORAGE;
            break;
        case "WRITE_SMS":
            permissionNameCN = WRITE_SMS;
            break;
        default:
            permissionNameCN = permissionName;
            break;

    }
    return permissionNameCN;

}



//调用方法
function printStack() {
    Java.perform(function () {
        var Exception = Java.use("java.lang.Exception");
        var ins = Exception.$new("Exception");
        var straces = ins.getStackTrace();
        if (straces != undefined && straces != null) {
            var strace = straces.toString();
            var replaceStr = strace.replace(/,/g, "\r\n");
            console.log("=============================Stack strat=======================");
            console.log(replaceStr);
            console.log("=============================Stack end=======================\r\n");
            Exception.$dispose();
        }
    });
}

//获取当前日期，格式YYYY-MM-DD
function getNowFormatDay(nowDate) {
    var char = "-";
    if (nowDate == null) {
        nowDate = new Date();
    }
    var day = nowDate.getDate();
    var month = nowDate.getMonth() + 1;//注意月份需要+1
    var year = nowDate.getFullYear();
    //补全0，并拼接
    return year + char + completeDate(month) + char + completeDate(day);
}

//获取当前时间，格式YYYY-MM-DD HH:mm:ss
function getNowFormatTime() {
    var nowDate = new Date();
    var colon = ":";
    var h = nowDate.getHours();
    var m = nowDate.getMinutes();
    var s = nowDate.getSeconds();
    //补全0，并拼接
    return getNowFormatDay(nowDate) + " " + completeDate(h) + colon + completeDate(m) + colon + completeDate(s);
}

//补全0
function completeDate(value) {
    return value < 10 ? "0" + value : value;
}
