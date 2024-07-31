document.addEventListener("DOMContentLoaded", function() {
    const articlesContainer = document.getElementById('articles');
    const addArticleBtn = document.getElementById('add-article-btn');
    const modal = document.getElementById("article-modal");
    const closeModal = document.getElementsByClassName("close")[0];
    const articleForm = document.getElementById("article-form");
    const modalTitle = document.getElementById("modal-title");
    const articleIdField = document.getElementById("article-id");
    const titleField = document.getElementById("title");
    const contentField = document.getElementById("content");

    // Fetch articles and display them in the table
    function fetchArticles() {
        fetch('http://localhost:8000/api/articles')
            .then(response => response.json())
            .then(data => {
                articlesContainer.innerHTML = '';
                data.forEach(article => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${article.title}</td>
                        <td>${article.content}</td>
                        <td>
                            <button onclick="editArticle(${article.id})">Edit</button>
                            <button onclick="deleteArticle(${article.id})">Delete</button>
                        </td>
                    `;
                    articlesContainer.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching articles:', error));
    }

    window.editArticle = function(id) {
        fetch(`http://localhost:8000/api/articles/${id}`)
            .then(response => response.json())
            .then(data => {
                modalTitle.textContent = "Edit Article";
                articleIdField.value = data.id;
                titleField.value = data.title;
                contentField.value = data.content;
                modal.style.display = "block";
            })
            .catch(error => console.error('Error fetching article:', error));
    }

    window.deleteArticle = function(id) {
        if (confirm("Are you sure you want to delete this article?")) {
            fetch(`http://localhost:8000/api/articles/${id}`, { method: 'DELETE' })
                .then(() => fetchArticles())
                .catch(error => console.error('Error deleting article:', error));
        }
    }

    articleForm.onsubmit = function(event) {
        event.preventDefault();
        const id = articleIdField.value;
        const title = titleField.value;
        const content = contentField.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:8000/api/articles/${id}` : 'http://localhost:8000/api/articles';
        console.log(title)
            console.log(content)
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            modal.style.display = "none";
            fetchArticles();
        })
        .catch(error => console.error('Error saving article:', error));
    }

    addArticleBtn.onclick = function() {
        modalTitle.textContent = "Add Article";
        articleIdField.value = '';
        titleField.value = '';
        contentField.value = '';
        modal.style.display = "block";
    }

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    fetchArticles();
});
