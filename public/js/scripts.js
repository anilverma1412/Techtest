document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8000/api/articles')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles');
            data.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'article';
                articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                `;
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching articles:', error));
});
