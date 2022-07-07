import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import './index.css';

import {CommentContainer} from './components/comment/CommnetContainer';
import {Comment} from './components/comment/Comment';
import {createTree} from './plugins/tree';
import data from './data/comment.json';

function App() {
  const [comments, setComments] = useState(data.commentData);
  const [commentTree, setCommentTree] = useState(createTree(comments));

  useEffect(() => {
    setCommentTree(createTree(comments));
  }, [comments]);

  const handleCommentCollapse = (id) => {
    const updatedComments = comments.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          expanded: !c.expanded,
        };
      } else {
        return c;
      }
    });
    setComments(updatedComments);
  };

  return (
    <CommentContainer>
      {commentTree.map((comment, index) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            comments={comments}
            collapse={handleCommentCollapse}
            setComments={setComments}
            setCommentTree={setCommentTree}
          />
        );
      })}
    </CommentContainer>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
