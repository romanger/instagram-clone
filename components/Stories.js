import {faker} from '@faker-js/faker';
import {useEffect, useState} from "react";
import Story from "./Story";
import {useSession} from "next-auth/react";

const Stories = () => {
    const {data: session} = useSession()
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => {
            return {
                avatar: faker.image.avatar(),
                username: faker.internet.userName(),
                id: i
            }
        })
        setSuggestions(suggestions)
    }, [])

    return (
        <div
            className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100'>
            {session && <Story img={session.user.image}
                               username={session.user.username}/>}

            {suggestions.map(profile => {
                return <Story
                    key={profile.id}
                    img={profile.avatar}
                    username={profile.username}/>
            })}
        </div>
    )
}

export default Stories