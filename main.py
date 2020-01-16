import tkinter

script = 0

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

def button_call_back():
    if script != 0:
        script.unload()
    file_object = open('hook.js', encoding="utf-8")
    text = file_object.read()
    file_object.close()
    device = frida.get_usb_device()
    process = device.attach("com.tencent.mobileqq:MSF")
    script = process.create_script(text)
    script.on('message', on_message)
    script.load()

top = tkinter.Tk()
button = tkinter.Button(top, text="执行脚本", command=button_call_back)
button.pack()
top.geometry('200x50')
top.mainloop()
