from django.contrib import admin
from django.urls import path
from .views import RAGAPIView, SignUpAPIView, LoginAPIView, ConversationHistoryAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/',  RAGAPIView.as_view(), name='rag-api'),
    path('api/signup/', SignUpAPIView.as_view(), name='signup'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/history/', ConversationHistoryAPIView.as_view(), name='history'),
    
]
