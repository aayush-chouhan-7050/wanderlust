# Wanderlust

Wanderlust is a travel accommodation platform inspired by Airbnb, allowing users to discover, list, and review unique places to stay around the world.

## Features

- **User Authentication**: Secure sign-up and login system
- **Listing Management**:
  - Create, edit, update, and delete property listings
  - Upload listing images
  - Add detailed property information (title, description, price, location, etc.)
- **Property Categories**: Filter listings by various categories (Iconic City, Room, Castle, Farm, etc.)
- **Review System**:
  - Write and edit reviews for properties
  - Rate properties on a 5-star scale
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (with Bootstrap for styling)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Session-based or JWT 
- **File Upload**: Cloudinary or similar service 
- **Hosting**: Render

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud-based)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/aayush-chouhan-7050/wanderlust.git
    cd wanderlust
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory with the following:
    ```env
    CLOUD_API_KEY=your_cloudinary_key
    CLOUD_API_SECRET=your_cloudinary_secret
    CLOUD_NAME=your_cloudinary_name
    DB_URL=your_mongodb_connection_string
    MAP_TOKEN=your_map_provider_token
    SECRET=your_session_secret
    ```

4. **Start the development server:**
    ```bash
    node app.js
    ```

5. **Access the application:**
    Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Usage

- **For Guests**:
  - Browse available listings
  - View listing details (description, price, location, etc.)
  - Read reviews from other users

- **For Hosts**:
  - Create new listings with:
    - Title and description
    - Price and location details
    - Property images
    - Category selection (Room, Castle, Beach, etc.)
  - Manage existing listings
  - View and respond to reviews

- **For All Users**:
  - Create and edit reviews
  - Rate properties on a 5-star scale
  - Manage your account

## Project Structure

Key components include:
- User authentication system
- Listing creation/editing forms
- Review submission interface
- Property display cards
- Category filtering

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact:

- **Name**: Aayush Chouhan
- **Email**: [aayushchouhan7050@gmail.com](mailto:aayushchouhan7050@gmail.com)
- **GitHub**: [aayush-chouhan-7050](https://github.com/aayush-chouhan-7050)

