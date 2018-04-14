/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const UForm = Vue.component('upload-form', {
    template: `
    <html>
        <head>
            <title>Image Upload Form</title>
            
            <link href="static/css/app.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Upload Form</h1>
            
            <form @submit.prevent="uploadPhoto" id="uploadForm">
                <div>
                    <label for="desc">Description</label>
                    <textarea id="desc" name="description" class="form-control"></textarea>
                </div>
                <div>
                    <label for="photo">Photo Upload</label>
                    <input type="file" id="photo" name="photo" />
                </div>
                
                <button type="submit" class="btn btn-primary" id="uBtn">Submit</button>
            </form>
        </body>
    </html>
    `,
    methods: {
        uploadPhoto: function() {
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);
            
            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (jsonResponse) {
                    //displays a success message
                    console.log(jsonResponse);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/upload", component: UForm }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});