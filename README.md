# Movie Browser

## Requirements
 1. Have NodeJS and Git installed.
 2. Install `gulp` and `jest` globally:
 ```
    npm install -g gulp jest
 ```
 3. Clone the package and install the local dependencies:
 ```
    git clone https://github.com/Sergio-Vila/movie-browser
    npm install
 ```

 4. On src/app.tsx, replace "AN_API_KEY" on line 13 with your
    key for TMDb. You can obtain your key by registering in https://www.themoviedb.org/

## Commands
 * Build sources: `gulp`
 * Clean build files: `gulp clean`
 * Run tests: `jest`