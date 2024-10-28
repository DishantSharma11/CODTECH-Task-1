// Select elements
const blogForm = document.getElementById('blogForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postsContainer = document.getElementById('postsContainer');

// Load posts from local storage
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Function to render all posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postsContainer.appendChild(postDiv);
    });
}

// Add a new post
blogForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = titleInput.value;
    const content = contentInput.value;

    if (title && content) {
        posts.push({ title, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        blogForm.reset();
    }
});

// Edit a post
function editPost(index) {
    const post = posts[index];
    titleInput.value = post.title;
    contentInput.value = post.content;
    
    blogForm.removeEventListener('submit', addPost);
    blogForm.addEventListener('submit', function updatePost(e) {
        e.preventDefault();
        posts[index] = { title: titleInput.value, content: contentInput.value };
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        blogForm.reset();
        blogForm.removeEventListener('submit', updatePost);
        blogForm.addEventListener('submit', addPost);
    });
}

// Delete a post
function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

// Initial render
renderPosts();
