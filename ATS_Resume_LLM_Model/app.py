#want to build an application that takes a resume and a job description and returns a score based on how well the resume matches the job description
# Import necessary libraries    
import os
import streamlit as st
import pandas as pd
import numpy as np
import openai
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import f1_score, precision_score, recall_score
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import ConfusionMatrixDisplay
import matplotlib.pyplot as plt
import seaborn as sns
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import spacy
import textwrap
import json
import requests
import time
import logging
import traceback
import random
import string
import base64
import hashlib
import datetime
import pytz
import pydeck as pdk
import altair as alt
import folium
import geopandas as gpd
import geopandas.tools
import pyproj
import shapely
import shapely.geometry
import shapely.ops
import shapely.validation
import shapely.affinity
import shapely.ops
import shapely.prepared
import shapely.strtree
import shapely.speedups
import shapely.validation
import shapely.wkt
import shapely.wkb
import shapely.geometry.polygon
import shapely.geometry.linestring
import shapely.geometry.point
import shapely.geometry.multipoint
import shapely.geometry.multilinestring
import shapely.geometry.multipolygon

'''	

# Load environment variables
load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Streamlit app title
st.title("Resume and Job Description Matching")

# Function to preprocess text
def preprocess_text(text):
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('wordnet')
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = text.lower()
    tokens = word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    return ' '.join(tokens)

# Function to calculate similarity score
def calculate_similarity(resume, job_description):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([resume, job_description])
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return similarity[0][0]

# Streamlit input fields
resume_text = st.text_area("Paste your Resume here:")
job_description_text = st.text_area("Paste the Job Description here:")

# Process and calculate similarity
if st.button("Calculate Match Score"):
    if resume_text and job_description_text:
        processed_resume = preprocess_text(resume_text)
        processed_job_description = preprocess_text(job_description_text)
        match_score = calculate_similarity(processed_resume, processed_job_description)
        st.write(f"Match Score: {match_score:.2f}")
    else:
        st.write("Please provide both Resume and Job Description.")
        
# Function to generate a summary using OpenAI API
def generate_summary(text):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"Summarize the following text: {text}"}
            ]
        )
        summary = response['choices'][0]['message']['content']
        return summary
    except Exception as e:
        logging.error(f"Error generating summary: {e}")
        return "Error generating summary."
'''
