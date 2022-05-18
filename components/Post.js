import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";

import {HeartIcon as HeartIconFiled} from '@heroicons/react/solid'

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Moment from "react-moment";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc
} from "firebase/firestore";
import {db} from "../firebase";

const Post = (props) => {
    const {id, username, userImage, caption, image} = props
    const {data: session} = useSession()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)


    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault()

        const commentToSend = comment
        setComment('')

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }

    useEffect(() =>
        onSnapshot(query(collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')),
            snapshot => setComments(snapshot.docs)
        ), [db, id])

    useEffect(() =>
        onSnapshot(collection(db, 'posts', id, 'likes'),
            snapshot => {
                setLikes(snapshot.docs)
            }
        ), [db, id])

    useEffect(() =>
            setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
        , [likes])

    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/*Header*/}
            <div className='flex items-center p-5'>
                <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3' src={userImage} alt={username}
                     title={username}/>
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5 text-gray-500 hover:text-black'/>
            </div>
            {/*Image*/}
            <img className='object-cover w-full' src={image} alt={caption}/>
            {/*Buttons*/}
            {session &&
                <div className='flex justify-between px-4 pt-4'>
                    <div className='flex space-x-4'>
                        {hasLiked
                            ? (<HeartIconFiled onClick={likePost} className='btn text-red-500'/>)
                            : (<HeartIcon onClick={likePost} className='btn'/>)
                        }
                        <ChatIcon className='btn'/>
                        <PaperAirplaneIcon className='btn'/>
                    </div>

                    <BookmarkIcon className='btn'/>
                </div>}
            {/*Caption*/}
            <p className='p-5 truncate'>
                {likes.length > 0 && (
                    <p className='font-bold mb-1'>{likes.length} likes</p>
                )}
                <span className='font-bold mr-1'>{username} </span>
                {caption}
            </p>
            {/*Comments*/}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map(comment => {
                            return <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                                <img className='h-7 rounded-full' src={comment.data().userImage}
                                     alt={comment.data().username}/>
                                <p className='text-sm flex-1'>
                                    <span className='font-bold'>{comment.data().username}</span> {comment.data().comment}
                                </p>
                                <Moment fromNow className='pr-5 text-xs'>{comment.data().timestamp?.toDate()}</Moment>
                            </div>
                        }
                    )}
                </div>
            )}

            {/*Input box*/}
            {session &&
                <form className='flex p-4 items-center' onSubmit={sendComment}>
                    <EmojiHappyIcon className='h-7'/>
                    <input
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder='Add a comment...'
                        type="text"
                        className='border-none flex-1 focus:ring-0'/>
                    <button type='submit' disabled={!comment.trim()}
                            className='font-semibold text-blue-400'>Post
                    </button>
                </form>}
        </div>
    )
}

export default Post