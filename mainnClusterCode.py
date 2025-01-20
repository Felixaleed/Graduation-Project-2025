import os
import shutil
import numpy as np
from skimage.io import imread
from skimage.transform import resize
from skimage.color import rgb2gray, rgb2hsv
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from skimage.measure import label, regionprops


# Constants
DATASET_DIR = "psoriasis_images"  # Replace with your dataset folder
OUTPUT_DIR = "clustered_images"  # Directory to save the clustered folders
IMAGE_SIZE = (128, 128)  # Larger size to preserve more details
CLUSTER_NAMES = ["mild", "moderate", "severe"]  # Cluster labels
N_CLUSTERS = len(CLUSTER_NAMES)  # Number of clusters


def create_output_directories(output_dir, cluster_names):
    for cluster_name in cluster_names:
        os.makedirs(os.path.join(output_dir, cluster_name), exist_ok=True)


def extract_features(image_path):
    """
    Extract domain-specific features for psoriasis severity.
    - Redness: High intensity in the red channel.
    - Scaliness: Presence of white regions.
    - Size: Relative area of the affected region.
    """
    try:
        img = imread(image_path)
        img_resized = resize(img, IMAGE_SIZE, anti_aliasing=True)
        hsv = rgb2hsv(img_resized)
        gray = rgb2gray(img_resized)

        # Redness (from HSV)
        redness = np.mean(hsv[:, :, 0])  # Hue channel

        # Scaliness (white regions)
        scaliness = np.mean(gray > 0.8)  # Count bright areas as scales

        # Size of the patch
        binary_mask = gray > 0.3
        labeled = label(binary_mask)
        regions = regionprops(labeled)
        patch_sizes = [region.area for region in regions]
        largest_patch = max(patch_sizes) if patch_sizes else 0

        # Combine features
        features = np.array([redness, scaliness, largest_patch])
        return features
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None


def process_images(dataset_dir):
    features = []
    image_paths = []
    for img_name in os.listdir(dataset_dir):
        img_path = os.path.join(dataset_dir, img_name)
        if img_name.lower().endswith(('png', 'jpg', 'jpeg')):
            feature = extract_features(img_path)
            if feature is not None:
                image_paths.append(img_path)
                features.append(feature)
    return np.array(features), image_paths


def apply_pca(features, n_components=2):
    """
    Reduce dimensions for clustering while preserving variance.
    """
    pca = PCA(n_components=n_components, random_state=42)
    return pca.fit_transform(features)


def perform_clustering(features, n_clusters):
    """
    Perform K-Means clustering on the feature set.
    """
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(features)
    return clusters


def save_clustered_images(image_paths, clusters, output_dir, cluster_names):
    """
    Save images into respective cluster folders.
    """
    for img_path, cluster in zip(image_paths, clusters):
        cluster_folder = os.path.join(output_dir, cluster_names[cluster])
        shutil.copy(img_path, cluster_folder)


def main():
    create_output_directories(OUTPUT_DIR, CLUSTER_NAMES)

    print("Extracting features from images...")
    features, image_paths = process_images(DATASET_DIR)

    if not features.size:
        print("No features were extracted. Exiting...")
        return

    print("Reducing dimensions using PCA...")
    features_pca = apply_pca(features)

    print("Clustering images...")
    clusters = perform_clustering(features_pca, N_CLUSTERS)

    print("Saving clustered images...")
    save_clustered_images(image_paths, clusters, OUTPUT_DIR, CLUSTER_NAMES)

    print(f"Images have been clustered and saved in the '{OUTPUT_DIR}' folder.")


if __name__ == "__main__":
    main()
