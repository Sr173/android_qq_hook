import tkinter

def button_call_back():
    file_object = open('run.js', encoding="utf-8")
    text = file_object.read()
    file_object.close()

top = tkinter.Tk()
button = tkinter.Button(top, text="执行脚本", command=button_call_back)
button.pack()
top.geometry('200x50')
top.mainloop()
