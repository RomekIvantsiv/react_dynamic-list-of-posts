import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addComment, getPostComments } from '../../api/posts';
import { NewComment, Comment } from '../../react-app-env';

interface Props {
  selectedPostId: number,
  setComments: (obj: NewComment[]) => void,
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleFormSubmit = async (event: React.FormEvent) => {
    const newComment: Comment = {
      name,
      email,
      body,
      postId: selectedPostId,
    };

    event.preventDefault();
    await addComment(newComment);
    getPostComments(selectedPostId)
      .then(response => setComments(response));

    setName('');
    setBody('');
    setEmail('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
