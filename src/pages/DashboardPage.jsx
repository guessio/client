import React from 'react'
import Card from '../components/Card'

const DashboardPage = () => {
    const cards = Array.from({ length: 50 }, (_, i) => i + 1);
    return (
    
            <div className="flex grid grid-cols-5 gap-5 m-20">
                {cards.map((number) => (
                    <Card/>
                ))}
            </div>

    )
}

export default DashboardPage