import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
from tensorflow.keras.preprocessing import image
from tensorflow.keras.optimizers import RMSprop

import tensorflow as tf
import matplotlib.pyplot as plt

import cv2

import numpy as np

train = ImageDataGenerator(rescale = 1/255)
validation = ImageDataGenerator(rescale = 1/255)

train_dataset = train.flow_from_directory("pneumonia\pneumonia data/test", 
                                          target_size = (400,400), 
                                          batch_size = 16, 
                                          class_mode = 'binary')

validation_dataset = validation.flow_from_directory("pneumonia/pneumonia data/val", 
                                          target_size = (400,400), 
                                          batch_size = 16, 
                                          class_mode = 'binary')

model = tf.keras.models.Sequential([ tf.keras.layers.Conv2D(16,(3,3), activation = 'relu', input_shape  = (400,400,3)),
tf.keras.layers.MaxPool2D(2,2),
tf.keras.layers.Conv2D(32,(3,3), activation = 'relu'),
tf.keras.layers.MaxPool2D(2,2),
tf.keras.layers.Conv2D(64,(3,3), activation = 'relu'),
tf.keras.layers.MaxPool2D(2,2),
tf.keras.layers.Flatten(),
tf.keras.layers.Dense(512, activation = 'relu'),
tf.keras.layers.Dense(1,activation = 'sigmoid')
]
)

model.compile(loss='binary_crossentropy',
              optimizer=RMSprop(lr=0.01),
              metrics=['accuracy'])

model_fit = model.fit(train_dataset, 
                      steps_per_epoch=16, 
                      epochs=5,
                      validation_data=validation_dataset)

# Load and preprocess the image for prediction
img = tf.keras.preprocessing.image.load_img('pneumonia/pneumonia data/test/PNEUMONIA/person1_virus_7.jpeg', target_size=(400, 400))
img_array = tf.keras.preprocessing.image.img_to_array(img)
img_array = tf.expand_dims(img_array, 0)  # Create a batch
img_array = img_array / 255.0  # Rescale the image

# Make predictions
predictions = model.predict(img_array)

# Interpret the predictions as probabilities
probability = predictions[0][0]
print(train_dataset.class_indices)
print(f"Probability of being class '1': {probability:.4f}")
print(f"Probability of being class '0': {1 - probability:.4f}")