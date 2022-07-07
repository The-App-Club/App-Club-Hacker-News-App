import {useState} from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

import {NestedComment} from './NestedComment';
import {CommentContent} from './CommentContent';
import {CommentRoot} from './CommentRoot';
import {CommentItem} from './CommentItem';
import {CommentAuthor} from './CommentAuthor';
import {CommentExpander} from './CommentExpander';
import {CommentTextarea} from './CommentTextarea';
import {CommentForm} from './CommentForm';
import {CommentController} from './CommentController';
import {CommentControllerItem} from './CommentControllerItem';

import {ReplyButton} from '../button/ReplyButton';
import {ToggleCommentButton} from '../button/ToggleCommentButton';
import {MetricsButton} from '../button/MetricsButton';

import {MetricsUpVote} from '../metrics/MetricsUpVote';
import {MetricsDownVote} from '../metrics/MetricsDownVote';

import {Time} from '../time';
import {CreatedTime} from '../time/CreatedTime';
import {UpdatedTime} from '../time/UpdatedTime';

import {timeAgo} from '../../plugins/time';
import {createTree} from '../../plugins/tree';
import {getUUID} from '../../plugins/uuid';

const StyledComment = styled.div`
  margin: 10px 0 0 25px;
`;

const Comment = ({
  comment,
  comments,
  collapse,
  setComments,
  setCommentTree,
}) => {
  // TODO reactQueryでポーリング
  const [upVote, setUpVote] = useState(comment.upVote);
  const [downVote, setDownVote] = useState(comment.downVote);
  const [isOpenCommnetFormByAdd, setIsOpenCommentFormByAdd] = useState(false);
  const [isOpenCommnetFormByEdit, setIsOpenCommentFormByEdit] = useState(false);
  const [commentData, setCommentData] = useState('');

  const handleEditComment = (e) => {
    setCommentData(comment.text);
    setIsOpenCommentFormByEdit((isOpenCommnetFormByEdit) => {
      return !isOpenCommnetFormByEdit;
    });
  };

  const handleAddComment = (e) => {
    setIsOpenCommentFormByAdd((isOpenCommnetFormByAdd) => {
      setCommentData('');
      return !isOpenCommnetFormByAdd;
    });
  };

  const handleUpVoteComment = (e) => {
    setUpVote((upVote) => {
      return upVote + 1;
    });
  };

  const handleDownVoteComment = (e) => {
    setDownVote((downVote) => {
      return downVote + 1;
    });
  };

  const handleCommentOperation = (e, comment, commentType) => {
    if (!commentData) {
      return;
    }

    switch (commentType) {
      case 'reply':
        const replyComment = {
          id: getUUID(),
          parentId: comment.id,
          text: commentData,
          author: 'hoge',
          children: null,
          expanded: true,
          upVote: 0,
          downVote: 0,
        };
        Object.assign(replyComment, {
          createdTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        });
        Object.assign(replyComment, {
          updatedTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        });
        setComments([...comments, replyComment]);
        setCommentTree(createTree(comments));
        setIsOpenCommentFormByAdd((isOpenCommnetFormByAdd) => {
          setCommentData('');
          return !isOpenCommnetFormByAdd;
        });

        // TODO ここでデータ保存POST
        break;
      case 'edit':
        const editComment = {
          id: comment.id,
          parentId: comment.parentId,
          text: commentData,
          author: comment.author,
          children: comment.children,
          expanded: comment.expanded,
          createdTime: comment.createdTime,
          updatedTime: comment.updatedTime,
          upVote: comment.upVote,
          downVote: comment.downVote,
        };
        Object.assign(editComment, {
          updatedTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        });
        const currentComment = comments.find((item) => {
          return item.id === comment.id;
        });

        Object.assign(currentComment, editComment);
        setComments([...comments]);
        setCommentTree(createTree(comments));

        setIsOpenCommentFormByEdit((isOpenCommentFormByEdit) => {
          setCommentData('');
          return !isOpenCommentFormByEdit;
        });

        // TODO ここでデータ保存POST

        break;

      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const inputData = e.target.value;
    setCommentData(inputData);
  };

  const renderCommentForm = ({
    isOpenCommnetFormByAdd,
    isOpenCommnetFormByEdit,
    comment,
  }) => {
    if (isOpenCommnetFormByAdd) {
      return (
        <CommentForm>
          <CommentTextarea handleChange={handleInputChange}></CommentTextarea>
          <ReplyButton
            handleClick={handleCommentOperation}
            comment={comment}
            commentType={'reply'}
          >
            done
          </ReplyButton>
        </CommentForm>
      );
    } else if (isOpenCommnetFormByEdit) {
      return (
        <CommentForm>
          <CommentTextarea handleChange={handleInputChange}></CommentTextarea>
          <ReplyButton
            handleClick={handleCommentOperation}
            comment={comment}
            commentType={'edit'}
          >
            done
          </ReplyButton>
        </CommentForm>
      );
    }
    return null;
  };

  const renderNestedComment = ({
    expanded,
    comment,
    comments,
    collapse,
    setComments,
  }) => {
    if (expanded) {
      return (
        <CommentItem>
          <CommentContent>{comment.text}</CommentContent>
          {renderCommentForm({
            isOpenCommnetFormByAdd,
            isOpenCommnetFormByEdit,
            comment,
          })}
          <CommentController>
            <ToggleCommentButton
              handleClick={handleAddComment}
              commentButtonType={'add'}
              isOpenCommnetFormByAdd={isOpenCommnetFormByAdd}
              isOpenCommnetFormByEdit={isOpenCommnetFormByEdit}
            >
              {isOpenCommnetFormByAdd ? 'cancel' : 'add'}
            </ToggleCommentButton>
            <ToggleCommentButton
              handleClick={handleEditComment}
              commentButtonType={'edit'}
              isOpenCommnetFormByAdd={isOpenCommnetFormByAdd}
              isOpenCommnetFormByEdit={isOpenCommnetFormByEdit}
            >
              {isOpenCommnetFormByEdit ? 'cancel' : 'edit'}
            </ToggleCommentButton>
            <CommentControllerItem>
              <MetricsButton
                metricsType={'upVote'}
                comment={comment}
                upVote={upVote}
                handleClick={handleUpVoteComment}
              >
                upvote
              </MetricsButton>
              <MetricsUpVote>{upVote}</MetricsUpVote>
            </CommentControllerItem>
            <CommentControllerItem>
              <MetricsButton
                metricsType={'downVote'}
                comment={comment}
                downVote={downVote}
                handleClick={handleDownVoteComment}
              >
                downvote
              </MetricsButton>
              <MetricsDownVote>{downVote}</MetricsDownVote>
            </CommentControllerItem>
          </CommentController>
          <NestedComment
            comment={comment}
            comments={comments}
            collapse={collapse}
            setComments={setComments}
            setCommentTree={setCommentTree}
          ></NestedComment>
        </CommentItem>
      );
    }
    return null;
  };

  return (
    <StyledComment>
      <CommentRoot>
        <CommentAuthor>{comment.author}</CommentAuthor>
        <CommentExpander comment={comment} handleClick={collapse}>
          {comment.expanded ? `[-]` : `[+]`}
        </CommentExpander>
        <CreatedTime>{`created at ${timeAgo(
          comment.createdTime
        )}`}</CreatedTime>
        <UpdatedTime>{`updated at ${timeAgo(
          comment.updatedTime
        )}`}</UpdatedTime>
      </CommentRoot>
      {renderNestedComment({
        expanded: comment.expanded,
        comment,
        comments,
        collapse,
        setComments,
        setCommentTree,
      })}
    </StyledComment>
  );
};

export {Comment};
