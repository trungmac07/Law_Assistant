from django.apps import AppConfig
from .services import RAGService

class LawAssistantConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Law_Assistant'

    def ready(self):
        self.rag_service = RAGService("./data/embedding_64.pt", 
                                      "./data/checkpoint-204")
          
