setImmediate(function() {
    readhttp();
});

// frida -U -f com.jingdian.tianxiameishi.android -l readhttp.js --no-pause
function readhttp(){
    Java.perform(function(){
        
		// HttpURLConnectionImpl
		var HttpURLConnectionImpl = Java.use('com.android.okhttp.internal.huc.HttpURLConnectionImpl');

        HttpURLConnectionImpl.execute.implementation = function(readResponse){
            var result = this["execute"](readResponse);
            var httpEngine = getFieldValue(this, "httpEngine");
            
            httpEngine["readResponse"]();
            var userResponse = httpEngine.getResponse();
            // var userResponse = getFieldValue(httpEngine, "userResponse");
            parseResponse(userResponse);
            return result;
        };

    });
}

function parseResponse(userResponse){
    if(null == userResponse){
        return;
    }
    // 解析Request
    var request = userResponse.request();
    var request_method = request.method();
    var request_url = request.urlString();
    var request_headers = getFieldValue(request, "headers");
    var request_headerStr = request_headers.toString();

    /*
    var request_body = request.body();
    var request_bosyStr = "";
    if(null != request_body){
        var requestbody = Java.use(request_body.$className);
        requestbody.create.overload("com.android.okhttp.MediaType", "java.lang.String").implementation = function(contentType, content){
            var result = this.create(contentType, content);
            request_bosyStr = content;
            return result;
        };
    }
    console.log("***************************request_bosyStr: " + request_bosyStr);  // 读到的request_body都是null
    */

    // 解析Response
    var code = userResponse.code()
    var message = userResponse.message()

    var headers = getFieldValue(userResponse, "headers");
    var headerStr = headers.toString();

    var bodyObj = userResponse.body();
    var mediaTypeStr = "";
    var bodyLength = 0;
    var bodyStr = "";
    if(bodyObj != null){
        var body = Java.cast(bodyObj, Java.use(bodyObj.$className));
        var mediaType = body.contentType()
        if(mediaType != null){
            mediaTypeStr = mediaType.toString();
        }
        bodyLength = body.contentLength();
        var bodyBytes = body.bytes();
        var stringclazz = Java.use("java.lang.String");
        bodyStr = stringclazz.$new(bodyBytes);
        
    }

    console.log("----------------------------------------------- START-------------------------------------------------------------");
    console.log("REQUEST:");
    console.log("METHOD: " , request_method,"\nURL: ", request_url, "\nHEADERS:\n" , request_headerStr);
    console.log("==REQUEST END==");
    console.log("\n");

    console.log("RESPONSE:");
    console.log("\nSTATUS CODE: ", code, "\nMESSAGE: ", message, "\nHEADERS:\n" , headerStr, 
        "\nRESPONSE BODY:\n    mediaType: ", mediaTypeStr, "\n    length: ", bodyLength, "\n    body: " , bodyStr, "\n");
    console.log("==RESPONSE END==\n");
    console.log("------------------------------------------------ END--------------------------------------------------------------");
    
}

function readInputStream(inputStream){
	var str = '';
	if(inputStream == null){
		console.log("inputStream is null");
		return str;
	}
	try{
		var inputStreamReader = Java.use('java.io.InputStreamReader').$new(inputStream);
		var bufferedReader = Java.use('java.io.BufferedReader').$new(inputStreamReader);
		var response = Java.use('java.lang.StringBuffer').$new();
		var line = null;
		while((line = bufferedReader.readLine()) != null){
			response.append(line);
		}
		str = response;
	}catch(error){
		console.error( "inputstream error: " + error);
		return null;
	}
	return str;
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

function getFieldValue(object, fieldName) {
    var field = object.class.getDeclaredField(fieldName);
    field.setAccessible(true);
    var fieldValue = field.get(object);
    if (null == fieldValue) {
        return null;
    }
    var FieldClazz = Java.use(fieldValue.$className);
    return Java.cast(fieldValue, FieldClazz);
}
