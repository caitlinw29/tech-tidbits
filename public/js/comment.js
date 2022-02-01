const newCommentHandler = async (event) => {
  event.preventDefault();

  const contents = document.querySelector('#comment-contents').value.trim();

  if (contents) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ contents }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to delete comment');
    }
  }
};


document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);