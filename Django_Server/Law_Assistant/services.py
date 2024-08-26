import openai
from sentence_transformers import SentenceTransformer
import datasets, accelerate
import torch
import torch.nn.functional as F
import os

class RAGService:
    def __init__(self, embeddings_path = "data/embedding_64.pt", model_path= "data/checkpoint-204"):
        
        
        self.device ="cuda" if torch.cuda.is_available() else "cpu"

        self.model = SentenceTransformer(
            model_path, device=self.device, truncate_dim = 64
        )
        self.embedding_docs = torch.load(embeddings_path).to(self.device)
        os.listdir("./data")
        with open("./data/.key") as f:
            self.org = f.readline().strip()
            self.api_key = f.readline().strip()

        self.client = openai.OpenAI(
            organization = self.org,
            api_key = self.api_key
        )


        self.all_laws = []

        files = sorted(os.listdir("./data./preprocessed_laws"))

        for i,file in enumerate(files):
            if((i+1) % 1000 == 0):
                print(i+1)
            with open("./data/preprocessed_laws/" + file, 'r', encoding="utf-8") as f:
                l = f.read()
                self.all_laws.append(l[:3500])



    def embed_query(self, query):
        # Embed the query using your embedding model (to be defined)
        return torch.tensor([self.model.encode(query)], device=self.device)

    def get_top_documents(self, question, top_k = 3):
     
        embedding = self.embed_query(question)
        print("S", embedding.shape)
        print("X", self.embedding_docs.shape)
        cosine_similarities = F.cosine_similarity(embedding.unsqueeze(0).expand(self.embedding_docs.shape[0], 1, 64), self.embedding_docs, dim = -1).view(-1)
        print("C", cosine_similarities.shape)
        top_k_indices = cosine_similarities.topk(top_k).indices
        return top_k_indices
    
    def generate_prompt(self, question, top_k_indices):
        prompt = "Tôi cung cấp cho bạn một số văn bản pháp luật có liên quan như sau: \n\n"
        print(top_k_indices.shape)
        for k in top_k_indices:
            print(k)
            prompt += self.all_laws[k] + "\n\n"

        prompt += f"Từ những văn bản pháp luật trên, hãy giúp tôi trả lời câu hỏi sau: \n\n{question}\n\n"
        prompt += 'CHÚ Ý: \n- Nếu các văn bản không liên quan hoặc không cung cấp đủ thông tin thì hãy từ chối trả lời câu hỏi, không tự trả lời theo ý kiến riêng.\n- Không trả lời kiểu "Dựa trên tài liệu cung cấp ..."".'
        return prompt


    def generate_response(self, prompt):
        print("PROMPT: ",prompt)
        stream = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": f"Bạn là người trợ lý pháp luật."}, {"role": "user", "content": f"{prompt}"}],
            stream=True,
        )

        return stream

        