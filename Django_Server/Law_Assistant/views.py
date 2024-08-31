from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib import messages
from .models import User
from .components.signup_form import SignUpForm
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

# Create your views here.
from rest_framework.response import Response
from .services import RAGService
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.http import StreamingHttpResponse
from .services import RAGService
from django.apps import apps
from django.template import loader
from rest_framework import generics, status

from .serializers import *


from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class RAGAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        


        text = request.data.get('text')
        if not text:
            return Response({"error": "No question provided"}, status=400)

        
        rag_service = apps.get_app_config('Law_Assistant').rag_service
        
        response_stream = rag_service.send_message(text)
        
        
        def stream_response(response_stream):
            for chunk in response_stream:
                yield chunk.choices[0].delta.content
        
        return StreamingHttpResponse(stream_response(response_stream), content_type='text/plain')

class SignUpAPIView(APIView):

    def post(self, request):
        
        form = SignUpForm(request.data)
        
        
        if form.is_valid():
            
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            gender = form.cleaned_data['gender']
            date_of_birth = form.cleaned_data['date_of_birth']
            address = form.cleaned_data['address']
            phone_number = form.cleaned_data['phone_number']

            # Create and save the user
            user = User(
                email=email,
                first_name=first_name,
                last_name=last_name,
                gender=gender,
                date_of_birth=date_of_birth,
                address=address,
                phone_number=phone_number
            )
            user.set_password(password)  # Hash the password
            user.save()

            #messages.success(request, 'Sign up successful')
            data = {"message":"Sign up successfully"}
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = {"message":"Error occurred", "error" : form.errors}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
   


class LoginAPIView(APIView):
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            print("valid")
            user = authenticate(
                request,
                username=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            if user:
                #print(user)
                refresh = TokenObtainPairSerializer.get_token(user)
                data = {
                    'message' : f"Log in successfully - Welcome {user.email}",
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token)
                }
                return Response(data, status=status.HTTP_200_OK)
            data = {'message' :"Log in unsuccessfully - email or password is incorrect"}    
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        data = {'message' : "Log in unsuccessfully - email or password is incorrect", 'error' : serializer.errors}    
        return Response(data, status=status.HTTP_400_BAD_REQUEST)