import cv2
import numpy as np

def smooth_image(image_path, output_path):
    # Read the image
    image = cv2.imread(image_path)

    # Check if image is loaded successfully
    if image is None:
        print("Error: Unable to load image.")
        return

    # Apply Gaussian Blur to smooth the image
    smoothed_image = cv2.GaussianBlur(image, (5, 5), 0)

    # Save the smoothed image
    cv2.imwrite(output_path, smoothed_image)
    print(f"Smoothed image saved to {output_path}")

    # Apply anti-aliasing using a Gaussian pyramid
    anti_aliased_image = cv2.pyrDown(image)
    anti_aliased_image = cv2.pyrUp(anti_aliased_image)

    # Save the anti-aliased image
    anti_aliased_output_path = output_path.replace('.png', '_antialiased.png')
    cv2.imwrite(anti_aliased_output_path, anti_aliased_image)
    print(f"Anti-aliased image saved to {anti_aliased_output_path}")

if __name__ == "__main__":
    input_image_path = 'public/images/leaf.png'  # Replace with your input image path
    output_image_path = 'public/images/smoothleaf.png'  # Replace with your desired output image path
    smooth_image(input_image_path, output_image_path)