import tkinter
import frida
import os


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

def on_sdk_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print("sdk", message)


script = 0
script_sdk = 0

def button_call_back():
    global script
    global script_sdk

    if script != 0:
        script.unload()

    file_object = open('hook.js', encoding="utf-8")
    text = file_object.read()
    file_object.close()
    device = frida.get_usb_device()
    process = device.attach("com.tencent.mobileqq:MSF")
    script = process.create_script(text)
    script.on('message', on_message)

    process = device.attach("com.tencent.mobileqq:openSdk")
    script_sdk = process.create_script(text)
    script_sdk.on('message', on_sdk_message)

    script_sdk.load()
    script.load()

os.system("adb forward tcp:27042 tcp:27042")
os.system("adb forward tcp:27043 tcp:27043")
os.system("adb forward tcp:23946 tcp:23946")

top = tkinter.Tk()
button = tkinter.Button(top, text="执行脚本", command=button_call_back)
button.pack()
top.geometry('200x50')
top.mainloop()
