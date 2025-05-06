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

