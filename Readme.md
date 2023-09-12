# Requirements

The project needs a Node.js server with Express.js for APIs, tested using Jest, and a PostgreSQL database managed via Docker. Include APIs represent a CRUD opertions for an entity `Asset`.

# Used Packages

This project utilizes several essential packages to enhance its functionality. Below is a list of the key packages used:

- TypeORM: TypeORM is an Object-Relational Mapping (ORM) library for TypeScript and JavaScript, which simplifies database interactions and management. It provides a convenient way to work with databases using object-oriented programming principles.

- Multer: Multer is a middleware for handling multipart/form-data, which is commonly used for file uploads. In this project, Multer plays a crucial role in processing and storing media files, making it a seamless choice for file management.

# API Endpoints

1. **Endpoint: `POST /assets`**

**Description:**
This endpoint allows you to upload a media file as an `Asset` using the npm package `Multer` as middleware. The uploaded asset will be stored within the project's filesystem. Additionally, a new UUID name will be generated for this asset, and it will be stored along with its original name and mimetype.

**Request:**

- Method: POST
- URL: `/assets`

**Request Body:**

- `file` (Media file) - The media file to be uploaded as an asset.

**Response:**

- Status Code: 201 (Created)
- Response Body: JSON object with the following properties:

  - `success`: true,
  - `message`: "Asset uploaded successfully."
  - `uuidName`: The generated UUID name for the asset.

- Status Code: 400 (Bad Requst)
- Response Body: JSON object with the following properties:

  - `success`: false
  - `message`: No Asset uploaded.

- Status Code: 500 (Server Error)
- Response Body: JSON object with the following properties:

  - `success`: false
  - `message`: Server Error

**Example Request:**

```http
POST /assets
Content-Type: multipart/form-data

[file: media-file.jpg]
```

**Example Response (HTTP 201 Created):**

```json
{
  "success": true,
  "message": "Asset uploaded successfully.",
  "uuidName": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
}
```

**Example Response (HTTP 400 Bad Request):**

```json
{
  "success": false,
  "message": "No Asset uploaded."
}
```

**Example Response (HTTP 500 Server Error):**

```json
{
  "success": false,
  "message": "Server Error"
}
```

**Notes:**

- Make sure to use the `multipart/form-data` content type when making the POST request, as this endpoint expects file uploads.
- The generated UUID name ensures unique identification for the asset.
- The uploaded asset will be stored in the project's filesystem for future retrieval and use.

---

2. **Endpoint: `GET /assets/:uuid`**

**Description:**
This endpoint enables the retrieval of an `Asset` object's data based on its unique identifier (`uuid`). The response includes the asset's name and an `assetURL` that provides a means to access and fetch the associated media file.

**Request:**

- Method: GET
- URL: `/assets/:uuid`
  - `:uuid` (Path Parameter) - The unique identifier of the asset to retrieve.

**Response:**

- Status Code: 200 (OK)
- Response Body: JSON object with the following properties:
  - `asset`: asset data.
  - `assetURL`: The URL for fetching the media file associated with the asset.

**Example Request:**

```http
GET /assets/f47ac10b-58cc-4372-a567-0e02b2c3d479.jpeg
```

**Example Response (HTTP 200 OK):**

```json
{
  "success": true,
  "message": "success",
  "asset": {
    "id": 1,
    "uuidName": "f47ac10b-58cc-4372-a567-0e02b2c3d479.jpeg",
    "originalName": "originalName.jpeg",
    "mimType": "image/jpeg"
  },
  "assetURL": "https://example.com/upload/f47ac10b-58cc-4372-a567-0e02b2c3d479.jpeg"
}
```

**Example Response (HTTP 404 NOT FOUND):**

```json
{
  "success": false,
  "message": "Asset Is Not Found"
}
```

**Example Response (HTTP 422 VALIDATION ERROR):**

```json
{
  "success": false,
  "message": "Invalid UUID"
}
```

**Example Response (HTTP 500 SERVER ERROR):**

```json
{
  "success": false,
  "message": "SERVER ERROR"
}
```

**Notes:**

