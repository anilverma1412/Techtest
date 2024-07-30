document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8000/api/articles')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles');
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

               // const articleElement = document.createElement('div');
                //articleElement.className = 'article';
                //articleElement.innerHTML = `
                 //   <h2>${article.title}</h2>
                  //  <p>${article.content}</p>
               // `;
               // articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching articles:', error));
});
