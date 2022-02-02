const newCommentHandler = async (event) => {
  event.preventDefault();

  const contents = document.querySelector('#comment-contents').value.trim();
  
  if (contents) {
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ contents, post_id }),
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


document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);