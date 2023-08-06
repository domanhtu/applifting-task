# Next.js Blogging App

## Description

This is a blogging app built with Next.js 13 that allows users to create, edit, and delete articles. The app uses a backend provided by Applifting to store and retrieve article data.

## Features

- User authentication: Users can sign up, log in, and log out to manage their articles.
- Create new articles: Authenticated users can create new articles by providing a title, content, and optional image.
- Edit and delete articles: Users can edit the title and content of their own articles or delete them entirely.
- View articles: Users can view a list of their articles and click on individual articles to view the full content.

## Technologies Used

- Next.js 13
- React
- TypeScript
- Applifting Backend API https://github.com/Applifting/fullstack-exercise/blob/master/api.yml
- Tailwind CSS
- Axios
- ...

## Getting Started

### Prerequisites

- Node.js (version 18.16.1)
- npm (version 9.8.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/domanhtu/applifting_task.git
   
2.  Change directory:

    ```bash
    cd applifting_task/frontend/blog-app

3.  Install dependencies:

    ```bash
    npm install
    
## Usage
- Sign up or log in to access your articles.
- Click on "Create new article" to add a new article with a title, content, and an optional image.
- Click on the "Edit" button to modify the title and content of an existing article.
- Click on the "Delete" button to remove an article.
- View your articles on the home page and click on individual articles to view the full content.

## How to Run the App
- To run the app locally, follow the installation instructions above. After installing the dependencies, use the following command to start the development server:

    ```bash
    npm run dev
    
- This will launch the app at http://localhost:3000 in your browser.