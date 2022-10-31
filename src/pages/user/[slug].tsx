import { useRouter } from 'next/router'
import React, { useEffect, useCallback, useState } from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import  uuid  from "react-uuid"
import AddPost from '@src/components/Modal/AddPost'
import useToggle from '@src/Hooks/useToggle'
import { QUERY_POSTS } from '../../GraphQl/Query/QueryPosts'
import produce from "immer"

const Posts = () => {
  const [isModalOpen, onModalOpen, onModalClose] = useToggle()

  const router = useRouter()
  const [variable, setVariable] = useState()
  const { slug } = router.query
  const { data, error } = useQuery(QUERY_POSTS(variable))

const [posts, setPosts] = useState([])


useEffect(() => {
    setVariable(slug)
}, [slug])

useEffect(() => {
    setPosts(data)
},[data])



const AddPosts = useCallback((title, description) => {
    setPosts(
      produce((draft) => {
        draft.user.posts.data.push({
          id: "todo_" + Math.random(),
          title,
          description,
          done: false
        });
      })
    );
  }, []);

  const deletePost = useCallback((item) => {
    setPosts(
      produce((draft) => {
        const index = draft.user.posts.data.findIndex(todo => todo.id === item)
        if (index !== -1) draft.user.posts.data.splice(index, 1)
      } 
    )
    )
  }, []);

  


if (data === undefined) return <p>ERROR</p>

  return (
    <div style={{ padding: ' 0px 50px 0px 50px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Link href="/">
          <p style={{ color: 'blue' }}>Back</p>
        </Link>
        <h1 style={{ fontWeight: 'bold', fontSize: '28px' }}>{data.user.name}</h1>
        <p onClick={onModalOpen}>ADD POST</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts?.user?.posts?.data?.map((post) => (
            <React.Fragment key={ uuid() }>
          <div style={{ border: '2px solid black', display: 'flex', flexDirection: 'row' }}>
            <p style={{ paddingRight: '20px' }}
            onClick={() => deletePost(post.id)}
            >remove</p>
            <Link href={`/user/post/${post.id}`}>
              <p>{post.title}</p>
            </Link>
          </div>
          </React.Fragment>
        ))}
      </div>
      {isModalOpen && <AddPost onClose={onModalClose} type="post" 
      AddPosts={AddPosts}
      />}
    </div>
  )
}

export default Posts
