from django.shortcuts import render


def index(request, *args, **kwargs):\
    print("Login")

   if request.user.is_authenticated:
        print("user is authenticated", request.user.is_authenticated)
    return render(request, 'accounts/index.html')
