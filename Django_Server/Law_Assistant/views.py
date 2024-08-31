from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib import messages
from .models import User
from .components.signup_form import SignUpForm
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.http.response import JsonResponse
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
import datetime

import json
class RAGAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        text = request.data.get('text')
        if not text:
            return Response({"error": "No question provided"}, status=400)

        # Store user message to the database
        c_id = self.store_message(request.data)

        rag_service = apps.get_app_config('Law_Assistant').rag_service
        openai_stream = rag_service.send_message(text)

        # Buffer to accumulate the response
        response_buffer = []

        def stream_response(response_stream, c_id):
           
            for chunk in response_stream:
                # Accumulate each chunk in the buffer
                response_buffer.append(chunk.choices[0].delta.content)
                yield chunk.choices[0].delta.content

            # After streaming is done, store the accumulated response
            full_response = ""
            for chunk in response_buffer:
                if(chunk):
                    full_response += chunk
            bot_data = request.data
            bot_data["sender"] = "bot"
            bot_data["text"] = full_response
            bot_data["conversation_id"] = c_id
            self.store_message(bot_data)

    
        response = StreamingHttpResponse(stream_response(openai_stream, c_id), content_type='text/plain')
        response["conversation_id"] = c_id

        return response


    

    def store_message(self, data):
        conversation_id = data["conversation_id"]
        if(conversation_id == "new_conversation"):
            new_conversation = Conversation.objects.create(user_id=data["user_id"], create_date = datetime.datetime.now(), conversation_name = data["conversation_name"])
            new_conversation.save()
            conversation_id = new_conversation.id
            new_message = Message.objects.create(conversation_id=conversation_id, text = data["text"], sender = data["sender"],  create_date = datetime.datetime.now())
            new_message.save()
        else:
            new_message = Message.objects.create(conversation_id = data["conversation_id"], text = data["text"], sender = data["sender"],  create_date = datetime.datetime.now())
            new_message.save()
            
        return conversation_id
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
                return Response({**data, "user_id" : user.id}, status=status.HTTP_200_OK)
            data = {'message' :"Log in unsuccessfully - email or password is incorrect"}    
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        data = {'message' : "Log in unsuccessfully - email or password is incorrect", 'error' : serializer.errors}    
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    

class ConversationHistoryAPIView(APIView):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    


    def get(self, request, format = None):
        user_id = request.query_params.get('user_id')
        
        queryset = Conversation.objects.filter(user_id__exact = user_id).order_by('create_date').reverse()

        try:
            return JsonResponse(list(queryset.values()), safe=False)

        except:
            return Response("Error", status=status.HTTP_400_BAD_REQUEST)
