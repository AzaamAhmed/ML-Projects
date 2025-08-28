from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI, ChatAnthropic
from langchain.schema import BaseRetriever
from typing import Tuple
import logging

from app.core.config import settings
from app.rag.emotions import EmotionClassifier

logger = logging.getLogger(__name__)

class TutorChain:
    def __init__(self, retriever: BaseRetriever):
        self.retriever = retriever
        self.memory = ConversationBufferWindowMemory(
            memory_key="chat_history",
            return_messages=True,
            k=5
        )
        self.emotion_classifier = EmotionClassifier()
        
        # Initialize LLM
        if settings.llm_provider == "openai":
            self.llm = ChatOpenAI(
                model=settings.llm_model,
                temperature=0.1,
                api_key=settings.openai_api_key
            )
        elif settings.llm_provider == "anthropic":
            self.llm = ChatAnthropic(
                model=settings.llm_model,
                temperature=0.1,
                api_key=settings.anthropic_api_key
            )
        else:
            raise ValueError(f"Unsupported LLM provider: {settings.llm_provider}")
        
        # Custom prompt for tutoring
        custom_prompt = PromptTemplate(
            template="""You are a friendly, patient AI tutor. Your goal is to help students learn 
            by explaining concepts clearly and encouraging them. Use the following context to 
            inform your response, but adapt it to the student's level.

            Context:
            {context}

            Chat History:
            {chat_history}

            Question: {question}

            Answer as a helpful tutor:""",
            input_variables=["context", "chat_history", "question"]
        )
        
        self.chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.retriever,
            memory=self.memory,
            combine_docs_chain_kwargs={"prompt": custom_prompt},
            return_source_documents=True
        )
    
    async def ainvoke(self, question: str) -> Tuple[str, str]:
        """Execute the chain and return response with emotion"""
        try:
            result = await self.chain.ainvoke({"question": question})
            response_text = result["answer"]
            
            # Classify emotion based on response
            emotion = self.emotion_classifier.classify_emotion(response_text)
            
            return response_text, emotion
            
        except Exception as e:
            logger.error(f"Error in RAG chain: {e}")
            return "I apologize, but I'm having trouble processing your question right now. Please try again.", "confused"