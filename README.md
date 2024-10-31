# ML Project

# Facial Emotion Recognition Model

This project builds a deep learning model using a pre-trained EfficientNet architecture to classify human facial expressions. The model aims to recognize emotions such as happiness, sadness, anger, fear, and more.

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Data Preparation](#data-preparation)
- [Model Training](#model-training)
- [Evaluation](#evaluation)
- [Real-Time Emotion Prediction](#real-time-emotion-prediction)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Project Overview
This project leverages the Keras deep learning library and EfficientNetB0 as a pre-trained model for emotion classification from facial images. Using data augmentation and transfer learning, the model is trained to classify images into several emotional categories. The final model can optionally be used for real-time emotion recognition via a webcam.

## Project Structure
- **data**: Directory containing the dataset of face images with labels.
- **main.py**: Main script containing the model, data preprocessing, training, and evaluation code.
- **best_model.h5**: File where the best model's weights are saved during training.
  
## Installation

1. Clone the repository and navigate into the project directory:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

3. (Optional) If you’re running the project on Google Colab, you can upload your dataset and configure paths accordingly.

## Data Preparation

1. Place the images in a directory structure like:
    ```
    /data
      ├── emotion1
      │    ├── img1.jpg
      │    ├── img2.jpg
      │    └── ...
      ├── emotion2
      │    ├── img3.jpg
      │    ├── img4.jpg
      │    └── ...
      └── ...
    ```
   
2. Define the data directory in the script:
    ```python
    data_dir = '/path-to-data-directory'
    ```

3. The function `convert_img_to_df` converts the image dataset into a DataFrame, where each entry contains the file path and label.

## Model Training

1. The images are augmented using Keras' `ImageDataGenerator`, which performs data augmentation and rescaling.
2. EfficientNetB0 is used as a base model to leverage pre-trained weights. A few additional layers are added on top, including a Dense layer for classification.
3. The model is compiled with `categorical_crossentropy` loss and trained using an `EarlyStopping` and `ModelCheckpoint` callback to save the best model.

## Evaluation

After training, the model is evaluated on a test set. The script provides:
- **Training history** visualization of accuracy and loss.
- **Classification report** detailing precision, recall, and F1-score for each class.

## Real-Time Emotion Prediction

The project includes optional code for real-time emotion recognition using a webcam. To use this feature:
1. Uncomment the code in the `main.py` file under "Real-Time Prediction."
2. Run the model with a connected webcam. The model will predict and display the emotion on the live webcam feed.

**Note:** OpenCV is required for accessing the webcam, which may need to be installed via `pip install opencv-python`.

## Usage

To run the code:
```bash
python main.py
```

Or in Google Colab:
1. Upload `main.py` and dataset files.
2. Run the cells in sequence to preprocess, train, and evaluate the model.

## Acknowledgments
- This project uses EfficientNetB0 pre-trained model for transfer learning.
- OpenCV library is used for real-time video capture.

---

This README provides an overview and usage instructions for setting up, running, and evaluating the model. Adjust paths as needed based on your environment setup.
