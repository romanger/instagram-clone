import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";

const Suggestions = () => {

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {

        const suggestions = [...Array(5)].map((_, i) => {
            return {
                id: i,
                username: faker.internet.userName(),
                userImg: faker.image.avatar(),
                company: faker.company.companyName()
            }
        })

        setSuggestions(suggestions)
    }, [])

    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>

            {
                suggestions.map(profile => {
                    return <div key={profile.id} className='flex items-center justify-between mt-3'>
                        <img className='w-10 h10 rounded-full border p-[2px]' src={profile.userImg} alt={profile.username}/>
                        <div className='flex-1 ml-4'>
                            <h2 className='font-semibold text-sm'>{profile.username}</h2>
                            <h3 className='text-gray-400 text-xs'>Works at {profile.company}</h3>
                        </div>
                        <button className='text-blue-400 font-bold text-xs ml-4'>Follow</button>
                    </div>
                })
            }

        </div>
    )
}

export default Suggestions