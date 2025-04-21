import subprocess

gouda = input("msg:")

subprocess.call("git add --all")
subprocess.call(f"git commit -m {gouda}")
subprocess.call("git push")
subprocess.call("vercel --prod")