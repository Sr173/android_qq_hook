
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
        console.log("encrypt");
        var ret = this.decrypt(array , pos, length, key);
        console.log("ON_DECRYPT_ARRAY", toHexString(array));
        console.log("ON_DECRYPT_RET", toHexString(ret));
        show_java_call_stack();
        return ret;
    }

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