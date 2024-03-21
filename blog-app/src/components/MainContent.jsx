import React from 'react';

export default function MainContent(props) {
 return (
    <div>
      <div className='container-card'>
        {props.posts.length !== 0 ? (
          props.posts.map((e) => (
            <div className='card' key={e.title}>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
            </div>
          ))
        ) : (
          <h1>No posts available</h1>
        )}
      </div>
    </div>
 );
}
