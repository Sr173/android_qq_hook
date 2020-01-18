
function toHexString(bytes) {
    if (bytes == null){
        return "";
    }
    var string = "";
    for (var i = 0; i < bytes.length; i++) {
        var s = (bytes[i] & 0xFF) <= 0xF ? ('0' + (bytes[i] & 0xFF).toString(16)) : (bytes[i] & 0xFF).toString(16);
        if (s.length != 2) {
            console.log("error", s);
        }
        string += s;
    }
    return string;
}

function toHexStringWithPos(bytes, pos, length) {
    if (bytes == null){
        return "";
    }
    var string = "";
    for (var i = pos; i < pos + length; i++) {
        var s = (bytes[i] & 0xFF) <= 0xF ? ('0' + (bytes[i] & 0xFF).toString(16)) : (bytes[i] & 0xFF).toString(16);
        if (s.length != 2) {
            console.log("error", s);
        }
        string += s;
    }
    return string;
}

function show_java_call_stack() {
    var Exc = Java.use("java.lang.Exception");
    var Log = Java.use("android.util.Log");
    var e = Exc.$new("");
    var log = Log.$new();
    console.log(log.getStackTraceString(e));
}

Java.perform(function () {
    var StringClass = Java.use("java.lang.String");

    var cryptor = Java.use("oicq.wlogin_sdk.tools.cryptor");
    cryptor.decrypt.implementation = function (array , pos, length, key) {
        var ret = this.decrypt(array , pos, length, key);
        console.log("ON_DECRYPT_ARRAY", toHexStringWithPos(array, pos, length));
        console.log("ON_DECRYPT_RET", toHexString(ret));
        console.log("ON_DECRYPT_KEY", toHexString(key));
        return ret;
    };

    var cryptor = Java.use("oicq.wlogin_sdk.tools.cryptor");
    cryptor.encrypt.implementation = function (array , pos, length, key) {
        var ret = this.encrypt(array , pos, length, key);
        console.log("ON_ENCRYPT_ARRAY", toHexStringWithPos(array, pos, length));
        console.log("ON_ENCRYPT_RET", toHexString(ret));
        console.log("ON_ENCRYPT_KEY", toHexString(key));
        return ret;
    };

    var CodecWarpper = Java.use("com.tencent.qphone.base.util.CodecWarpper");
    CodecWarpper.nativeSetAccountKey.implementation = function ( arg0,  arg1,  arg2,  arg3,  arg4,  arg5,  arg6,  arg7,  arg8,  arg9) {
        console.log("nativeSetAccountKey");
        console.log(arg0);
        console.log(toHexString(arg1));
        console.log(toHexString(arg2));
        console.log(toHexString(arg3));
        console.log(toHexString(arg4));
        console.log(toHexString(arg5));
        console.log(toHexString(arg6));
        console.log(toHexString(arg7));
        console.log(toHexString(arg8));
        console.log(toHexString(arg9));

        return CodecWarpper.nativeSetAccountKey(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    };

    if (Module.findExportByName("libcodecwrapperV2.so", "Java_com_tencent_qphone_base_util_CodecWarpper_encodeRequest")) {
        Interceptor.attach(Module.findExportByName("libcodecwrapperV2.so", "Java_com_tencent_qphone_base_util_CodecWarpper_encodeRequest"), {
            onEnter: function (args) {
                console.log("cmd", Java.cast(args[7], StringClass));
            },
            onLeave: function (retval) {
            }
        });
    }
});