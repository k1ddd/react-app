import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers } from "../../../../features/users/usersSlice";
import { fetchPosts } from '../../../features/posts/postsSlice';

const PostsList = () => {
    const { posts } = useSelector((store) => store.posts);
    const { status } = useSelector((store) => store.posts);
    const { error } = useSelector((store) => store.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    return (
        <ul className="">
            {posts.map((post) => (
                <li key={post.id}>
                    <div>{post.name}</div>
                    <div>{post.year}</div>
                    <div>{post.pantone_value}</div>
                </li>
            ))}
        </ul>
    );
};

export default PostsList;
