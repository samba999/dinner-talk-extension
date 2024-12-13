document.getElementById('search-btn').addEventListener('click', async () => {
    const topicInput = document.getElementById('topic-input');
    const resultDiv = document.getElementById('result');
    
    const topic = topicInput.value.trim();
    if (!topic) {
      resultDiv.innerText = "Please enter a topic.";
      return;
    }
  
    resultDiv.innerText = "Fetching facts...";
  
    try {
      // Call our local server endpoint
      const response = await fetch('http://localhost:3000/facts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await response.json();
  
      // Display the fetched data to the user
      if (data && data.summary_text) {
        let html = `<p>${data.summary_text}</p>`;
        html += `<p><strong>References:</strong></p><ul>`;
        for (let ref of data.references) {
          html += `<li><a href="${ref.url}" target="_blank">${ref.title}</a></li>`;
        }
        html += `</ul>`;
        resultDiv.innerHTML = html;
      } else {
        resultDiv.innerText = "No facts found, no cap.";
      }
    } catch (error) {
      resultDiv.innerText = "Error fetching data.";
      console.error(error);
    }
  });
  