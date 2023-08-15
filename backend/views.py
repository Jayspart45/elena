from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import win32com.client
import pythoncom
import webbrowser
import json
from playsound import playsound
import time
import datetime


import os
import openai

# write a program to use open ai chat

chatStr = ""


def ai(prompt):

    pythoncom.CoInitialize()

    # Example voice name for a female voice
    target_voice_name = "Microsoft Zira Desktop - English (United States)"
    speaker = win32com.client.Dispatch("SAPI.SpVoice")
    voices = speaker.GetVoices()

    for voice in voices:
        if voice.GetDescription() == target_voice_name:
            speaker.Voice = voice  # Set the selected voice
            break
    openai.api_key = "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"
    chatStr = prompt
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
              {
                  "role": "user",
                  "content": chatStr,
              }
        ],

        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    speaker.Speak(response["choices"][0]["message"]["content"])

    res = response["choices"][0]["message"]["content"]

    if not os.path.exists("Openai"):
        os.mkdir("Openai")
    with open(f"Openai/{''.join(prompt.split('elena')[1:]).strip()}.txt", "w") as f:
        f.write(res)

    return JsonResponse({'success': True, 'message': res})

@csrf_exempt
def stopAi(request):
    pythoncom.CoUninitialize()
    return JsonResponse({'success': True, 'message': "Stopped Elena"})


@csrf_exempt
def recognize_and_speak(request):
    # data = json.loads(request.body.decode('utf-8'))
    # text = data.get('data', '')
    text = request.POST.get("data")
    # print(text)

    try:

        pythoncom.CoInitialize()

    # Example voice name for a female voice
        target_voice_name = "Microsoft Zira Desktop - English (United States)"
        speaker = win32com.client.Dispatch("SAPI.SpVoice")
        voices = speaker.GetVoices()

        for voice in voices:
            if voice.GetDescription() == target_voice_name:
                speaker.Voice = voice  # Set the selected voice
                break

        if (text == ''):
            speaker.Speak("Say Something !")
            return JsonResponse({'success': True, 'message': f'Say Something'})

        # Opening Sites

        sites = [
            ["Google", "https://www.google.com"],
            ["YouTube", "https://www.youtube.com"],
            ["Facebook", "https://www.facebook.com"],
            ["Twitter", "https://www.twitter.com"],
            ["Instagram", "https://www.instagram.com"],
            ["LinkedIn", "https://www.linkedin.com"],
            ["Pinterest", "https://www.pinterest.com"],
            ["Reddit", "https://www.reddit.com"],
            ["GitHub", "https://www.github.com"],
            ["Amazon", "https://www.amazon.com"],
        ]
        for site in sites:

            if f"open {site[0]}".lower() in text.lower():
                speech_text = f"Opening {site[0]}"
                speaker.Speak(speech_text)
                webbrowser.open(site[1])
                return JsonResponse({'success': True, 'message': 'Opening YouTube.'})
            applications = {
                "vscode": "code",
                "notepad": "notepad.exe",
                "cmd": "cmd.exe",
                "command prompt": "cmd.exe",
                "powershell": "powershell.exe"
            }
        for app_name, app_path in applications.items():
            if f"open {app_name}".lower() in text.lower():
                os.startfile(app_path)
                speaker.Speak(f"Opening {app_name.capitalize()}")
                return JsonResponse({'success': True, 'message': f'Opening {app_name.capitalize()}.'})
        folders = {
            "documents": "C:\\Users\\jayam\\Desktop\\Documents",
            "desktop": "C:\\Users\\jayam\\Desktop",
            "pictures": "C:\\Users\\jayam\\Desktop\\Pictures",
        }
        for folder_name, folder_path in folders.items():
            if f"open {folder_name}".lower() in text.lower():
                os.startfile(folder_path)
                speaker.Speak(f"Opening {folder_name.capitalize()} folder")
                return JsonResponse({'success': True, 'message': f'Opening {folder_name.capitalize()} folder.'})
        # Playing Music
        if "play music" in text.lower():
            speaker.Speak("Playing Music")
            musicPath = "/Users/jayam/Desktop/music.mp3"
            playsound(musicPath)

        # Get current time
        elif "the time" in text.lower():
            time = datetime.datetime.now().strftime("%H:%M:%S")
            speaker.Speak(f"Sir , Time is {time}")

            return JsonResponse({'success': True, 'message': 'Speech synthesized successfully.'})
        elif "Elena close".lower() in text.lower():
            exit()

        else:
            res = ai(prompt=text)
            return res

        # Iterate through the folders dictionary and check for matching voice command

    finally:
        # Uninitialize the COM environment
        pythoncom.CoUninitialize()
