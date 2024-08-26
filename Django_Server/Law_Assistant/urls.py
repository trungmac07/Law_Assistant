from django.contrib import admin
from django.urls import path
from .views import RAGAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/',  RAGAPIView.as_view(), name='rag-api')
]
