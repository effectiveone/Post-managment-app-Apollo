import { useRouter } from 'next/router'
import React, { useEffect, useCallback, useState } from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import AddPost from '@src/components/Modal/AddPost'
import useToggle from '@src/Hooks/useToggle'
import { QUERY_POST_CURRENT } from '../../../../GraphQl/Query/QueryPostCurrent'
import produce from "immer"
import uuid from "react-uuid"
const Post = () => {
  const [isModalOpen, onModalOpen, onModalClose] = useToggle()

  const [toggle, setToggle] = useState(true)
  const router = useRouter()
  const [variable, setVariable] = useState()
  const { postID } = router.query
  const { data, error } = useQuery(QUERY_POST_CURRENT(variable))

  useEffect(() => {
    return setVariable(postID)
  }, [postID])

  const [comments, setComments ] = useState([])

  useEffect(() => {
    setComments(data)
},[data])

  const AddComments = useCallback((title: { toString: () => string }, description: { toString: () => string }) => {
  setComments(
      produce((draft) => {
        draft.post.comments.data.push({
          id: "todo_" + Math.random(),
          name: title?.toString(),
          body: description?.toString(),
          done: false
        });
      })
    );
  }, []);
  
  return (
    <div style={{ padding: ' 0px 50px 100px 50px' }}>
      <div style={{ padding: ' 0px 50px 0px 50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Link href={`/user/${data?.post?.user?.id}`}>
            <p style={{ color: 'blue' }}>Back</p>
          </Link>
          <h1 style={{ fontWeight: 'bold', fontSize: '28px' }}>{data?.post?.user?.name}</h1>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '100px 0px 50px 0px' }}>
        <h2 style={{ alignSelf: 'center', paddingBottom: '30px', fontWeight: 'bold', fontSize: '30px' }}>
          {data?.post?.title}
        </h2>
        <span>{data?.post?.body}</span>
      </div>

      <div
        style={{
          textDecoration: 'underline',
          color: 'blue',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: '20px',
        }}
      >
        <div>
          {toggle ? (
            <p onClick={() => setToggle(!toggle)}>Hide Comments</p>
          ) : (
            <p onClick={() => setToggle(!toggle)}>Show Comments</p>
          )}
        </div>
        <div>
          <p onClick={onModalOpen}>Add comment</p>
        </div>
      </div>
      {toggle && (
        <div style={{ display: 'grid', gap: '50px' }}>
          {comments?.post?.comments?.data?.map((comment) => (
            <React.Fragment key={uuid()}>            <div style={{ padding: '20px 20px 50px 20px', border: '1px solid black' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '20px' }}>{comment.name}</h3>
                <span>{comment.email}</span>
              </div>
              <span>{comment.body}</span>
            </div>
            </React.Fragment>
          ))}
        </div>
      )}
      {isModalOpen && <AddPost onClose={onModalClose}
            AddPosts={AddComments}
      type="comment" />}
    </div>
  )
}

export default Post
