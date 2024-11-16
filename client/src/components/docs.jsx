import React from 'react';

const UploadRoutesDocument = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1>Document: Understanding the Upload Routes Implementation</h1>
      <p>
        This document provides an overview of the backend routes for handling file uploads, updates, deletions, and retrieval of data. 
        The routes are implemented using Express.js, and the data is stored in a MongoDB database using Mongoose. 
        The Upload model is responsible for storing data related to uploads, including the name, text, and imagePaths.
      </p>

      <h2>1. POST Route: /upload</h2>
      <h3>Purpose:</h3>
      <p>
        This route handles the uploading of data, including a name, text content, and an array of image paths.
      </p>
      <h3>Route:</h3>
      <p><code>POST /upload</code></p>
      <h3>Middleware:</h3>
      <p><code>authenticateToken</code> (ensures the user is authenticated before allowing the upload)</p>
      <h3>Request Body:</h3>
      <ul>
        <li><code>name</code>: The name associated with the upload (String).</li>
        <li><code>text</code>: A description or text related to the upload (String).</li>
        <li><code>imagePaths</code>: An array of image file paths (Array of Strings).</li>
      </ul>
      <h3>Validation:</h3>
      <p>
        The route ensures that all required fields (name, text, and imagePaths) are present and that imagePaths is a non-empty array.
      </p>
      <h3>Functionality:</h3>
      <ul>
        <li>If the input data is valid, a new Upload document is created and saved to the database.</li>
        <li>If successful, a status of 201 (Created) is returned along with the uploaded data.</li>
        <li>If the input data is invalid, a 400 status with a relevant error message is returned.</li>
        <li>In case of a server error (e.g., database issues), a 500 status is returned.</li>
      </ul>
      <h3>Response Example (Success):</h3>
      <pre>{`
{
  "message": "Data uploaded successfully",
  "data": {
    "_id": "123abc",
    "name": "Example Name",
    "text": "Example Text",
    "imagePaths": ["image1.jpg", "image2.jpg"]
  }
}`}</pre>
      <h3>Response Example (Error):</h3>
      <pre>{`
{
  "message": "All fields (name, text, and imagePaths) are required, and imagePaths must be a non-empty array."
}`}</pre>

      <h2>2. GET Route: /uploads</h2>
      <h3>Purpose:</h3>
      <p>This route retrieves all uploaded data from the database.</p>
      <h3>Route:</h3>
      <p><code>GET /uploads</code></p>
      <h3>Middleware:</h3>
      <p><code>authenticateToken</code> (ensures the user is authenticated before fetching uploads)</p>
      <h3>Functionality:</h3>
      <ul>
        <li>Fetches all documents from the Upload collection in the database.</li>
        <li>If successful, a status of 200 is returned along with the list of uploads.</li>
        <li>In case of an error (e.g., database issues), a 500 status is returned.</li>
      </ul>
      <h3>Response Example (Success):</h3>
      <pre>{`
[
  {
    "_id": "123abc",
    "name": "Example Name 1",
    "text": "Example Text 1",
    "imagePaths": ["image1.jpg"]
  },
  {
    "_id": "456def",
    "name": "Example Name 2",
    "text": "Example Text 2",
    "imagePaths": ["image2.jpg", "image3.jpg"]
  }
]
}`}</pre>
      <h3>Response Example (Error):</h3>
      <pre>{`
{
  "message": "Failed to fetch uploads."
}`}</pre>

      <h2>3. DELETE Route: /uploads/:id</h2>
      <h3>Purpose:</h3>
      <p>This route deletes a specific upload by its ID.</p>
      <h3>Route:</h3>
      <p><code>DELETE /uploads/:id</code></p>
      <h3>Middleware:</h3>
      <p><code>authenticateToken</code> (ensures the user is authenticated before deleting)</p>
      <h3>Functionality:</h3>
      <ul>
        <li>The route accepts an id parameter in the URL to identify the upload to be deleted.</li>
        <li>If the upload is found, it is deleted from the database, and a 200 status is returned with a success message.</li>
        <li>If the upload is not found, a 404 status with a message indicating that the upload was not found is returned.</li>
        <li>If an error occurs (e.g., database issues), a 500 status is returned.</li>
      </ul>
      <h3>Response Example (Success):</h3>
      <pre>{`
{
  "message": "Data deleted successfully."
}
}`}</pre>
      <h3>Response Example (Error - Upload Not Found):</h3>
      <pre>{`
{
  "message": "Upload not found."
}
}`}</pre>
      <h3>Response Example (Error - Server):</h3>
      <pre>{`
{
  "message": "Failed to delete upload."
}
}`}</pre>

      <h2>4. PUT Route: /uploads/:id</h2>
      <h3>Purpose:</h3>
      <p>This route updates a specific upload by its ID.</p>
      <h3>Route:</h3>
      <p><code>PUT /uploads/:id</code></p>
      <h3>Middleware:</h3>
      <p><code>authenticateToken</code> (ensures the user is authenticated before updating)</p>
      <h3>Request Body:</h3>
      <ul>
        <li><code>name</code>: The updated name for the upload (String).</li>
        <li><code>text</code>: The updated text for the upload (String).</li>
        <li><code>imagePaths</code>: An updated array of image paths (Array of Strings).</li>
      </ul>
      <h3>Validation:</h3>
      <p>At least one of name, text, or imagePaths must be provided for the update.</p>
      <h3>Functionality:</h3>
      <ul>
        <li>The route accepts an id parameter in the URL to identify the upload to be updated.</li>
        <li>If at least one field is provided for the update, the corresponding document is found and updated in the database.</li>
        <li>If the update is successful, a status of 200 is returned along with the updated upload.</li>
        <li>If no fields are provided for the update, a 400 status with a validation message is returned.</li>
        <li>If the upload is not found, a 404 status is returned.</li>
        <li>If an error occurs (e.g., database issues), a 500 status is returned.</li>
      </ul>
      <h3>Response Example (Success):</h3>
      <pre>{`
{
  "_id": "123abc",
  "name": "Updated Name",
  "text": "Updated Text",
  "imagePaths": ["updated_image1.jpg"]
}
}`}</pre>
      <h3>Response Example (Error - No Fields to Update):</h3>
      <pre>{`
{
  "message": "At least one field must be updated."
}
}`}</pre>
      <h3>Response Example (Error - Upload Not Found):</h3>
      <pre>{`
{
  "message": "Upload not found."
}
}`}</pre>
      <h3>Response Example (Error - Server):</h3>
      <pre>{`
{
  "message": "Failed to update upload."
}
}`}</pre>

      <h2>Conclusion</h2>
      <p>
        This document outlines the implementation of the CRUD (Create, Read, Update, Delete) operations for handling file uploads in an Express.js application. 
        It includes the necessary routes, data validation, and response structures to manage uploads efficiently. 
        The routes ensure that only authenticated users can interact with the upload data, and they provide appropriate responses based on the success or failure of each operation.
      </p>
    </div>
  );
};

export default UploadRoutesDocument;
