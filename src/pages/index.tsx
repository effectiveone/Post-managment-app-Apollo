import React, { use } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { QuerUsers } from '../GraphQl/Query/QueryUser'

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(QuerUsers)

  console.table(data)

  return (
      <div
        style={{ padding: '50px 50px 50px 50px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px' }}
      >
        {data?.users?.data?.map((user) => (
          <div
            style={{
              display: 'flex',
              fontSize: '16px',
              padding: '10px 10px 10px 10px',
              height: '280px',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid black',
            }}
          >
            <div>
              <h2 style={{ fontWeight: 'bold' }}> {user.name}</h2>
            </div>

            <div style={{ textDecoration: 'underline', color: 'blue' }}>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.website}</p>
            </div>

            <div>
              <p>{user.company.name}</p>
              <p>{user.company.catchPhrase}</p>
            </div>

            <Link href={`/user/${user.id}`}>
              <button
                style={{
                  marginLeft: '50px',
                  border: '1px solid black',
                  height: '50px',
                  width: '80%',
                  alignSelf: 'center',
                }}
              >
                DETAILS
              </button>
            </Link>
          </div>
        ))}
      </div>
  )
}

export default Home
