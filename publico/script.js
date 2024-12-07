document.getElementById('produto').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const response = await fetch('/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert('Produto cadastrado com sucesso!');
  } else {
    alert('Erro ao cadastrar produto.');
  }
});

