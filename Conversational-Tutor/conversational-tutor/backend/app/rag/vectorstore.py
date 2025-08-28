from langchain_community.vectorstores import Redis
from langchain_openai import OpenAIEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document
from typing import List, Optional
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

class VectorStoreManager:
    def __init__(self):
        if settings.embeddings_model.startswith("text-embedding"):
            self.embeddings = OpenAIEmbeddings(
                model=settings.embeddings_model,
                api_key=settings.openai_api_key
            )
        else:
            self.embeddings = HuggingFaceEmbeddings(
                model_name=settings.embeddings_model
            )
        
        self.vectorstore = None
    
    def initialize_vectorstore(self) -> Redis:
        """Initialize or connect to Redis vector store"""
        try:
            self.vectorstore = Redis.from_existing_index(
                embedding=self.embeddings,
                index_name=settings.vectorstore_index,
                redis_url=str(settings.vectorstore_url)
            )
            logger.info("Connected to existing vector store")
            return self.vectorstore
        except Exception as e:
            logger.warning(f"Could not connect to existing index: {e}")
            return None
    
    def create_vectorstore(self, documents: List[Document]) -> Redis:
        """Create new vector store from documents"""
        try:
            self.vectorstore = Redis.from_documents(
                documents=documents,
                embedding=self.embeddings,
                index_name=settings.vectorstore_index,
                redis_url=str(settings.vectorstore_url)
            )
            logger.info("Created new vector store")
            return self.vectorstore
        except Exception as e:
            logger.error(f"Error creating vector store: {e}")
            raise
    
    def get_retriever(self, k: int = 4) -> Redis.as_retriever:
        """Get retriever from vector store"""
        if not self.vectorstore:
            self.initialize_vectorstore()
        
        return self.vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": k}
        )

# Global instance
vectorstore_manager = VectorStoreManager()