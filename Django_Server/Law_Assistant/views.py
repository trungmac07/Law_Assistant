from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from .services import RAGService
from rest_framework.views import APIView
from django.http import StreamingHttpResponse
from .services import RAGService
from django.apps import apps

class RAGAPIView(APIView):
    def post(self, request):
        question = request.data.get('question')
        if not question:
            return Response({"error": "No question provided"}, status=400)

        
        rag_service = apps.get_app_config('Law_Assistant').rag_service
        
        
        top_k_indices = rag_service.get_top_documents(question)
        prompt = rag_service.generate_prompt(question, top_k_indices)

        response_stream = rag_service.generate_response(prompt)

        def stream_response(response_stream):
            for chunk in response_stream:
                yield chunk.choices[0].delta.content
        
        return StreamingHttpResponse(stream_response(response_stream), content_type='text/plain')