- The `:uuid` parameter in the URL uniquely identifies the asset to retrieve.
- The `assetURL` provides a direct link to access and fetch the associated media file, allowing for easy integration into applications or displaying the media content.
- Ensure that you replace the `:uuid` parameter in the URL with the actual valid UUID of the asset you wish to retrieve.

---

3. **Endpoint: `GET /assets`**

**Description:**
This endpoint retrieves an array of `Asset` objects based on the provided query parameters. The `limit` parameter determines how many assets are displayed per page, and the `page` parameter specifies the page to retrieve.

**Request:**

- Method: GET
- URL: `/assets`
- Query Parameters:
  - `limit` (Required) - The number of assets to display per page.
  - `page` (Required) - The page number to retrieve. Default is the first page.

**Response:**

- Status Code: 200 (OK)
- Response Body: JSON array containing `Asset` objects.

- Status Code: 422 (Vlidation Error)
- Response Body: Invalid Parameters.

- Status Code: 500 (Server Error)
- Response Body: Server Error.

**Example Request:**

```http
GET /assets?limit=10&page=1
```

**Example Response (HTTP 200 OK):**

```json
[
  {
    "id": 17,
    "originalName": "BB_8eedc239-21d6-4b9f-a242-f844d9007bda_FPpreview.mp4",
    "uuidName": "fdf25625-7a9d-4e34-a128-4c983553b586.mp4",
    "mimetype": "video/mp4",
    "assetURL": "/upload/fdf25625-7a9d-4e34-a128-4c983553b586.mp4"
  },
  {
    "id": 18,
    "originalName": "BB_8eedc239-21d6-4b9f-a242-f844d9007bda_FPpreview.mp4",
    "uuidName": "3abc7095-013f-4ee8-a5a5-a4d2725376c7.mp4",
    "mimetype": "video/mp4",
    "assetURL": "/upload/3abc7095-013f-4ee8-a5a5-a4d2725376c7.mp4"
  }
]
```

**Example Response (HTTP 422 VALIDATION ERROR):**

```json
{
  "success": false,
  "message": "Invalid Parameters"
}
```

**Example Response (HTTP 500 SERVER ERROR):**

```json
{
  "success": false,
  "message": "SERVER ERROR"
}
```

**Notes:**

- The `limit` parameter controls how many assets are shown per page, allowing for pagination.
- The `page` parameter specifies the page number to retrieve, with the first page being the default.
- Adjust the `limit` and `page` values in the query parameters as needed to navigate through the paginated results.

---

4. **Endpoint: `DELETE /assets/:uuid`**

**Description:**
This endpoint allows you to delete an `Asset` object based on its unique identifier (`uuid`).

**Request:**

- Method: DELETE
- URL: `/assets/:uuid`
  - `:uuid` (Path Parameter) - The unique identifier of the asset to delete.

**Response:**

- Status Code: 204 (No Content)

  - Indicates a successful deletion with no response body.

- Status Code: 404 (NOT FOUND)

  - Asset Not Found.

- Status Code: 500 (Server Error)
  - Server Error.

**Example Request:**

```http
DELETE /assets/f47ac10b-58cc-4372-a567-0e02b2c3d479.jpeg
```

**Example Response (HTTP 204 No Content):**

```
{
    "success": true,
    "message": "success"
}
```

**Example Response (HTTP 422 VALIDATION ERROR):**

```json
{
  "success": false,
  "message": "Invalid UUID"
}
```

**Example Response (HTTP 500 SERVER ERROR):**

```json
{
  "success": false,
  "message": "SERVER ERROR"
}
```

**Notes:**

- The `:uuid` parameter in the URL uniquely identifies the asset to delete.
- Upon successful deletion, the endpoint returns a `204 No Content` status code, indicating that the asset has been removed from the system.
- Ensure that you replace the `:uuid` parameter in the URL with the actual UUID of the asset you wish to delete.

## Setup

- have node, npm and docker installed
- copy `.env.sample` to `.env`
- start db with `docker-compose up -d`
- initialize schema with `npm run init-schema`

## Run

- `npm install`: install node moudles
- `npm run test:unit`: run all unit tests
- `npm run test:integration`: run all integration tests
- `npm run start`: run the server

# Enhancements

- Implement authentication and authorization mechanisms.
- Restrict asset types to accept only images and videos.
- Expand the coverage of integration tests.
